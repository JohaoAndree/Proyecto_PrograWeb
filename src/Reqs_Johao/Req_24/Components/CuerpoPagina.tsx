import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Titulo from '../../Shared_Components/Titulo';
import ListaNoticias from './ListaNoticias';
import { obtenerNoticias } from '../../../api/usuarios.api';
import type { Noticia } from './ListaNoticias';

const CuerpoPagina = () => {
  const titulo = "Noticias";
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
    <div className={"flex-grow-1 " + styles.CuerpoPagina}>
      <Titulo texto={titulo} />
      <div className={styles.ContenedorListaNoticias}>
        <ListaNoticias noticias={noticias} recargarNoticias={cargarNoticias} />
      </div>
    </div>
  );
};

export default CuerpoPagina;