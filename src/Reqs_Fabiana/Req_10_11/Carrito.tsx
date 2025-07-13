import { useState } from "react";
import type { Juego } from "../Req_9/dataJuegos";
import { listaJuegos } from "../Req_9/dataJuegos";
import emailjs from "@emailjs/browser";

function Carrito() {
  const [carrito, setCarrito] = useState<Juego[]>(listaJuegos);
  const [juegoAEliminar, setJuegoAEliminar] = useState<Juego | null>(null);
  const [mostrarPago, setMostrarPago] = useState(false);
  const [tarjeta, setTarjeta] = useState("");
  const [fecha, setFecha] = useState("");
  const [cvv, setCvv] = useState("");
  const [metodoPago, setMetodoPago] = useState("Visa");
  const [mensaje, setMensaje] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");
  const [pagoExitoso, setPagoExitoso] = useState(false); 

  const handlePago = () => {
    if (!tarjeta || !fecha || !cvv || !emailUsuario) {
      setMensaje("❌ Completa todos los campos.");
      return;
    }

    const resumen = carrito
      .map((j) => `- ${j.titulo} (clave: ${Math.random().toString(36).substring(2, 10)})`)
      .join("\n");

    emailjs
      .send(
        "service_eyy133e",
        "template_767tfq6",
        {
          user_email: emailUsuario,
          message: resumen,
        },
        "CV-Lbrym9ihwdUp83"
      )
      .then(() => {
        setMensaje("✅ ¡Compra realizada! Se envió la boleta al correo.");
        setCarrito([]);
        setPagoExitoso(true); 
      })
      .catch((error) => {
        console.error(error);
        setMensaje("❌ Error al enviar la boleta.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center futuristic-title mb-4">🛒 Carrito de Compras</h2>

      <div className="row">
        {carrito.map((juego) => (
          <div key={juego.id} className="col-md-4 mb-4">
            <div className="card futuristic-card h-100 shadow border-0">
              <img
                src={juego.cover}
                className="card-img-top"
                alt={juego.titulo}
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-info">{juego.titulo}</h5>
                <p className="card-text">{juego.desc}</p>
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
          <button
            className="btn btn-success btn-lg w-100"
            style={{ maxWidth: "500px" }}
            onClick={() => {
              setMostrarPago(true);
              setMensaje("");
              setPagoExitoso(false); // Reinicia por si se repite
            }}
          >
            ✅ FINALIZAR COMPRA
          </button>
        </div>
      )}

      {mostrarPago && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", zIndex: 1050 }}
        >
          <div
            className="p-4 futuristic-card"
            style={{
              width: "90%",
              maxWidth: "400px",
              borderRadius: "12px",
              backgroundColor: "#1a1a1a",
            }}
          >
            {!pagoExitoso ? (
              <>
                <h4 className="text-center text-info mb-4">💳 Datos de Pago</h4>

                <label className="form-label">Método:</label>
                <select
                  className="form-select mb-3"
                  value={metodoPago}
                  onChange={(e) => setMetodoPago(e.target.value)}
                >
                  <option value="Visa">Visa</option>
                  <option value="Mastercard">Mastercard</option>
                </select>

                <label className="form-label">Número de tarjeta:</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  maxLength={16}
                  inputMode="numeric"
                  value={tarjeta}
                  onChange={(e) => setTarjeta(e.target.value.replace(/\D/g, ""))}
                  placeholder="XXXX XXXX XXXX XXXX"
                />

                <label className="form-label">Fecha de expiración:</label>
                <input
                  type="month"
                  className="form-control mb-3"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />

                <label className="form-label">CVV:</label>
                <input
                  type="text"
                  className="form-control mb-3"
                  maxLength={3}
                  inputMode="numeric"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                  placeholder="***"
                />

                <label className="form-label">Correo para boleta:</label>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={emailUsuario}
                  onChange={(e) => setEmailUsuario(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                />

                <button className="btn btn-info w-100" onClick={handlePago}>
                  Efectuar Pago
                </button>

                <div className="mt-3 text-center text-light fw-bold">{mensaje}</div>
              </>
            ) : (
              <div className="text-center text-light">
                <h3 className="text-success mb-3">✅ ¡Pago Exitoso!</h3>
                <p>Revisa tu correo para obtener tu boleta con los códigos de los juegos.</p>
                <button
                  className="btn btn-outline-light mt-3"
                  onClick={() => setMostrarPago(false)}
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {juegoAEliminar && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 9999 }}
        >
          <div
            className="bg-white p-4 rounded shadow-lg text-center"
            style={{ maxWidth: "400px" }}
          >
            <h4 className="text-danger mb-3">
              ¿Eliminar <strong>{juegoAEliminar.titulo}</strong> del carrito?
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
                onClick={() => {
                  setCarrito(carrito.filter((j) => j.id !== juegoAEliminar.id));
                  setJuegoAEliminar(null);
                }}
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
