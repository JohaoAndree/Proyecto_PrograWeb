import React from "react";
import type { Juego } from "../dataJuegos";

function DetalleJuego(props:{juego:Juego}){
    const juego = props.juego
    return (
        <div className="bg-secondary text-light p-4 mt-3 rounded">
            <h2>{juego.titulo}</h2>
            <p>{juego.desc}</p>
            <div className="ratio ratio 16x9 my-3">
                <iframe src={juego.urlTrailer} title={juego.titulo+" trailer"} allowFullScreen></iframe>
            </div>
            <h5>Captura:</h5>
            <div className="d-flex overflow-auto mb-3">
                {juego.capturas.map(captura => (
                    <img src={captura} alt="Captura" style={{height: "150px", marginRight: "10px"}} />
                ))}
            </div>
            <h5>Estrellas: {juego.estrellas}/5</h5>
            <h5>Reseñas:</h5>
            <ul>
                {juego.resenas.map(resena => (
                    <li>{resena}</li>
                ))}
            </ul>
        </div>
    )
}

export default DetalleJuego