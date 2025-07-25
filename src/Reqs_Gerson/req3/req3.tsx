import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.css";
import { useState } from "react";


const Req3 = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contra, setContra] = useState("");
    const [repContra, setRepContra] = useState("");
    const [pais, setPais] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [correoEnviado, setCorreoEnviado] = useState(false);

    const onClick = async () => {
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

        try {
            // frontend (por ejemplo, req3.tsx)
            const respuesta = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/gerson/games/registro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nombre,
                    correo,
                    pais,
                    password: contra
                }),
            });




            const data = await respuesta.json();

            if (respuesta.status === 201 || respuesta.status === 200) {
                setMensaje("¡Registrado! :D");
                setCorreoEnviado(true);
            } else if (respuesta.status === 409) {
                setMensaje("Ese correo ya está registrado. Usa otro.");
            } else {
                setMensaje(data.mensaje || "Error al registrar");
            }
        } catch (error) {
            console.error("Error al conectar con el backend", error);
            setMensaje("Fallo de conexión");
        }
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