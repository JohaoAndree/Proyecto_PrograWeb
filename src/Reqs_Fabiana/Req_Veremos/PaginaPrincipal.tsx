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

function PaginaPrincipal() {
  return (
    <div className="container mt-4">
      <div className={styles.carrusel}>
        <Carousel fade indicators={false}>
          <Carousel.Item>
            <img src={godOfWar} alt="God of War Ragnarok" className={styles.carruselImg} />
            <Carousel.Caption className={styles.carruselCaption}>
              <p style={{ color: '#EAEAEA', margin: '0', fontSize: '1.1rem' }}>La épica conclusión nórdica de Kratos y Atreus.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={minecraft} alt="Minecraft" className={styles.carruselImg} />
            <Carousel.Caption className={styles.carruselCaption}>
              <p style={{ color: '#EAEAEA', margin: '0', fontSize: '1.1rem' }}>Explora, construye y sobrevive en un mundo pixelado sin fin.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={residentEvil} alt="Resident Evil Village" className={styles.carruselImg} />
            <Carousel.Caption className={styles.carruselCaption}>
              <p style={{ color: '#EAEAEA', margin: '0', fontSize: '1.1rem' }}>Terror y acción en la octava entrega de la saga.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={mariobros} alt="Mario Bros" className={styles.carruselImg} />
            <Carousel.Caption className={styles.carruselCaption}>
              <p style={{ color: '#EAEAEA', margin: '0', fontSize: '1.1rem' }}>¡Únete a Mario y sus amigos en una nueva aventura!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={witcher} alt="The Witcher 3 Wild Hunt" className={styles.carruselImg} />
            <Carousel.Caption className={styles.carruselCaption}>
              <p style={{ color: '#EAEAEA', margin: '0', fontSize: '1.1rem' }}>La conclusión de la saga de Geralt de Rivia.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={genshin} alt="Genshin Impact" className={styles.carruselImg} />
            <Carousel.Caption className={styles.carruselCaption}>
              <p style={{ color: '#EAEAEA', margin: '0', fontSize: '1.1rem' }}>Explora Teyvat, un mundo de fantasía lleno de aventuras.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <JuegosPopulares />

      <section className={styles.sectionCard + ' fadeInUp'}>
        <h2 className={styles.sectionTitle}>Sobre Nosotros</h2>
        <p className={styles.sectionText}>
          Somos una tienda virtual apasionada por los videojuegos. Nuestro objetivo es ofrecer la mejor selección de títulos para todas las plataformas y géneros, con precios competitivos y atención personalizada.
        </p>
      </section>

      <section className={styles.sectionCard + ' fadeInUp'}>
        <h2 className={styles.sectionTitle}>Contacto</h2>
        <form className="mx-auto" style={{ maxWidth: '600px' }} aria-label="Formulario de contacto">
          <div className="mb-3">
            <label htmlFor="nombre" className={styles.formLabel}>Nombre</label>
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
          <button type="submit" className="btn btn-primary" aria-label="Enviar mensaje de contacto">Enviar</button>
        </form>
      </section>

      <section className={styles.sectionCard + ' fadeInUp'}>
        <h2 className={styles.sectionTitle}>Información</h2>
        <ul className="list-unstyled text-center">
          <li className={styles.sectionText}>📦 Envíos a todo el país</li>
          <li className={styles.sectionText}>🔐 Compras 100% seguras</li>
          <li className={styles.sectionText}>💳 Múltiples métodos de pago</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}

export default PaginaPrincipal;
