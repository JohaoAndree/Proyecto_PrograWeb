import { useState } from "react";
import axios from "../../api/axios";
import styles from "./styles.module.css";

const Req4 = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleEnviar = async () => {
    if (!correo) {
      setMensaje("Ingrese su correo.");
      setErrorStatus(true);
      return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Correo inválido.");
      setErrorStatus(true);
      return;
    }

    setCargando(true);
    setMensaje("");
    setErrorStatus(false);

    try {
      const respuesta = await axios.post("/api/patrick/games/recuperar", { correo });

      if (respuesta.status === 200) {
        setMensaje("¡Enlace enviado! Revisa tu bandeja de entrada.");
        setErrorStatus(false);
      }
    } catch (error: any) {
      console.error("Error al conectar con el backend", error);
      setErrorStatus(true);
      setMensaje(error.response?.data?.mensaje || "Fallo de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.fondoAzulOsc}>
      <div className={styles.cajaRegist + " fadeInUp"}>
        <h2 className="mb-2 text-center">
          ¿Olvidaste tu <br /><strong>contraseña</strong>?
        </h2>

        <p className="text-center mb-4">
          Ingresa tu correo para enviarte un enlace de recuperación.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handleEnviar(); }}>
          <label htmlFor="correoOlvido" className={styles.label}>
            Correo electrónico
          </label>

          <input
            id="correoOlvido"
            type="email"
            className={styles.inputField}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            disabled={cargando}
            placeholder="ejemplo@correo.com"
          />

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={cargando}
          >
            {cargando ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {cargando ? "Enviando..." : "Enviar enlace"}
          </button>
        </form>

        {mensaje && (
          <div className={`${styles.mensajeStyle} alert ${errorStatus ? 'alert-danger' : 'alert-success'} py-2`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};

export default Req4;
