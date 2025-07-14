import axios from './axios';
import type { Noticia } from '../Reqs_Johao/Req_24/Components/ListaNoticias';

export const obtenerUsuarios = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/johao/usuarios`);
  return response.data;
};

export const contarUsuarios = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/johao/usuarios/count`);
  return response.data.totalUsuarios;
};

export const obtenerGanancias = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/johao/ventas/ganancias`);
  return response.data;
};

export const obtenerNoticias = async (): Promise<Noticia[]> => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias`);
  return response.data;
};

export const agregarNoticia = async (noticia: Omit<Noticia, 'id'>): Promise<Noticia> => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias`, noticia);
  return response.data;
};

export const editarNoticia = async (id: number, noticia: Omit<Noticia, 'id'>): Promise<Noticia> => {
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias/${id}`, noticia);
  return response.data;
};

export const eliminarNoticia = async (id: number): Promise<void> => {
  await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias/${id}`);
};