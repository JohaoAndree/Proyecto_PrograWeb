//import React from "react";
import type { Juego } from "../dataJuegos";
import CardJuego from "./CardJuego";

function FilaJuegos(props: {juegos: Juego[], select: (juego: Juego)=>void}){
    return (
        <div className="d-flex overflow-auto p-3 bg-dark">
            {props.juegos.map(juego => (<CardJuego juego={juego} select={() => props.select(juego)} />))}
        </div>
    )
}

export default FilaJuegos