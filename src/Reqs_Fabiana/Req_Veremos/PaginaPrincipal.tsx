import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import genshin from '../Req_Veremos/Imagenes_Prueba_Carrusel/genshin.jpg';
import mariobros from '../Req_Veremos/Imagenes_Prueba_Carrusel/mariobros.png';
import minecraft from '../Req_Veremos/Imagenes_Prueba_Carrusel/minecraft.png';

function PaginaPrincipal() {
  return (
    <div className="container mt-4">
      {/* Carrusel */}
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={minecraft} alt="Minecraft" />
          <Carousel.Caption>
            <h3>Minecraft</h3>
            <p>Explora, construye y sobrevive en un mundo pixelado sin fin.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={mariobros} alt="Mario Bros" />
          <Carousel.Caption>
            <h3>Mario Bros</h3>
            <p>¡Únete a Mario y sus amigos en una nueva aventura!</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={genshin} alt="Genshin Impact" />
          <Carousel.Caption>
            <h3>Genshin Impact</h3>
            <p>Explora Teyvat, un mundo de fantasía lleno de aventuras.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Categorías */}
      <section className="mt-5">
        <h2 className="text-center mb-4">Categorías Populares</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <h5>🎮 Aventura</h5>
            <p>Explora mundos llenos de retos y descubrimientos.</p>
          </div>
          <div className="col-md-4">
            <h5>⚔️ Acción</h5>
            <p>Combates intensos y adrenalina pura.</p>
          </div>
          <div className="col-md-4">
            <h5>🧩 Estrategia</h5>
            <p>Juegos que pondrán a prueba tu mente.</p>
          </div>
        </div>
      </section>

      {/* Juegos populares */}
      <section className="mt-5">
        <h2 className="text-center mb-4">Juegos Populares</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <img src={minecraft} alt="Minecraft" className="img-fluid mb-2" />
            <h5>Minecraft</h5>
          </div>
          <div className="col-md-4">
            <img src={mariobros} alt="Mario Bros" className="img-fluid mb-2" />
            <h5>Mario Bros</h5>
          </div>
          <div className="col-md-4">
            <img src={genshin} alt="Genshin Impact" className="img-fluid mb-2" />
            <h5>Genshin Impact</h5>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section className="mt-5 bg-light p-4 rounded">
        <h2 className="text-center">Sobre Nosotros</h2>
        <p className="text-center">
          Somos una tienda virtual apasionada por los videojuegos. Nuestro objetivo es ofrecer la mejor selección de títulos para todas las plataformas y géneros, con precios competitivos y atención personalizada.
        </p>
      </section>

      {/* Contacto */}
      <section className="mt-5">
        <h2 className="text-center">Contacto</h2>
        <form className="mx-auto" style={{ maxWidth: '600px' }}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" placeholder="Tu nombre" />
          </div>
          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" placeholder="correo@ejemplo.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea className="form-control" rows={4} placeholder="Escribe tu mensaje aquí..."></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </section>

      {/* Información adicional */}
      <section className="mt-5 bg-light p-4 rounded">
        <h2 className="text-center">Información</h2>
        <ul className="list-unstyled text-center">
          <li>📦 Envíos a todo el país</li>
          <li>🔐 Compras 100% seguras</li>
          <li>💳 Múltiples métodos de pago</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-5 py-4 bg-dark text-light text-center">
        <p>&copy; 2025 Tienda de Videojuegos. Todos los derechos reservados.</p>
        <p>
          <a href="#inicio" className="text-light me-3">Inicio</a>
          <a href="#contacto" className="text-light me-3">Contacto</a>
          <a href="#terminos" className="text-light">Términos y condiciones</a>
        </p>
      </footer>
    </div>
  );
}

export default PaginaPrincipal;
