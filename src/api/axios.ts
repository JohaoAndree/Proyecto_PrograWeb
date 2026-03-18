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
    __retryCount?: number;
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
let DEFAULT_TTL = 60 * 1000;
let MAX_CACHE_ENTRIES = 200;
let AUTO_CLEANUP_INTERVAL_ID: ReturnType<typeof setInterval> | null = null;

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
  const method = (config.method || 'get').toLowerCase();
  const paramsStr = serializeParams((config.params || {}) as Record<string, unknown>);
  return `${method}:${config.url}::${paramsStr}`;
}

/**
 * Helpers de Almacenamiento con guarda SSR
 */
const storage = {
  get: <T>(key: string): CacheEntry<T> | null => {
    if (typeof window === 'undefined') return null;
    try {
      const raw = localStorage.getItem(LOCALSTORAGE_PREFIX + encodeURIComponent(key));
      return raw ? (JSON.parse(raw) as CacheEntry<T>) : null;
    } catch { return null; }
  },
  set: <T>(key: string, entry: CacheEntry<T>): void => {
    if (typeof window === 'undefined') return;
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
  timeout: 30_000, // 30s timeout máximo por request
});

/**
 * INTERCEPTOR DE PETICIÓN: Solo Caché (sin deduplicación problemática)
 *
 * Se eliminó la deduplicación via PENDING_REQUESTS porque causaba un bug crítico:
 * cuando StrictMode abortaba el primer request, la promesa abortada quedaba en el Map
 * y el segundo mount la reutilizaba, haciendo que también fallara con AbortError.
 * También se eliminó el wrapper de adapter que causaba problemas con los internals de axios.
 */
backend.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.method !== 'get' || config.cache === false) return config;

  const key = buildCacheKey(config);
  const ttl = config.cacheTtl ?? DEFAULT_TTL;
  const now = Date.now();

  // Verificar Caché (Memoria primero, luego Storage)
  const cached = MEMORY_CACHE.get(key) || storage.get(key);
  if (cached && (now - cached.timestamp) < ttl) {
    // Mover al final para comportamiento LRU
    if (MEMORY_CACHE.has(key)) {
      const existing = MEMORY_CACHE.get(key) as CacheEntry<unknown>;
      MEMORY_CACHE.delete(key);
      MEMORY_CACHE.set(key, existing);
    } else {
      MEMORY_CACHE.set(key, cached as CacheEntry<unknown>);
    }

    // Retornar datos cacheados sin hacer request al servidor
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

  // Sin cache válido → el request procede normalmente (sin wrappers de adapter)
  return config;
});

/**
 * INTERCEPTOR DE RESPUESTA: Guardar Caché
 */
backend.interceptors.response.use(
  (response) => {
    const { config } = response;

    // Guardar en caché solo GETs sin auth (a menos que cache esté forzado)
    const hasAuth = Boolean(config.headers && (config.headers.Authorization || config.headers.authorization));
    if (config.method === 'get' && config.cache !== false && (!hasAuth || config.cache === true)) {
      const key = buildCacheKey(config);
      const entry: CacheEntry = {
        timestamp: Date.now(),
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
      MEMORY_CACHE.set(key, entry);
      storage.set(key, entry);
      enforceCacheLimit();
    }

    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * INTERCEPTOR DE RETRY: Reintentar en Network Errors (cold start de Render)
 * Reintenta hasta 2 veces con backoff de 3s, 6s
 */
backend.interceptors.response.use(undefined, async (error) => {
  const config = error.config;
  if (!config) return Promise.reject(error);

  // No reintentar requests abortados intencionalmente
  if (axios.isCancel(error) || error.name === 'AbortError' || error.name === 'CanceledError') {
    return Promise.reject(error);
  }

  // Reintentar solo en errores de red o timeout (típicos de cold start)
  if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
    config.__retryCount = (config.__retryCount || 0) + 1;
    if (config.__retryCount <= 2) {
      const delay = config.__retryCount * 3000;
      await new Promise(r => setTimeout(r, delay));
      return backend(config);
    }
  }

  return Promise.reject(error);
});

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
  AUTO_CLEANUP_INTERVAL_ID = setInterval(() => runCacheCleanup(), intervalMs);
};

export const stopAutoCleanup = (): void => {
  if (AUTO_CLEANUP_INTERVAL_ID !== null) {
    clearInterval(AUTO_CLEANUP_INTERVAL_ID);
    AUTO_CLEANUP_INTERVAL_ID = null;
  }
};

export default backend;