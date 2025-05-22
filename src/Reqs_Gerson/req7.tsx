import { useState } from "react";
import CarruselSimple from "../req8/componentes_req8/CaaruselSimple";
import "./componentes/Global.css";
import Navegacion from "./componentes/Navegacion";
import Titulo from "./componentes/Titulo";

const juegosMasVendidos = [
  {
    titulo: "GTA V",
    imagen: "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    descripcion: "Juego de mundo abierto desarrollado por Rockstar Games.",
  },
  {
    titulo: "Elden Ring",
    imagen: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    descripcion: "RPG de acción de mundo abierto creado por FromSoftware.",
  },
  {
    titulo: "Super Smash Bros. Ultimate",
    imagen: "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg",
    descripcion: "Juego de lucha crossover de Nintendo.",
  },
  {
    titulo: "God of War",
    imagen: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    descripcion: "Aventura épica basada en la mitología nórdica.",
  },
];

const juegosMejorValorados = [
  {
    titulo: "Red Dead Redemption 2",
    imagen: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    descripcion: "Western de acción con mundo abierto y narrativa profunda.",
  },
  {
    titulo: "God of War",
    imagen: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    descripcion: "Viaje de Kratos y su hijo por tierras nórdicas.",
  },
  {
    titulo: "Cyberpunk 2077",
    imagen: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    descripcion: "RPG futurista con personalización y libertad de juego.",
  },
  {
    titulo: "The Witcher 3: Wild Hunt",
    imagen: "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    descripcion: "Aventura fantástica de mundo abierto con narrativa rica.",
  },
];

const Req7 = () => {
  const [tabActivo, setTabActivo] = useState("vendidos");
  const juegos = tabActivo === "vendidos" ? juegosMasVendidos : juegosMejorValorados;

  return (
    <div className="pagina">
      <Titulo />
      <Navegacion tabActivo={tabActivo} setTabActivo={setTabActivo} />
      <CarruselSimple juegos={juegos} />
    </div>
  );
};

export default Req7;
