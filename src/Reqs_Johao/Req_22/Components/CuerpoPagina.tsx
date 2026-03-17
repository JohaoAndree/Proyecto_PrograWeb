import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ListaUsuarios, { type Usuario } from './ListaUsuarios';
import { obtenerUsuarios } from '../../../api/usuarios.api';

interface ApiUsuario {
  id: number;
  foto: string;
  nickname: string;
  nombre: string;
  pais: string;
}

const CuerpoPagina = () => {
  const [lista, setLista] = useState<Usuario[]>([]);
  const [filtroId, setFiltroId] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroPais, setFiltroPais] = useState('');

  useEffect(() => {
    let ignore = false;
    const cargarUsuarios = async () => {
      try {
        const data: ApiUsuario[] = await obtenerUsuarios();
        if (ignore) return;

        // Ordenar por ID y mapear incluyendo país
        const usuariosMapeados: Usuario[] = data
          .sort((a, b) => a.id - b.id)
          .map((usuario) => {
            const fotoPath = usuario.foto
              ? (usuario.foto.startsWith('/') ? usuario.foto : `/imagenes/usuario/${usuario.foto}`)
              : '/imagenes/usuario/avatarPlaceholder.jpg';

            return {
              id: usuario.id,
              foto: `${import.meta.env.VITE_BACKEND_URL}${fotoPath}`,
              nickname: `${usuario.nombre}${usuario.id}`,
              nombre: usuario.nombre,
              pais: usuario.pais
            };
          });
        setLista(usuariosMapeados);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    cargarUsuarios();
    return () => { ignore = true; };
  }, []);

  const usuariosFiltrados = lista.filter((u) => {
    const matchId = u.id.toString().includes(filtroId);
    const matchNombre = u.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const matchPais = u.pais.toLowerCase().includes(filtroPais.toLowerCase());
    return matchId && matchNombre && matchPais;
  });

  return (
    <div className={styles.CuerpoPagina + " fadeInUp"}>
      <div className={styles.HeaderTable}>
        <div className={styles.SearchContainer}>
          <div className={styles.SearchGroup}>
            <label>ID</label>
            <input 
              type="text" 
              placeholder="Ej: 1" 
              value={filtroId}
              onChange={(e) => setFiltroId(e.target.value)}
              className={styles.SearchInput}
            />
          </div>
          <div className={styles.SearchGroup}>
            <label>Nombre</label>
            <input 
              type="text" 
              placeholder="Buscar por nombre..." 
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              className={styles.SearchInput}
            />
          </div>
          <div className={styles.SearchGroup}>
            <label>País</label>
            <input 
              type="text" 
              placeholder="Ej: Perú" 
              value={filtroPais}
              onChange={(e) => setFiltroPais(e.target.value)}
              className={styles.SearchInput}
            />
          </div>
        </div>
      </div>
      <div className={styles.FullSpaceContainer}>
        <ListaUsuarios data={usuariosFiltrados} />
      </div>
    </div>
  );
};

export default CuerpoPagina;
