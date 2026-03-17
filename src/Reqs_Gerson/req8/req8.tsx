import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Container, Carousel, Modal, Button } from "react-bootstrap";
import { FaGamepad, FaStar, FaTags, FaFire, FaTimes, FaInfoCircle } from "react-icons/fa";
import backend from "../../api/axios";
import styles from "./Req8.module.css";

interface Juego {
  titulo: string;
  imagen: string;
  descripcion: string;
  genero?: string | string[];
  plataforma?: string | string[];
  valoracion: string | number;
}

const Req8 = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJuego, setSelectedJuego] = useState<Juego | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (juego: Juego) => {
    setSelectedJuego(juego);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const extractRating = (val: string | number | undefined) => {
    if (!val) return "N/A";
    const str = String(val);
    const match = str.match(/([0-9]+\.?[0-9]*\/10)/);
    return match ? match[1] : (str.split(' ').pop() || "N/A");
  };

  const cleanDescription = (val: string | number | undefined) => {
    if (!val) return "";
    const str = String(val);
    return str.replace(/ ★.*$| [0-9.]+\/10$/, "").trim();
  };

  useEffect(() => {
    let ignore = false;
    backend
      .get("/api/gerson/games/juegos-populares")
      .then((res) => {
        if (!ignore) {
          const juegosConImagenes = res.data.map((juego: Juego) => ({
            ...juego,
            imagen: juego.imagen.startsWith("http")
              ? juego.imagen
              : `${import.meta.env.VITE_BACKEND_URL}/${juego.imagen.replace(/^\//, '')}`,
          }));
          setJuegos(juegosConImagenes);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error al cargar los juegos populares", err);
        setLoading(false);
      });
    return () => { ignore = true; };
  }, []);

  if (loading) {
    return <div className={styles.loading}>🔥 Cargando juegos populares...</div>;
  }

  // Separar el top 3 para el carrusel y el resto para la grilla
  const top3Juegos = juegos.slice(0, 3);
  const restoJuegos = juegos.slice(3);

  return (
    <div className={styles.pageContainer}>
      <Container>
        <h2 className={styles.pageTitle}>
          <FaFire style={{
            color: '#FF4500',
            filter: 'drop-shadow(0 0 10px rgba(255, 69, 0, 0.8)) drop-shadow(0 0 20px rgba(255, 69, 0, 0.4))',
            marginRight: '15px'
          }} />
          Juegos Más Populares
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
                  <Carousel.Caption className={styles.carruselCaption} onClick={() => handleOpenModal(juego)} style={{ cursor: 'pointer' }}>
                    <div className={styles.topRankBadge}>
                      # {idx + 1}
                    </div>
                    <h3 className={styles.carruselTitle}>{juego.titulo}</h3>
                    <p className={styles.carruselDesc}>
                      {juego.descripcion}
                      <span className={styles.readMore}>...</span>
                    </p>
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
                      <span className={styles.ratingBadge}>
                        <FaStar /> {extractRating(juego.valoracion)}
                      </span>
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
              Lo más jugado del momento
            </h3>
            <div className={`${styles.juegosGrid} fadeInUp`} style={{ animationDelay: '0.2s' }}>
              {restoJuegos.map((juego, idx) => (
                <div key={juego.titulo} className={styles.juegoCard} onClick={() => handleOpenModal(juego)}>
                  <div className={styles.cardImgContainer}>
                    <div className={styles.topRankBadge}># {idx + 4}</div>
                    <img src={juego.imagen} alt={juego.titulo} className={styles.cardImg} />
                  </div>

                  <div className={styles.cardBody}>
                    <h4 className={styles.cardTitle}>{juego.titulo}</h4>
                    <p className={styles.cardDesc}>
                      {juego.descripcion}
                      <span className={styles.readMore}>...</span>
                    </p>

                    <div className={styles.badgeGroup} style={{ marginBottom: '1rem' }}>
                      {juego.genero && (
                        <span className={`${styles.badge} py-1 px-2`} style={{ fontSize: '0.75rem' }}>
                          {Array.isArray(juego.genero) ? juego.genero.join(', ') : String(juego.genero)}
                        </span>
                      )}
                      <span className={styles.ratingBadge} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                        <FaStar /> {extractRating(juego.valoracion)}
                      </span>
                    </div>

                    <div className={styles.cardFooter}>
                      <p className={styles.ratingText}>
                        {cleanDescription(juego.valoracion)}
                        <span className={styles.readMore}>...</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Modal de Detalles Premium */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          centered
          size="lg"
          className={styles.premiumModal}
        >
          {selectedJuego && (
            <>
              <Modal.Header className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>
                  <FaInfoCircle className="me-2 text-info" /> {selectedJuego.titulo}
                </Modal.Title>
                <button className={styles.btnClose} onClick={handleCloseModal}>
                  <FaTimes />
                </button>
              </Modal.Header>
              <Modal.Body className={styles.modalBody}>
                <div className={styles.modalImgContainer}>
                  <img src={selectedJuego.imagen} alt={selectedJuego.titulo} className={styles.modalImg} />
                  <div className={styles.modalRatingBadge}>
                    <FaStar /> {extractRating(selectedJuego.valoracion)}
                  </div>
                </div>

                <div className={styles.modalContent}>
                  <div className={styles.modalBadgeGroup}>
                    {selectedJuego.genero && (
                      <span className={styles.badge}>
                        <FaTags /> {Array.isArray(selectedJuego.genero) ? selectedJuego.genero.join(', ') : String(selectedJuego.genero)}
                      </span>
                    )}
                    {selectedJuego.plataforma && (
                      <span className={styles.badge}>
                        <FaGamepad /> {Array.isArray(selectedJuego.plataforma)
                          ? selectedJuego.plataforma.join(', ')
                          : String(selectedJuego.plataforma).replace(/([a-z])([A-Z])/g, '$1, $2').replace(/(\d)([A-Z])/g, '$1, $2')}
                      </span>
                    )}
                  </div>

                  <h5 className={styles.modalSectionTitle}>Descripción Completa</h5>
                  <p className={styles.modalText}>{selectedJuego.descripcion}</p>

                  <h5 className={styles.modalSectionTitle}>Valoración y Crítica</h5>
                  <p className={styles.modalText}>{cleanDescription(selectedJuego.valoracion)}</p>
                </div>
              </Modal.Body>
              <Modal.Footer className={styles.modalFooter}>
                <Button variant="outline-info" onClick={handleCloseModal} className={styles.modalBtn}>
                  Cerrar Detalles
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </Container>
    </div>
  );
};

export default Req8;
