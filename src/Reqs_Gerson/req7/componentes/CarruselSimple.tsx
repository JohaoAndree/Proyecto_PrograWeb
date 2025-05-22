import React, { useEffect, useRef, useState } from "react";
import "./CarruselSimple.css";

interface Juego {
  titulo: string;
  imagen: string;
  descripcion: string;
}

interface Props {
  juegos: Juego[];
}

const CarruselSimple: React.FC<Props> = ({ juegos }) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const total = juegos.length;

  useEffect(() => {
    if (isTransitioning) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  }, [isTransitioning]);

  const prev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="carrusel-contenedor">
      <div className="carrusel-contenido">
        <button className="flecha izquierda" onClick={prev}>
          <svg viewBox="0 0 24 24">
            <path
              d="M15 6L9 12L15 18"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="carrusel-lista">
          {juegos.map((juego, i) => {
            let posicion = i - index;
            if (posicion < -Math.floor(total / 2)) posicion += total;
            if (posicion > Math.floor(total / 2)) posicion -= total;

            return (
              <div
                key={i}
                className={`carrusel-item ${posicion === 0 ? "activo" : ""}`}
                style={{
                  transform: `translateX(${posicion * 260}px) scale(${
                    posicion === 0 ? 1 : 0.8
                  }) rotateY(${posicion * 15}deg)`,
                  zIndex: posicion === 0 ? 1 : 0,
                  opacity: Math.abs(posicion) > 2 ? 0 : 1,
                }}
              >
                <img src={juego.imagen} alt={juego.titulo} />
                {posicion === 0 && (
                  <>
                    <h4>{juego.titulo}</h4>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <button className="flecha derecha" onClick={next}>
          <svg viewBox="0 0 24 24">
            <path
              d="M9 6L15 12L9 18"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Descripción separada visualmente */}
      <div className="descripcion-juego">
        <p>{juegos[index].descripcion}</p>
      </div>
    </div>
  );
};

export default CarruselSimple;

