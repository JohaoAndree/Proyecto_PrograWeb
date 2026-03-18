import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import { isCancel } from 'axios';
import styles from './Noticias.module.css';
import Skeleton from '../../../Shared/Components/SkeletonView';

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
    const controller = new AbortController();
    const fetchNoticias = async () => {
      try {
        setLoading(true);
        // El endpoint es /api/johao/noticias según el backend johaoRoutes
        const response = await axios.get('/api/johao/noticias', { signal: controller.signal });
        setNoticias(response.data);
      } catch (err) {
        if (isCancel(err)) return;
        console.error('Error fetching noticias:', err);
        setError('No pudimos cargar las últimas noticias. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div style={{ marginBottom: '0.5rem' }}>
          <div className={`spinner-border ${styles.spinner}`} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
        <p>Sincronizando el multiverso de noticias...</p>

        <div style={{ marginTop: '1rem', width: '100%', maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}>
          <div className={styles.newsGrid}>
            {[...Array(3)].map((_, i) => (
              <article key={i} className={styles.newsCard}>
                <div className={styles.imageWrapper}>
                  <Skeleton width="100%" height="100%" borderRadius="6px" />
                </div>
                <div className={styles.content}>
                  <Skeleton width="60%" height="20px" />
                  <div style={{ height: '8px' }} />
                  <Skeleton width="100%" height="12px" />
                  <div style={{ height: '6px' }} />
                  <Skeleton width="90%" height="12px" />
                </div>
              </article>
            ))}
          </div>
        </div>
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