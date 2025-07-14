import axios from './axios';

export const obtenerUsuarios = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/johao/usuarios`);
  return response.data;
};
