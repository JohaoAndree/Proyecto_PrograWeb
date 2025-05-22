import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import minecraft from '../Req_Veremos/Imagenes_Prueba_Carrusel/minecraft.png';
import mariobros from '../Req_Veremos/Imagenes_Prueba_Carrusel/mariobros.png';
import genshin from '../Req_Veremos/Imagenes_Prueba_Carrusel/genshin.jpg';

function PaginaPrincipal() {
  return (
    <div className="container mt-4">
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={minecraft} alt="Minecraft" />
          <Carousel.Caption>
            <h3>Minecraft</h3>
            <p>Explora, construye y sobrevive en un mundo pixelado sin fin.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={mariobros} alt="FIFA" />
          <Carousel.Caption>
            <h3>MarioBros</h3>
            <p>¡Únete a Mario y sus amigos en una nueva y maravillosa aventura de desplazamiento lateral!</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={genshin} alt="Fortnite" />
          <Carousel.Caption>
            <h3>Genshin Impact</h3>
            <p>Bienvenidos a Teyvat, un continente de mil maravillas donde incontables criaturas prosperan en armonía.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default PaginaPrincipal;