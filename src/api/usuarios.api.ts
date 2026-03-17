import backend from './axios';
import type { Noticia } from '../Reqs_Johao/Req_24/Components/ListaNoticias';

export const obtenerUsuarios = async () => {
  const response = await backend.get('/api/johao/usuarios');
  return response.data;
};

export const contarUsuarios = async () => {
  const response = await backend.get('/api/johao/usuarios/count');
  return response.data.totalUsuarios;
};

export const obtenerGanancias = async () => {
  const response = await backend.get('/api/johao/ventas/ganancias');
  return response.data;
};

export const contarVentas = async () => {
  const response = await backend.get('/api/johao/ventas/count');
  return response.data.totalVentas;
};

export const obtenerNoticias = async (): Promise<Noticia[]> => {
  const response = await backend.get('/api/johao/noticias');
  return response.data;
};

export const agregarNoticia = async (noticia: Omit<Noticia, 'id'>): Promise<Noticia> => {
  const response = await backend.post('/api/johao/noticias', noticia);
  return response.data;
};

export const editarNoticia = async (id: number, noticia: Omit<Noticia, 'id'>): Promise<Noticia> => {
  const response = await backend.put(`/api/johao/noticias/${id}`, noticia);
  return response.data;
};

export const eliminarNoticia = async (id: number): Promise<void> => {
  await backend.delete(`/api/johao/noticias/${id}`);
};