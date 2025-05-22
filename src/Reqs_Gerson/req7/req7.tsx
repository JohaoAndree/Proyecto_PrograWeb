// src/Reqs_Gerson/req7.tsx

// src/Reqs_Gerson/req7/req7.tsx

import "bootstrap/dist/css/bootstrap.min.css";
import CarruselSimple from "./componentes/CarruselSimple";
import "./componentes/Global.css";

import cod from "./imagenes/cod.jpg";
import diablo from "./imagenes/diablo.jpg";
import e from "./imagenes/e.jpg";
import f from "./imagenes/f.jpg";
import god from "./imagenes/god.jpg";
import gta from "./imagenes/gta.jpg";
import m from "./imagenes/m.jpg";
import resident from "./imagenes/resident.jpg";
import v from "./imagenes/v.jpg";





const juegosMasVendidos = [
  {
    titulo: "Resident Evil Village",
    imagen: v,
    descripcion:
      "Lanzado en 2021, Resident Evil Village es la octava entrega principal de la serie Resident Evil, desarrollada y publicada por Capcom. Es la secuela de Resident Evil 7: Biohazard (2017) y continúa la historia de Ethan Winters, quien busca a su hija secuestrada en un misterioso pueblo europeo. El juego combina elementos de terror y acción en primera persona, presentando enemigos como hombres lobo y vampiros, y ha sido elogiado por su atmósfera envolvente y gráficos impresionantes.",
  },
  {
    titulo: "Resident Evil 4",
    imagen: resident,
    descripcion:
      "Resident Evil 4, originalmente lanzado en 2005 y rehecho en 2023 por Capcom, sigue al agente Leon S. Kennedy en su misión de rescatar a la hija del presidente de EE. UU. en una aldea española infestada por una secta. Este remake moderniza la jugabilidad con gráficos actualizados y controles mejorados, manteniendo la tensión y el ritmo del original. Es considerado un hito en los juegos de acción y terror.",
  },
  {
    titulo: "Call Of Duty: Modern Warfare 3",
    imagen: cod,
    descripcion:
      "Call of Duty: Modern Warfare 3, desarrollado por Infinity Ward y Sledgehammer Games, fue lanzado en 2011 como la conclusión de la trilogía Modern Warfare. El juego ofrece una campaña intensa que sigue la lucha contra la organización terrorista ultranacionalista rusa. Con un multijugador robusto y modos cooperativos, MW3 es conocido por su acción rápida y mapas bien diseñados.",
  },
  {
    titulo: "Final Fantasy XVI",
    imagen: f,
    descripcion:
      "Final Fantasy XVI, lanzado en 2023 por Square Enix, es la decimosexta entrega principal de la serie. Ambientado en el mundo de Valisthea, el juego sigue a Clive Rosfield en una historia de venganza y destino. Con un sistema de combate en tiempo real y una narrativa madura, FF XVI marca un cambio hacia un tono más oscuro y político en la franquicia.",
  },
  {
    titulo: "Diablo IV",
    imagen: diablo,
    descripcion:
      "Diablo IV, desarrollado por Blizzard Entertainment, es la cuarta entrega principal de la serie y fue lanzado en 2023. Ambientado en el mundo de Santuario, el juego presenta un estilo más oscuro y gótico, con un mundo abierto y cinco clases jugables. Ofrece una experiencia de acción y rol con énfasis en la personalización y el juego en línea.",
  },
  {
    titulo: "Grand Theft Auto V",
    imagen: gta,
    descripcion:
      "Grand Theft Auto V, desarrollado por Rockstar North y lanzado en 2013, es un juego de acción y aventura en mundo abierto. Ambientado en la ciudad ficticia de Los Santos, sigue las historias entrelazadas de tres protagonistas: Michael, Franklin y Trevor. Con una narrativa envolvente y un vasto mundo para explorar, GTA V ha sido aclamado por su profundidad y atención al detalle.",
  },
  {
    titulo: "Elden Ring",
    imagen: e,
    descripcion:
      "Elden Ring, desarrollado por FromSoftware y publicado por Bandai Namco en 2022, es un juego de rol de acción en un mundo abierto. Creado en colaboración con George R. R. Martin, el juego ofrece una experiencia desafiante con un extenso lore y libertad de exploración. Su jugabilidad combina elementos de la serie Souls con nuevas mecánicas y un vasto entorno.",
  },
  {
    titulo: "Super Smash Bros Ultimate",
    imagen: m,
    descripcion:
      "Super Smash Bros. Ultimate, lanzado en 2018 para Nintendo Switch, es un juego de lucha que reúne a personajes de diversas franquicias de videojuegos. Con más de 70 luchadores y numerosos escenarios, ofrece combates dinámicos y accesibles para jugadores de todos los niveles. Es celebrado por su contenido extenso y su homenaje a la historia de los videojuegos.",
  },
  {
    titulo: "God of War Ragnarök",
    imagen: god,
    descripcion:
      "God of War Ragnarök, desarrollado por Santa Monica Studio y lanzado en 2022, continúa la saga de Kratos y su hijo Atreus en la mitología nórdica. El juego combina combates intensos con una narrativa emocional, explorando temas de paternidad y destino. Con gráficos impresionantes y una jugabilidad refinada, es una culminación épica de la historia iniciada en el reinicio de 2018.",
  },
];



const Req7 = () => {
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
        🎮 Juegos Más Vendidos 🎯
      </h2>
      <CarruselSimple juegos={juegosMasVendidos} />
    </div>
  );
};

export default Req7;
