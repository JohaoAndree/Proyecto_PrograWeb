import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./stylesrestablecer.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RestablecerClave = () => {
  const { token } = useParams();

  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleRestablecer = async () => {
    if (!token) {
      setMensaje("El enlace es inválido o ha expirado. Solicita uno nuevo.");
      return;
    }

    if (nuevaClave.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (nuevaClave !== confirmarClave) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    setCargando(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL;

     const respuesta = await fetch(`${API_URL}/patrick/games/reset-password/${token}`, {
       method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nuevaClave }), // ya no mandes el token en el body
      })

      const data = await respuesta.json();

      if (respuesta.ok) {
        setExito(true);
        setMensaje("Contraseña actualizada correctamente. Redirigiendo...");
        setTimeout(() => {
          window.location.href = "/";
        }, 5020);
      } else {
        setMensaje(data.mensaje || "No se pudo restablecer la contraseña.");
      }
    } catch (error) {
      setMensaje("Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.fondoAzulOsc}>
      <div className={styles.cajaRegist}>
        <h2>Restablecer Contraseña</h2>

        {!exito && (
          <>
            <label htmlFor="clave1" className={`${styles["form-label"]}`}>
              Nueva contraseña:
            </label>
            <input
              id="clave1"
              type="password"
              placeholder="Escribe tu nueva clave"
              className="form-control mb-3"
              value={nuevaClave}
              onChange={(e) => setNuevaClave(e.target.value)}
              disabled={cargando}
            />

            <label htmlFor="clave2" className={`${styles["form-label"]}`}>
              Confirmar contraseña:
            </label>
            <input
              id="clave2"
              type="password"
              placeholder="Confirma tu clave"
              className="form-control mb-3"
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
              disabled={cargando}
            />

            <button
              className="btn btn-danger w-100 mb-2"
              onClick={handleRestablecer}
              disabled={cargando}
            >
              {cargando ? "Actualizando..." : "Cambiar contraseña"}
            </button>
          </>
        )}

        <div id="mensajes" className="text-center mt-2 text-light fw-bold">
          {mensaje}
        </div>
      </div>
    </div>
  );
};

export default RestablecerClave;
