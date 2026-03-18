import axios from 'axios';
import type {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios';

// 1. Extensión de tipos
declare module 'axios' {
  export interface AxiosRequestConfig {
    cache?: boolean;
    cacheTtl?: number;
  }
}

interface CacheEntry<T = unknown> {
  timestamp: number;
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponse['headers'];
}

// Configuración y Estados
const LOCALSTORAGE_PREFIX = 'marketplace_cache_v1:';
const MEMORY_CACHE = new Map<string, CacheEntry<unknown>>();
const PENDING_REQUESTS = new Map<string, Promise<AxiosResponse<any>>>();
let DEFAULT_TTL = 60 * 1000;
let MAX_CACHE_ENTRIES = 200;
let AUTO_CLEANUP_INTERVAL_ID: number | null = null;

/**
 * Normaliza los parámetros para que el orden de las keys no afecte el caché
 */
function serializeParams(params: Record<string, unknown> = {}): string {
  return JSON.stringify(
    Object.keys(params)
      .sort()
      .reduce((obj, key) => {
        obj[key] = params[key];
        return obj;
      }, {} as Record<string, unknown>)
  );
}

function buildCacheKey(config: InternalAxiosRequestConfig | AxiosRequestConfig): string {
  const paramsStr = serializeParams((config.params || {}) as Record<string, unknown>);
  return `${config.method}:${config.url}::${paramsStr}`;
}

// Fallback adapter using fetch for environments where axios adapter isn't available
async function fetchAdapter(cfg: InternalAxiosRequestConfig): Promise<AxiosResponse> {
  // Build URL
  let url = String(cfg.url || '');
  try {
    if (cfg.baseURL) {
      url = new URL(url, cfg.baseURL as string).toString();
    }
  } catch {
    // leave as-is
  }

  // params
  if (cfg.params) {
    const paramsStr = serializeParams(cfg.params as Record<string, unknown>);
    const sep = url.includes('?') ? '&' : '?';
    url = `${url}${sep}${paramsStr.replace(/^{|}$/g, '')}`;
  }

  const init: RequestInit = {
    method: (cfg.method || 'get').toUpperCase(),
    headers: cfg.headers as HeadersInit | undefined,
    signal: cfg.signal as AbortSignal | undefined,
  };

  if (cfg.data != null && init.method !== 'GET' && init.method !== 'HEAD') {
    init.body = typeof cfg.data === 'string' ? cfg.data : JSON.stringify(cfg.data);
    if (init.headers && !(init.headers as any)['Content-Type']) {
      (init.headers as any)['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  const response = await fetch(url, init);
  const headersObj: Record<string, string> = {};
  response.headers.forEach((value, key) => { headersObj[key] = value; });

  let data: any;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null);
  } else {
    data = await response.text().catch(() => null);
  }

  const axiosResp: AxiosResponse = {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: headersObj,
    config: cfg,
    request: response as any,
  };

  return axiosResp;
}

/**
 * Helpers de Almacenamiento con guarda SSR
 */
const storage = {
  get: <T>(key: string): CacheEntry<T> | null => {
    if (typeof window === 'undefined') return null; // SSR Guard
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_PREFIX + encodeURIComponent(key));
      return raw ? (JSON.parse(raw) as CacheEntry<T>) : null;
    } catch { return null; }
  },
  set: <T>(key: string, entry: CacheEntry<T>): void => {
    if (typeof window === 'undefined') return; // SSR Guard
    try {
      localStorage.setItem(LOCALSTORAGE_PREFIX + encodeURIComponent(key), JSON.stringify(entry));
    } catch { /* Quota exceeded */ }
  },
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(LOCALSTORAGE_PREFIX + encodeURIComponent(key));
    } catch { /* ignore */ }
  }
};

const backend: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

/**
 * INTERCEPTOR DE PETICIÓN: Cache & Dedupe
 */
backend.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  if (config.method !== 'get' || config.cache === false) return config;

  const key = buildCacheKey(config);
  const ttl = config.cacheTtl ?? DEFAULT_TTL;
  const now = Date.now();

  // A. Verificar si hay una petición igual en curso (Dedupe)
  const pending = PENDING_REQUESTS.get(key);
  if (pending) {
    config.adapter = () => pending;
    return config;
  }

  // B. Verificar Caché (Memoria o Storage)
  const cached = MEMORY_CACHE.get(key) || storage.get(key);
  if (cached && (now - cached.timestamp) < ttl) {
    // Move accessed key to the end to implement LRU behavior
    if (MEMORY_CACHE.has(key)) {
      const existing = MEMORY_CACHE.get(key) as CacheEntry<unknown>;
      MEMORY_CACHE.delete(key);
      MEMORY_CACHE.set(key, existing);
    } else {
      // if it came from storage, populate memory and place it at the end
      MEMORY_CACHE.set(key, cached as CacheEntry<unknown>);
    }

    config.adapter = () => Promise.resolve({
      data: cached.data,
      status: cached.status,
      statusText: cached.statusText,
      headers: cached.headers,
      config,
      request: {},
    } as AxiosResponse);
    return config;
  }

  // Si no hay cache y no hay pending, envolvemos el adaptador original para registrar la Promise
  let originalAdapter: any = config.adapter;
  if (typeof originalAdapter !== 'function') {
    originalAdapter = (backend.defaults && (backend.defaults as any).adapter) || (axios.defaults && (axios.defaults as any).adapter);
  }
  if (typeof originalAdapter !== 'function') {
    // último recurso: usar el adaptador basado en fetch para entornos browser donde no haya adapter
    originalAdapter = fetchAdapter;
  }

  config.adapter = (cfg: InternalAxiosRequestConfig) => {
    // Ejecuta el adaptador original y guarda la promesa en pending
    const p = originalAdapter(cfg) as Promise<AxiosResponse>;
    // Guardamos una promesa que limpia el pending al resolverse o rechazarse
    const tracked = p.then((r) => { PENDING_REQUESTS.delete(key); return r; }).catch((err) => { PENDING_REQUESTS.delete(key); throw err; });
    PENDING_REQUESTS.set(key, tracked as Promise<AxiosResponse<any>>);
    return p;
  };

  return config;
});

/**
 * INTERCEPTOR DE RESPUESTA: Guardar Caché y Limpiar Dedupe
 */
backend.interceptors.response.use(
  (response) => {
    const { config } = response;
    const key = buildCacheKey(config);

    // Guardar en caché si es GET y está habilitado (no cachear respuestas autenticadas a menos que se forcee)
    const hasAuth = Boolean(config.headers && (config.headers.Authorization || config.headers.authorization));
    if (config.method === 'get' && config.cache !== false && (!hasAuth || config.cache === true)) {
      const entry: CacheEntry = {
        timestamp: Date.now(),
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
      MEMORY_CACHE.set(key, entry);
      storage.set(key, entry);
      // Ensure cache size limit
      enforceCacheLimit();
    }

    PENDING_REQUESTS.delete(key);
    return response;
  },
  (error) => {
    if (error.config) {
      PENDING_REQUESTS.delete(buildCacheKey(error.config));
    }
    return Promise.reject(error);
  }
);

// --- UTILIDADES EXPORTADAS ---

export const clearCache = (): void => {
  MEMORY_CACHE.clear();
  if (typeof window !== 'undefined') {
    Object.keys(localStorage)
      .filter(key => key.startsWith(LOCALSTORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  }
};

export const invalidateKey = (url: string, params: Record<string, unknown> = {}): void => {
  const key = `get:${url}::${serializeParams(params)}`;
  MEMORY_CACHE.delete(key);
  storage.remove(key);
};

export const setDefaultCacheTtl = (ms: number): void => {
  DEFAULT_TTL = ms;
};

// --- Cache limit (LRU) and cleanup helpers ---
function enforceCacheLimit(): void {
  try {
    while (MEMORY_CACHE.size > MAX_CACHE_ENTRIES) {
      const oldestKey = MEMORY_CACHE.keys().next().value as string | undefined;
      if (!oldestKey) break;
      MEMORY_CACHE.delete(oldestKey);
      storage.remove(oldestKey);
    }
  } catch { /* ignore */ }
}

export const setCacheLimit = (maxEntries: number): void => {
  MAX_CACHE_ENTRIES = Math.max(10, Math.floor(maxEntries));
  enforceCacheLimit();
};

export const runCacheCleanup = (ttl: number = DEFAULT_TTL): void => {
  const now = Date.now();
  for (const [key, entry] of Array.from(MEMORY_CACHE.entries())) {
    if ((now - entry.timestamp) >= ttl) {
      MEMORY_CACHE.delete(key);
      storage.remove(key);
    }
  }
};

export const startAutoCleanup = (intervalMs: number = DEFAULT_TTL): void => {
  stopAutoCleanup();
  if (typeof window === 'undefined') return;
  AUTO_CLEANUP_INTERVAL_ID = window.setInterval(() => runCacheCleanup(), intervalMs);
};

export const stopAutoCleanup = (): void => {
  if (AUTO_CLEANUP_INTERVAL_ID !== null) {
    clearInterval(AUTO_CLEANUP_INTERVAL_ID);
    AUTO_CLEANUP_INTERVAL_ID = null;
  }
};

export default backend;