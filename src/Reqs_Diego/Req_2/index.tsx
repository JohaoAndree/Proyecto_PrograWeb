import 'bootstrap/dist/css/bootstrap.min.css'
import styles from "./styles.module.css"
import { useState } from 'react'

const Req2 = () => {
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [contra, setContra] = useState("")
    const [repContra, setRepContra] = useState("")
    const [pais, setPais] = useState("")
    const [mensaje, setMensaje] = useState("")

    const onClick = () => {
        if (!nombre || !correo || !contra || !repContra || !pais){
            setMensaje("Llene todos los segmentos")
            return
        }
        if (!correo.includes("@") || !correo.includes(".")){
            setMensaje("Registre un correo valido")
            return
        }
        if (contra !== repContra){
            setMensaje("Las contraseñas deben ser iguales")
            return
        }
        setMensaje("Registrado! :D")
    }
    return (
    <div className={styles.fondoAzulOsc}>
        <div className={styles.cajaRegist}>
            <h2 className="mb-2 text-center">Registro <strong>GameStore</strong></h2>
            <p className="text-center mb-4">Ingresa los siguientes datos</p>
            <label htmlFor="nombreRegis" className="form-label">Nombres:</label>
            <input
             id="nombreRegis"
             type="text"
             className="form-control mb-3"
             value={nombre}
             onChange={(e)=>setNombre(e.target.value)} />
            <label htmlFor="emailRegis" className="form-label">Correo:</label>
            <input
              id="emailRegis"
              type="text"
              className="form-control mb-3"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)} />
            <label htmlFor="paisRegis" className="form-label">Pais de residencia:</label>
            <input
             id="paisRegis"
             type="text"
             className="form-control mb-3"
             value={pais}
             onChange={(e) => setPais(e.target.value)} />
            <label htmlFor="contraRegis" className="form-label">Contraseña:</label>
            <input
             id="contraRegis"
             type="text"
             className="form-control mb-3"
             value={contra}
             onChange={(e) => setContra(e.target.value)} />
            <label htmlFor="repContraRegis" className="form-label">Repetir contraseña:</label>
            <input
             id="repContraRegis"
             type="text"
             className="form-control mb-3"
             value={repContra}
             onChange={(e) => setRepContra(e.target.value)} />
            <button id="buttonRegis" className="btn w-200 mb-2" onClick={onClick}>Registrar</button>
            <div id="mensajes" className="text-danger text-center mt-2">{mensaje}</div>
        </div>
    </div>
)
}

export default Req2