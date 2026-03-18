import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import styles from './styles.module.css';
import godOfWar from '../Req_Veremos/Imagenes_Carrusel/God_of_War_Ragnarok.jpg';
import minecraft from '../Req_Veremos/Imagenes_Carrusel/minecraft.png';
import residentEvil from '../Req_Veremos/Imagenes_Carrusel/Resident_Evil_Village.jpg';
import mariobros from '../Req_Veremos/Imagenes_Carrusel/mariobros.png';
import witcher from '../Req_Veremos/Imagenes_Carrusel/The_Witcher_3_Wild_Hunt.png';
import genshin from '../Req_Veremos/Imagenes_Carrusel/genshin.jpg';
import JuegosPopulares from './Componentes/JuegosPopulares';
import Footer from './Componentes/Footer';
import Skeleton, { SkeletonCard } from '../../Shared/Components/SkeletonView';

function PaginaPrincipal() {
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  const handleImageLoad = (key: string) => {
    setImagesLoaded(prev => ({ ...prev, [key]: true }));
  };

  const carruselItems = [
    { src: godOfWar, title: "God of War Ragnarök", alt: "God of War Ragnarok", caption: "Embárcate en un viaje tras el Fimbulwinter para encontrar respuestas antes del fin del mundo." },
    { src: minecraft, title: "Minecraft World", alt: "Minecraft", caption: "Crea, sobrevive y explora en un mundo infinito de bloques donde tu imaginación es el único límite." },
    { src: residentEvil, title: "Resident Evil Village", alt: "Resident Evil Village", caption: "Descubre el horror en una villa llena de terrores antiguos y secretos oscuros." },
    { src: mariobros, title: "Super Mario Wonder", alt: "Mario Bros Wonder", caption: "Experimenta la maravilla en el Reino Flor con efectos que transforman el mundo de juego." },
    { src: witcher, title: "The Witcher 3: Wild Hunt", alt: "The Witcher 3", caption: "Conviértete en un cazador profesional de monstruos y busca a la niña de la profecía." },
    { src: genshin, title: "Genshin Impact", alt: "Genshin Impact", caption: "Un viaje a través de Teyvat donde reunirás aliados elementales en un vasto mundo abierto." },
  ];

  return (
    <div className="container pt-4">
      {/* Carrusel Premium con Descripciones */}
      <div className={styles.carrusel}>
        <Carousel indicators={false} interval={5000} pause="hover">
          {carruselItems.map((item, index) => (
            <Carousel.Item key={index} className={styles.carruselItem}>
              {!imagesLoaded[item.src] && (
                <Skeleton width="100%" height="100%" borderRadius="0" />
              )}
              <img
                src={item.src}
                alt={item.alt}
                className={styles.carruselImg}
                onLoad={() => handleImageLoad(item.src)}
                style={{ opacity: imagesLoaded[item.src] ? 1 : 0 }}
              />
              {imagesLoaded[item.src] && (
                <Carousel.Caption className={styles.carruselCaption}>
                  <h2 className={styles.captionTitle}>{item.title}</h2>
                  <p className={styles.captionText}>{item.caption}</p>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Top juegos: show local skeletons until carousel images load */}
      {(!carruselItems.every(i => imagesLoaded[i.src])) ? (
        <section style={{ marginTop: '1rem' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <h2 className={styles.sectionTitle}>Top Juegos de la Semana</h2>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </section>
      ) : (
        <JuegosPopulares />
      )}

      <section className={`${styles.sectionCard} fadeInUp`}>
        <h2 className={styles.sectionTitle}>Sobre Nosotros</h2>
        <p className={styles.sectionText}>
          Somos una tienda virtual apasionada por los videojuegos. Nuestro objetivo es ofrecer la mejor selección de títulos para todas las plataformas y géneros, con precios competitivos y atención personalizada para que tu experiencia gamer sea inigualable.
        </p>
      </section>

      <section className={`${styles.sectionCard} fadeInUp`}>
        <h2 className={styles.sectionTitle}>Contacto</h2>
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <form aria-label="Formulario de contacto">
            <div className="mb-3">
              <label htmlFor="nombre" className={styles.formLabel}>Nombre completo</label>
              <input id="nombre" name="nombre" type="text" className={styles.formInput + " form-control"} placeholder="Tu nombre" aria-required="true" />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className={styles.formLabel}>Correo electrónico</label>
              <input id="correo" name="correo" type="email" className={styles.formInput + " form-control"} placeholder="correo@ejemplo.com" aria-required="true" />
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className={styles.formLabel}>Mensaje</label>
              <textarea id="mensaje" name="mensaje" className={styles.formInput + " form-control"} rows={4} placeholder="Escribe tu mensaje aquí..." aria-required="true"></textarea>
            </div>
            <button type="submit" className={styles.btnSubmit} aria-label="Enviar mensaje de contacto">Enviar Mensaje</button>
          </form>
        </div>
      </section>

      <section className={`${styles.sectionCard} fadeInUp`}>
        <h2 className={styles.sectionTitle}>¿Por qué elegirnos?</h2>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <h4 style={{ color: '#00D1FF', marginBottom: '0.5rem' }}>📦 Envíos Seguros</h4>
            <p className={styles.sectionText} style={{ fontSize: '0.95rem' }}>Cobertura a todo el país con los mejores tiempos de entrega.</p>
          </div>
          <div className={styles.infoItem}>
            <h4 style={{ color: '#00D1FF', marginBottom: '0.5rem' }}>🔐 Protección Total</h4>
            <p className={styles.sectionText} style={{ fontSize: '0.95rem' }}>Tus transacciones y datos están resguardados al 100%.</p>
          </div>
          <div className={styles.infoItem}>
            <h4 style={{ color: '#00D1FF', marginBottom: '0.5rem' }}>💳 Variedad de Pago</h4>
            <p className={styles.sectionText} style={{ fontSize: '0.95rem' }}>Aceptamos múltiples métodos para tu mayor comodidad.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default PaginaPrincipal;
