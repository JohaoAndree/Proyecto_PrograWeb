import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Carousel } from "react-bootstrap";
import { FaGamepad, FaStar, FaTags, FaTrophy } from "react-icons/fa";
import axios from "axios";
import styles from "./Req7.module.css";

interface Juego {
  titulo: string;
  imagen: string;
  descripcion: string;
  genero?: string;
  plataforma?: string;
  valoracion?: number;
}

const Req7 = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gerson/games/masvendidos`)
      .then((res) => {
        if (ignore) return;
        // Agrega el dominio del backend a la imagen si es ruta relativa
        const juegosConImagenes = res.data.map((juego: Juego) => ({
          ...juego,
          imagen: juego.imagen.startsWith("http")
            ? juego.imagen
            : `${import.meta.env.VITE_BACKEND_URL}/${juego.imagen.replace(/^\//, '')}`,
        }));
        setJuegos(juegosConImagenes);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener juegos:", err);
        setLoading(false);
      });
    return () => { ignore = true; };
  }, []);

  if (loading) {
    return <div className={styles.loading}>🎮 Cargando juegos más vendidos...</div>;
  }

  // Separar el top 3 para el carrusel y el resto para la grilla
  const top3Juegos = juegos.slice(0, 3);
  const restoJuegos = juegos.slice(3);

  return (
    <div className={styles.pageContainer}>
      <Container>
        <h2 className={styles.pageTitle}>
          <FaTrophy style={{ color: '#FFD700', marginRight: '15px', marginBottom: '8px' }} />
          Juegos Más Vendidos
        </h2>

        {/* Carrusel Top 3 */}
        {top3Juegos.length > 0 && (
          <div className={`${styles.carruselContainer} fadeInUp`}>
            <Carousel fade indicators={true} interval={5000}>
              {top3Juegos.map((juego, idx) => (
                <Carousel.Item key={juego.titulo}>
                  <img
                    className={styles.carruselImg}
                    src={juego.imagen}
                    alt={juego.titulo}
                  />
                  <Carousel.Caption className={styles.carruselCaption}>
                    <div className={styles.topRankBadge} style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
                      # {idx + 1}
                    </div>
                    <h3 className={styles.carruselTitle}>{juego.titulo}</h3>
                    <p className={styles.carruselDesc}>{juego.descripcion}</p>
                    <div className={styles.badgeGroup}>
                      {juego.genero && (
                        <span className={styles.badge}>
                          <FaTags /> {Array.isArray(juego.genero) ? juego.genero.join(', ') : String(juego.genero)}
                        </span>
                      )}
                      {juego.plataforma && (
                        <span className={styles.badge}>
                          <FaGamepad /> {Array.isArray(juego.plataforma) 
                            ? juego.plataforma.join(', ') 
                            : String(juego.plataforma).replace(/([a-z])([A-Z])/g, '$1, $2').replace(/(\d)([A-Z])/g, '$1, $2')}
                        </span>
                      )}
                      {juego.valoracion && (
                        <span className={styles.badge} style={{ borderColor: 'rgba(255, 215, 0, 0.4)', color: '#FFD700', background: 'rgba(255, 215, 0, 0.1)' }}>
                          <FaStar /> {juego.valoracion}
                        </span>
                      )}
                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        )}

        {/* Grilla Resto de Juegos */}
        {restoJuegos.length > 0 && (
          <>
            <h3 className={styles.sectionTitle}>
              Continuando en el Top
            </h3>
            <div className={`${styles.juegosGrid} fadeInUp`} style={{ animationDelay: '0.2s' }}>
              {restoJuegos.map((juego, idx) => (
                <div key={juego.titulo} className={styles.juegoCard}>
                  <div className={styles.cardImgContainer}>
                    <div className={styles.topRankBadge}># {idx + 4}</div>
                    <img src={juego.imagen} alt={juego.titulo} className={styles.cardImg} />
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{juego.titulo}</h4>
                    <p className={styles.cardDesc}>{juego.descripcion}</p>
                    
                    <div className={styles.badgeGroup} style={{ marginBottom: '1rem' }}>
                      {juego.genero && (
                        <span className={`${styles.badge} py-1 px-2`} style={{ fontSize: '0.75rem' }}>
                          {Array.isArray(juego.genero) ? juego.genero.join(', ') : String(juego.genero)}
                        </span>
                      )}
                      {juego.plataforma && (
                        <span className={`${styles.badge} py-1 px-2`} style={{ fontSize: '0.75rem' }}>
                          {Array.isArray(juego.plataforma) 
                            ? juego.plataforma.join(', ') 
                            : String(juego.plataforma).replace(/([a-z])([A-Z])/g, '$1, $2').replace(/(\d)([A-Z])/g, '$1, $2')}
                        </span>
                      )}
                    </div>

                    {juego.valoracion && (
                      <div className={styles.cardFooter}>
                        <span className="text-secondary" style={{ fontSize: '0.9rem' }}>Valoración:</span>
                        <span className={styles.rating}>
                          {juego.valoracion} <FaStar style={{ marginBottom: '2px' }} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default Req7;