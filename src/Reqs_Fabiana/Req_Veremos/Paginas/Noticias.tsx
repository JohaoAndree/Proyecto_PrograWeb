import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import styles from './Noticias.module.css';

interface NoticiaDB {
  id: number;
  foto: string;
  nombre: string;
  descripcion: string;
}

function Noticias() {
  const [noticias, setNoticias] = useState<NoticiaDB[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        setLoading(true);
        // El endpoint es /api/johao/noticias según el backend johaoRoutes
        const response = await axios.get('/api/johao/noticias');
        setNoticias(response.data);
      } catch (err) {
        console.error('Error fetching noticias:', err);
        setError('No pudimos cargar las últimas noticias. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={`spinner-border ${styles.spinner}`} role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Sincronizando el multiverso de noticias...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <i className="bi bi-exclamation-triangle-fill fs-1 text-danger mb-3"></i>
        <p>{error}</p>
      </div>
    );
  }

  if (noticias.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay noticias disponibles en este momento. ✨</p>
      </div>
    );
  }

  return (
    <div className={styles.noticiasContainer}>
      <h1 className={styles.title + ' fadeInUp'}>Últimas Novedades</h1>
      
      <div className={styles.newsGrid}>
        {noticias.map((noticia) => (
          <article key={noticia.id} className={styles.newsCard + ' fadeInUp'}>
            <div className={styles.imageWrapper}>
              <img 
                src={`${import.meta.env.VITE_BACKEND_URL}${noticia.foto}`} 
                alt={noticia.nombre} 
                className={styles.newsImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Imagen+no+disponible';
                }}
              />
            </div>
            <div className={styles.content}>
              <h3 className={styles.newsTitle}>{noticia.nombre}</h3>
              <p className={styles.newsText}>{noticia.descripcion}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Noticias;