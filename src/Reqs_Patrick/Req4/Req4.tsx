import emailjs from '@emailjs/browser';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import styles from "./styles.module.css";

const Req4 = () => {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [correoEnviado, setCorreoEnviado] = useState(false);

  const handleEnviar = () => {
    if (!correo) {
      setMensaje("Ingrese su correo.");
      return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Correo inválido.");
      return;
    }

    emailjs.send(
      'service_eyy133e',        // ✅ Tu service ID real
      'template_767tfq6',       // ✅ Tu template ID real
      { user_email: correo },
      'CV-Lbrym9ihwdUp83'       // ✅ Tu public key real
    )
    .then(() => {
      setCorreoEnviado(true);
      setMensaje("Se envió un enlace para restablecer la contraseña.");
    })
    .catch((error) => {
      console.error("Error al enviar", error);
      setMensaje("Hubo un error al enviar el correo.");
    });
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
        />

        <button
          className="btn btn-danger w-100 mb-2"
          onClick={handleEnviar}
        >
          Enviar enlace
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