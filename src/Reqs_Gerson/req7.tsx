import { useState } from "react";
import Lista from "./componentes/Lista";
import Navegacion from "./componentes/Navegacion";
import Titulo from "./componentes/Titulo";
import "./componentes/Global.css";

const juegosMasVendidos = [
  {
    titulo: "GTA V",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
  },
  {
    titulo: "Elden Ring",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
  },
  {
    titulo: "Super Smash Bros. Ultimate",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg",
  },
  {
    titulo: "God of War",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
  },
];

const juegosMejorValorados = [
  {
    titulo: "Red Dead Redemption 2",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
  },
  {
    titulo: "God of War",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
  },

  {
    titulo: "Cyberpunk 2077",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
  },
  {
    titulo: "The Witcher 3: Wild Hunt",
    imagen:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
  },
];

const Req7 = () => {
  const [tabActivo, setTabActivo] = useState("vendidos");

  const juegos =
    tabActivo === "vendidos" ? juegosMasVendidos : juegosMejorValorados;

  return (
    <div className="pagina">
      <Titulo />
      <Navegacion tabActivo={tabActivo} setTabActivo={setTabActivo} />
      <Lista juegos={juegos} />
    </div>
  );
};

export default Req7;
