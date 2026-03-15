import { useEffect, useState } from 'react';
import styles from './JuegosPopulares.module.css';
import axios from '../../../api/axios';

interface Juego {
  titulo: string;
  genero: string;
  plataforma: string[];
  imagen: string;
  descripcion: string;
  valoracion: string;
}

function extraerValoracion(valoracion: string): number {
  // Busca el número al final del string, ejemplo: "★★★★☆ 8.5/10"
  const match = valoracion.match(/([0-9]+\.?[0-9]*)\/10$/);
  return match ? parseFloat(match[1]) : 0;
}

export default function JuegosPopulares() {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/gerson/games/juegos-populares')
      .then(res => {
        const juegosOrdenados = [...res.data]
          .sort((a: Juego, b: Juego) => extraerValoracion(b.valoracion) - extraerValoracion(a.valoracion));
        // Selección de los 3 mejores, considerando empates
        const topJuegos: Juego[] = [];
        let i = 0;
        while (topJuegos.length < 3 && i < juegosOrdenados.length) {
          const actualValor = extraerValoracion(juegosOrdenados[i].valoracion);
          if (topJuegos.length === 0 || actualValor === extraerValoracion(topJuegos[0].valoracion)) {
            topJuegos.push(juegosOrdenados[i]);
          } else if (topJuegos.length < 2 || actualValor === extraerValoracion(topJuegos[1].valoracion)) {
            topJuegos.push(juegosOrdenados[i]);
          } else {
            topJuegos.push(juegosOrdenados[i]);
          }
          i++;
        }
        setJuegos(topJuegos.slice(0, 3));
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudieron cargar los juegos populares');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className={styles.loading}>Cargando juegos populares...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <section className={styles.popularesSection}>
      <h2 className={styles.titulo}>Juegos Populares</h2>
      <div className={styles.juegosGrid}>
        {juegos.map((juego, idx) => (
          <div key={idx} className={styles.juegoCard + ' fadeInUp'}>
            <img src={`${import.meta.env.VITE_BACKEND_URL}${juego.imagen}`} alt={juego.titulo} className={styles.juegoImg} />
            <div className={styles.juegoInfo}>
              <h3 className={styles.juegoTitulo}>{juego.titulo}</h3>
              <p className={styles.juegoGenero}>{juego.genero}</p>
              <p className={styles.juegoDescripcion}>{juego.descripcion}</p>
              <p className={styles.juegoValoracion}>{juego.valoracion}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
