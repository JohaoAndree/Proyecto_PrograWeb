import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import styles from "./styles.module.css";

const Req4 = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [correoEnviado, setCorreoEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleEnviar = async () => {
    if (!correo) {
      setMensaje("Ingrese su correo.");
      return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Correo inválido.");
      return;
    }

    setCargando(true);

    try {
     const API_URL = import.meta.env.VITE_BACKEND_URL;

     const respuesta = await fetch(`${API_URL}/api/patrick/games/recuperar`, {
          method: "POST",
         headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ correo }),
          });

      const data = await respuesta.json();

      if (respuesta.ok) {
        setCorreoEnviado(true);
        setMensaje("Se envió un enlace para restablecer la contraseña.");
      } else {
        setMensaje(data.mensaje || "Error al enviar el correo.");
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      setMensaje("Fallo de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.fondoAzulOsc}>
      <div className={styles.cajaRegist}>
        <h2 className="mb-2 text-center">
          ¿Olvidaste tu <strong>contraseña</strong>?
        </h2>

        <p className="text-center mb-4">
          Ingresa tu correo para enviarte un enlace
        </p>

        <label htmlFor="correoOlvido" className="form-label">
          Correo electrónico:
        </label>

        <input
          id="correoOlvido"
          type="email"
          className="form-control mb-3"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          disabled={cargando}
        />

        <button
          className="btn btn-danger w-100 mb-2"
          onClick={handleEnviar}
          disabled={cargando}
        >
          {cargando ? "Enviando..." : "Enviar enlace"}
        </button>

        <div id="mensajes" className="text-center mt-2 text-light fw-bold">
          {mensaje}
          {correoEnviado && (
            <div className="mt-2">
              Revisa tu correo electrónico para continuar con el restablecimiento.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Req4;
