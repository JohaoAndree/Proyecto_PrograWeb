import "bootstrap/dist/css/bootstrap.min.css";
import CarruselSimple from "./componentes/CarruselSimple";
import "./componentes/Global.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface Juego {
  titulo: string;
  imagen: string;
  descripcion: string;
}

const Req7 = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);

  useEffect(() => {
    let ignore = false;
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/gerson/games/masvendidos`)
      .then((res) => {
        if (ignore) return;
        // Agrega el dominio del backend a la imagen si es ruta relativa
        const juegosConImagenes = res.data.map((juego: Juego) => ({
          ...juego,
          imagen: juego.imagen.startsWith("http")
            ? juego.imagen
            : `${import.meta.env.VITE_BACKEND_URL}${juego.imagen}`,
        }));
        setJuegos(juegosConImagenes);
      })
      .catch((err) => console.error("Error al obtener juegos:", err));
    return () => { ignore = true; };
  }, []);

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
      <CarruselSimple juegos={juegos} />
    </div>
  );
};

export default Req7;