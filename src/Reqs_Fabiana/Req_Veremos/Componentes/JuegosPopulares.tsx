import { useEffect, useState } from 'react';
import styles from './JuegosPopulares.module.css';
import axios from '../../../api/axios';
import { isCancel } from 'axios';
import { SkeletonCard } from '../../../Shared/Components/SkeletonView';

interface Juego {
  titulo: string;
  genero: string;
  plataforma: string[];
  imagen: string;
  descripcion: string;
  valoracion: string;
}

function extraerValoracion(valoracion: string): number {
  const match = valoracion.match(/([0-9]+\.?[0-9]*)\/10$/);
  return match ? parseFloat(match[1]) : 0;
}

export default function JuegosPopulares() {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    axios.get('/api/gerson/games/juegos-populares', { signal: controller.signal })
      .then(res => {
        // debug logs removed for production
        const juegosOrdenados = [...res.data]
          .sort((a: Juego, b: Juego) => extraerValoracion(b.valoracion) - extraerValoracion(a.valoracion));
        setJuegos(juegosOrdenados.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        if (isCancel(err)) return;
        setError('No se pudieron cargar los juegos populares');
        setLoading(false);
      });

    return () => { controller.abort(); };
  }, []);

  const extractNumericRating = (val: string) => {
    const match = val.match(/([0-9]+\.?[0-9]*\/10)/);
    return match ? match[1] : (val.split(' ').pop() || 'N/A');
  };

  return (
    <section className={styles.popularesSection}>
      <h2 className={styles.titulo}>Top Juegos de la Semana</h2>
      <div className={styles.juegosGrid}>
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          juegos.map((juego, idx) => (
            <div key={idx} className={`${styles.juegoCard} fadeInUp`}>
              <div className={styles.imgWrapper}>
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${juego.imagen}`}
                  alt={juego.titulo}
                  className={styles.juegoImg}
                />
              </div>
              <div className={styles.juegoInfo}>
                <div className={styles.headerInfo}>
                  <h3 className={styles.juegoTitulo}>{juego.titulo}</h3>
                  <span className={styles.valoracionTag}>{extractNumericRating(juego.valoracion)}</span>
                </div>
                <p className={styles.juegoGenero}>{juego.genero}</p>
                <p className={styles.juegoDescripcion}>{juego.descripcion}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
