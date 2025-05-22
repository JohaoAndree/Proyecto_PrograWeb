import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import SeccionJuegos from './Paginas/SeccionJuegos';
import minecraft from "../Req_Test/Imagenes_Prueba_Carrusel/minecraft.png"
import fifa13 from "../Req_Test/Imagenes_Prueba_Carrusel/fifa13.jpg"
import genshin from "../Req_Test/Imagenes_Prueba_Carrusel/genshin.jpg"

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
          <img className="d-block w-100" src={fifa13} alt="FIFA" />
          <Carousel.Caption>
            <h3>FIFA 13</h3>
            <p>¡Juego futbol!</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={genshin} alt="Genshin" />
          <Carousel.Caption>
            <h3>Genshin Impact</h3>
            <p>Bienvenidos a Teyvat, un continente de mil maravillas donde incontables criaturas prosperan en armonía.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <SeccionJuegos />
    </div>
    )
}

export default PaginaPrincipal