import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Req3 = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");
    const [repContra, setRepContra] = useState("");
    const [pais, setPais] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [correoEnviado, setCorreoEnviado] = useState(false);

    const onClick = () => {
        if (!nombre || !correo || !contra || !repContra || !pais) {
            setMensaje("Llene todos los segmentos");

            return;
        }

        if (!correo.includes("@") || !correo.includes(".")) {
            setMensaje("Registre un correo válido");

            return;
        }

        if (contra !== repContra) {
            setMensaje("Las contraseñas deben ser iguales");

            return;
        }

        setMensaje("¡Registrado! :D");

        setCorreoEnviado(true);

        emailjs
            .send(
                "service_eyy133e",

                "template_767tfq6",

                {
                    user_name: nombre,

                    user_email: correo,

                    pais: pais,
                },

                "CV-Lbrym9ihwdUp83"
            )

            .then(() => console.log("Correo enviado"))

            .catch((error) => console.error("Error al enviar el correo", error));
    };

    return (
        <div className={styles.fondoAzulOsc}>
            <div className={styles.cajaRegist}>
                <h2 className="mb-2 text-center">
                    Registro <strong>GameStore</strong>
                </h2>

                <p className="text-center mb-4">Ingresa los siguientes datos</p>

                <label htmlFor="nombreRegis" className="form-label">
                    Nombres:
                </label>

                <input
                    id="nombreRegis"
                    type="text"
                    className="form-control mb-3"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label htmlFor="emailRegis" className="form-label">
                    Correo:
                </label>

                <input
                    id="emailRegis"
                    type="text"
                    className="form-control mb-3"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />

                <label htmlFor="paisRegis" className="form-label">
                    País de residencia:
                </label>

                <input
                    id="paisRegis"
                    type="text"
                    className="form-control mb-3"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                />

                <label htmlFor="contraRegis" className="form-label">
                    Contraseña:
                </label>

                <input
                    id="contraRegis"
                    type="password"
                    className="form-control mb-3"
                    value={contra}
                    onChange={(e) => setContra(e.target.value)}
                />

                <label htmlFor="repContraRegis" className="form-label">
                    Repetir contraseña:
                </label>

                <input
                    id="repContraRegis"
                    type="password"
                    className="form-control mb-3"
                    value={repContra}
                    onChange={(e) => setRepContra(e.target.value)}
                />

                <button
                    id="buttonRegis"
                    className="btn w-100 mb-2 btn-light"
                    onClick={onClick}
                >
                    Registrar
                </button>

                <div id="mensajes" className="text-center mt-2 text-light">
                    {mensaje}

                    {correoEnviado && (
                        <div>
                            Registro exitoso. Revisa tu correo electrónico para activar tu
                            cuenta.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Req3;
