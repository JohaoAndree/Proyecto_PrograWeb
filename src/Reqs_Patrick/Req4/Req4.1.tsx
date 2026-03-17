import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import styles from "./stylesrestablecer.module.css";

const RestablecerClave = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [nuevaClave, setNuevaClave] = useState("");
  const [confirmarClave, setConfirmarClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const handleRestablecer = async () => {
    if (!token) {
      setMensaje("El enlace es inválido o ha expirado.");
      setErrorStatus(true);
      return;
    }

    if (nuevaClave.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setErrorStatus(true);
      return;
    }

    if (nuevaClave !== confirmarClave) {
      setMensaje("Las contraseñas no coinciden.");
      setErrorStatus(true);
      return;
    }

    setCargando(true);
    setMensaje("");
    setErrorStatus(false);

    try {
      const respuesta = await axios.post(`/api/patrick/games/reset-password/${token}`, { nuevaClave });

      if (respuesta.status === 200) {
        setExito(true);
        setMensaje("¡Contraseña actualizada! Redirigiendo al login...");
        setErrorStatus(false);
        setTimeout(() => {
          navigate("/usuario");
        }, 3000);
      }
    } catch (error: any) {
      console.error("Error al actualizar la clave:", error);
      setErrorStatus(true);
      setMensaje(error.response?.data?.mensaje || "Error al conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.fondoAzulOsc}>
      <div className={styles.cajaRegist + " fadeInUp"}>
        <h2>Nueva <br /><strong>Contraseña</strong></h2>

        {!exito ? (
          <form onSubmit={(e) => { e.preventDefault(); handleRestablecer(); }}>
            <label htmlFor="clave1" className={styles.label}>
              Nueva contraseña
            </label>
            <input
              id="clave1"
              type="password"
              placeholder="••••••••"
              className={styles.inputField}
              value={nuevaClave}
              onChange={(e) => setNuevaClave(e.target.value)}
              disabled={cargando}
            />

            <label htmlFor="clave2" className={styles.label}>
              Confirmar contraseña
            </label>
            <input
              id="clave2"
              type="password"
              placeholder="••••••••"
              className={styles.inputField}
              value={confirmarClave}
              onChange={(e) => setConfirmarClave(e.target.value)}
              disabled={cargando}
            />

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={cargando}
            >
              {cargando ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              {cargando ? "Actualizando..." : "Cambiar contraseña"}
            </button>
          </form>
        ) : (
          <div className="text-center py-3">
             <i className="bi bi-check-circle-fill text-success fs-1"></i>
          </div>
        )}

        {mensaje && (
          <div className={`${styles.mensajeStyle} alert ${errorStatus ? 'alert-danger' : 'alert-success'} py-2`}>
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestablecerClave;
