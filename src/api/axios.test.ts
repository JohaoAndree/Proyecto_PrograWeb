import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import backend, { clearCache, setDefaultCacheTtl } from './axios';

describe('Axios Caching System', () => {

  beforeEach(() => {
    clearCache();
    // Default TTL para pruebas rápido
    setDefaultCacheTtl(500);
    // Mock para que axios use fetch falso si tratara de disparar una red real,
    // pero aquí mockearemos a nivel del adaptador de backend
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('debería ejecutar el request normalmente si no hay caché', async () => {
    // Configurar adaptador falso para interceptar la llamada de red final
    const mockAdapter = vi.fn().mockImplementation(async (config) => ({
      data: { msg: 'success' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config
    }));

    const res = await backend.get('/test-endpoint', { adapter: mockAdapter });

    expect(mockAdapter).toHaveBeenCalledTimes(1);
    expect(res.data).toEqual({ msg: 'success' });
  });

  it('debería retornar desde la caché en la segunda llamada idéntica', async () => {
    const mockAdapter = vi.fn().mockImplementation(async (config) => ({
      data: { msg: 'success_cached' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config
    }));

    // Primera llamada
    await backend.get('/test-endpoint-2', { adapter: mockAdapter });
    // Segunda llamada
    const res2 = await backend.get('/test-endpoint-2', { adapter: mockAdapter });

    // El adaptador solo debió llamarse 1 vez
    expect(mockAdapter).toHaveBeenCalledTimes(1);
    expect(res2.data).toEqual({ msg: 'success_cached' });
  });

  it('debería hacer un nuevo request una vez que el TTL expire', async () => {
    vi.useFakeTimers();

    const mockAdapter = vi.fn().mockImplementation(async (config) => ({
      data: { msg: 'success_timer' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config
    }));

    // TTL es 500ms
    await backend.get('/test-endpoint-3', { adapter: mockAdapter });
    expect(mockAdapter).toHaveBeenCalledTimes(1);

    // Avanzar el tiempo 600ms para que expire el caché
    vi.advanceTimersByTime(600);

    // Segunda llamada, debe refetcher
    await backend.get('/test-endpoint-3', { adapter: mockAdapter });
    expect(mockAdapter).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });

  it('no debería guardar en caché si es método POST', async () => {
    const mockAdapter = vi.fn().mockImplementation(async (config) => ({
      data: { msg: 'success_post' },
      status: 200,
      statusText: 'OK',
      headers: { 'content-type': 'application/json' },
      config
    }));

    await backend.post('/test-endpoint-post', {}, { adapter: mockAdapter });
    await backend.post('/test-endpoint-post', {}, { adapter: mockAdapter });

    // POST no usa caché, el adaptador se llama dos veces
    expect(mockAdapter).toHaveBeenCalledTimes(2);
  });

  it('debería reintentar hasta 2 veces si hay un error de red (ERR_NETWORK)', async () => {
    vi.useFakeTimers();

    const mockAdapter = vi.fn()
      .mockImplementationOnce(async (config) => Promise.reject({ name: 'AxiosError', code: 'ERR_NETWORK', config }))
      .mockImplementationOnce(async (config) => Promise.reject({ name: 'AxiosError', code: 'ERR_NETWORK', config }))
      .mockImplementationOnce(async (config) => ({
        data: { msg: 'success_after_retry' },
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config
      }));

    // Disparamos la petición
    const promise = backend.get('/test-retry-endpoint', { adapter: mockAdapter });

    // En backend internamente el interceptor hará:
    // Fallo 1 -> espera 3000ms
    // Fallo 2 -> espera 6000ms
    // Éxito

    // Acelerar los timers repetidamente para que el delay esperado por el interceptor de retry pase:
    await vi.advanceTimersByTimeAsync(3500); // Pasa primer retry
    await vi.advanceTimersByTimeAsync(6500); // Pasa segundo retry

    const res = await promise;

    expect(mockAdapter).toHaveBeenCalledTimes(3);
    expect(res.data).toEqual({ msg: 'success_after_retry' });

    vi.useRealTimers();
  });
});
