import axios from "axios";
import { useEffect, useState } from "react";
import type { Juego } from "../Req_9/dataJuegos";
import { listaJuegos } from "../Req_9/dataJuegos";

function Carrito() {
  const [carrito, setCarrito] = useState<Juego[]>([]);
  const [juegoAEliminar, setJuegoAEliminar] = useState<Juego | null>(null);

  // Simulamos usuario autenticado
  const usuarioId = 1;

  // Al montar, cargamos los juegos del carrito si quieres desde el backend
  useEffect(() => {
    // Aquí podrías hacer GET desde backend para cargar carrito
    setCarrito(listaJuegos); // por ahora usa la lista local
  }, []);

  const eliminarJuego = async () => {
    if (!juegoAEliminar) return;

    try {
      await axios.delete(`http://localhost:5020/api/carrito/${usuarioId}/${juegoAEliminar.id}`);

      setCarrito(prev => prev.filter(j => j.id !== juegoAEliminar.id));
      setJuegoAEliminar(null);
    } catch (error) {
      console.error("Error eliminando juego del carrito:", error);
    }
  };

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

      {carrito.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-success btn-lg w-100" style={{ maxWidth: "500px" }}>
            ✅ FINALIZAR COMPRA
          </button>
        </div>
      )}

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
                onClick={eliminarJuego}
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