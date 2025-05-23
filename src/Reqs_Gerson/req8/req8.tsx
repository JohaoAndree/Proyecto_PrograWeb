import "bootstrap/dist/css/bootstrap.min.css";
import CarruselSimple from "./componentes_req8/CarruselSimple";
import "./componentes_req8/Global.css";
import ci from "./imagenes/ci.jpg";
import doom from "./imagenes/doom.jpg";
import god from "./imagenes/god.jpg";
import h from "./imagenes/h.jpg";
import mo from "./imagenes/mo.jpg";
import read from "./imagenes/read.jpg";
import sh from "./imagenes/sh.jpg";
import wi from "./imagenes/wi.jpg";
import x from "./imagenes/x.jpg";

const juegosMasVendidos = [
  {
    titulo: "Red Dead Redemption 2",
    imagen: read,
    descripcion: `Lanzado el 26 de octubre de 2018 por Rockstar Games, Red Dead Redemption 2 es un juego de acción-aventura de mundo abierto ambientado en 1899. Sigue la historia de Arthur Morgan, un forajido de la banda de Dutch van der Linde, mientras enfrenta dilemas morales, persecuciones y el ocaso del Viejo Oeste.

La narrativa envolvente, la atención al detalle en cada entorno y las mecánicas de simulación realista lo convierten en una obra maestra moderna. Es uno de los títulos más aclamados de la historia de los videojuegos.
★★★★★ 10/10`,
  },
  {
    titulo: "Cyberpunk 2077",
    imagen: ci,
    descripcion: `Desarrollado por CD Projekt RED y lanzado el 10 de diciembre de 2020, Cyberpunk 2077 es un RPG de acción ambientado en Night City, una metrópolis futurista repleta de crimen, corporaciones y mejoras cibernéticas. El jugador encarna a V, un mercenario que busca un implante que podría otorgarle la inmortalidad.

A pesar de un inicio accidentado, múltiples actualizaciones han elevado el juego a una experiencia digna de su ambición. Su historia profunda, ambientación distópica y opciones de personalización son de alto nivel.
★★★★☆ 8/10`,
  },
  {
    titulo: "The Witcher 3: Wild Hunt",
    imagen: wi,
    descripcion: `Lanzado en 2015 por CD Projekt RED, The Witcher 3 es un RPG de acción que sigue las aventuras de Geralt de Rivia, un cazador de monstruos profesional, en su búsqueda de su hija adoptiva Ciri, mientras se enfrenta a la amenaza de la Cacería Salvaje.

Su historia no lineal, misiones secundarias bien escritas y un mundo abierto increíblemente rico lo convierten en uno de los mejores videojuegos jamás creados. Un clásico imprescindible para todo gamer.
★★★★★ 10/10`,
  },
  {
    titulo: "Assassin's Creed: Shadows",
    imagen: sh,
    descripcion: `Desarrollado por Ubisoft Quebec, Assassin’s Creed: Shadows se lanzará en 2025 y transporta la saga al Japón feudal. El jugador alterna entre Naoe, una hábil kunoichi, y Yasuke, un poderoso samurái, cada uno con su propio estilo de juego y narrativa.

Este título introduce paisajes impresionantes, ciclos de estaciones, combate táctico y sigilo renovado, marcando una evolución en la franquicia.
★★★★☆ 8.5/10`,
  },
  {
    titulo: "Ghost of Yōtei",
    imagen: x,
    descripcion: `Ghost of Yōtei, la secuela espiritual de Ghost of Tsushima, está programado para 2025 y es desarrollado por Sucker Punch Productions. La historia sigue a Atsu, una guerrera de origen ainu, mientras combate invasores y fuerzas internas en las tierras nevadas del norte de Japón.

Con una dirección artística refinada, combates mejorados y una narrativa emocional, es uno de los títulos más esperados de la generación.
★★★★☆ 8.5/10`,
  },
  {
    titulo: "Silent Hill f",
    imagen: h,
    descripcion: `Desarrollado por NeoBards Entertainment, Silent Hill f es una nueva entrega en la franquicia de terror psicológico de Konami. Ambientado en Japón en los años 60, presenta una historia completamente independiente, con nuevos personajes y una estética influenciada por el horror folclórico oriental.

El juego promete una experiencia inquietante y perturbadora, manteniendo la esencia clásica de Silent Hill pero con un enfoque fresco.
★★★★☆ 8/10`,
  },
  {
    titulo: "DOOM: The Dark Ages",
    imagen: doom,
    descripcion: `DOOM: The Dark Ages, desarrollado por id Software, se lanzará en 2025 como una precuela de DOOM (2016) y DOOM Eternal. En esta versión, el jugador asume el rol del DOOM Slayer en un universo medieval repleto de enemigos demoníacos, mazmorras oscuras y armas brutales.

Conserva la esencia rápida y visceral de la saga, pero con una ambientación gótica más sombría y narrativa más estructurada.
★★★★☆ 8.5/10`,
  },
  {
    titulo: "Monster Hunter Wilds",
    imagen: mo,
    descripcion: `Desarrollado por Capcom y con lanzamiento planeado para 2025, Monster Hunter Wilds es un RPG de acción centrado en la caza de criaturas gigantes en entornos salvajes y dinámicos. Presenta nuevas zonas interconectadas, clima dinámico y una narrativa más cinematográfica.

Es una evolución natural de la serie, ideal para el juego cooperativo, con mejoras visuales y un ecosistema más realista.
★★★★☆ 8.5/10`,
  },
  {
    titulo: "God of War Ragnarök",
    imagen: god,
    descripcion: `Lanzado el 9 de noviembre de 2022 por Santa Monica Studio, God of War Ragnarök continúa la historia de Kratos y Atreus en su enfrentamiento contra los dioses nórdicos en los momentos previos al fin del mundo.

Con un sistema de combate más refinado, exploración expandida y una narrativa que mezcla acción, mitología y emoción, se consolidó como uno de los juegos más importantes de la PS5.
★★★★★ 10/10`,
  },
];

const Req8 = () => {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      <h2
        style={{
          color: "#1e1e2f",
          textAlign: "center",
          fontFamily: "'Orbitron', sans-serif",
          padding: "30px 0 40px",
        }}
      >
        🎮 Juegos Más Populares 🎯
      </h2>
      <CarruselSimple juegos={juegosMasVendidos} />
    </div>
  );
};

export default Req8;
