import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import ListaNoticias from './ListaNoticias';
import { obtenerNoticias } from '../../../api/usuarios.api';
import type { Noticia } from './ListaNoticias';

const CuerpoPagina = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  const cargarNoticias = async () => {
    try {
      const response = await obtenerNoticias();
      setNoticias(response);
    } catch (error) {
      console.error("Error al cargar noticias:", error);
    }
  };

  useEffect(() => {
    cargarNoticias();
  }, []);

  return (
    <div className={styles.CuerpoPagina}>
      <div className={styles.FullSpaceContainer}>
        <ListaNoticias noticias={noticias} recargarNoticias={cargarNoticias} />
      </div>
    </div>
  );
};

export default CuerpoPagina;