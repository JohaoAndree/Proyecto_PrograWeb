import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import CarruselSimple from "./componentes_req8/CarruselSimple";
import "./componentes_req8/Global.css";

interface Juego {
  titulo: string;
  imagen: string;
  descripcion: string;
}

const Req8 = () => {
  const [juegos, setJuegos] = useState<Juego[] | null>(null);

  useEffect(() => {
    axios
  .get("http://localhost:5000/devs/gerson/juegos-populares")
  .then((res) => setJuegos(res.data))
  .catch((err) =>
    console.error("Error al cargar los juegos populares", err)
  );



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
        🎮 Juegos Más Populares 🎯
      </h2>
      {juegos ? (
        <CarruselSimple juegos={juegos} />
      ) : (
        <p style={{ textAlign: "center" }}>Cargando juegos...</p>
      )}
    </div>
  );
};

export default Req8;
