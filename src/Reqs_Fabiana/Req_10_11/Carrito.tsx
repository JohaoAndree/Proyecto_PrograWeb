import { useState } from "react";
import type { Juego } from "../Req_9/dataJuegos";
import { listaJuegos } from "../Req_9/dataJuegos";

function Carrito() {
  const [carrito] = useState<Juego[]>(listaJuegos); // ← Siempre usa los 3 juegos base
  const [juegoAEliminar, setJuegoAEliminar] = useState<Juego | null>(null);

  return (
    <div className="container mt-5">
      <h2 className="text-success text-center mb-4">🛒 Carrito de Compras</h2>

      <div className="row">
        {carrito.map(juego => (
          <div key={juego.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow border-0">
              <img
                src={juego.cover}
                className="card-img-top"
                alt={juego.titulo}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body bg-light rounded-bottom">
                <h5 className="card-title text-primary">{juego.titulo}</h5>
                <p className="card-text text-dark">{juego.desc}</p>
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => setJuegoAEliminar(juego)}
                >
                  Eliminar 🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón Finalizar Compra */}
      {carrito.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg w-100" style={{ maxWidth: "500px" }}>
            ✅ FINALIZAR COMPRA
          </button>
        </div>
      )}

      {/* Mini interfaz de confirmación, solo visual */}
      {juegoAEliminar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
        >
          <div className="bg-white p-4 rounded shadow-lg text-center" style={{ maxWidth: "400px" }}>
            <h4 className="text-danger mb-3">
              ¿Está seguro de eliminar <strong>{juegoAEliminar.titulo}</strong>?
            </h4>
            <div className="d-flex justify-content-center gap-3">
              <button
                className="btn btn-secondary"
                onClick={() => setJuegoAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setJuegoAEliminar(null)} // No elimina realmente
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;
