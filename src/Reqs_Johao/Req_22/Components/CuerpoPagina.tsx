import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Titulo from '../../Shared_Components/Titulo';
import ListaUsuarios, { type Usuario } from './ListaUsuarios';
import { obtenerUsuarios } from '../../../api/usuarios.api';

interface ApiUsuario {
  id: number;
  foto: string;
  nickname: string;
  nombre: string;
}

const CuerpoPagina = () => {
  const titulo = 'Usuarios';
  const [lista, setLista] = useState<Usuario[]>([]);

  useEffect(() => {
    let ignore = false;
    const cargarUsuarios = async () => {
      try {
        const data: ApiUsuario[] = await obtenerUsuarios();
        if (ignore) return;
        const usuariosMapeados: Usuario[] = data.map((usuario) => ({
          id: usuario.id,
          foto: `${import.meta.env.VITE_BACKEND_URL}/imagenes/usuario/${usuario.foto}`,
          nickname: `${usuario.nombre}${usuario.id}`,
          nombre: usuario.nombre,
        }));
        setLista(usuariosMapeados);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    cargarUsuarios();
    return () => { ignore = true; };
  }, []);

  return (
    <div className={'flex-grow-1 ' + styles.CuerpoPagina}>
      <Titulo texto={titulo} />
      <div className={styles.ContenedorListaUsuarios}>
        <ListaUsuarios data={lista} />
      </div>
    </div>
  );
};

export default CuerpoPagina;
