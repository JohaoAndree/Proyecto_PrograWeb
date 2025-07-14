import axios from './axios';

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
