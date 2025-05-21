import React from "react"
import type {Juego} from "../dataJuegos"

function CardJuego(props: {juego: Juego, select: (id:number)=>void}){
    const juego = props.juego

    function enClick() {
        props.select(juego.id)
    }
    return (
        <div className="m-2 text-center">
            <img 
            src={juego.cover} 
            alt={juego.titulo}
            onClick={enClick}
            style={{width: "150px", height: "200px", cursor: "pointer"}}
            className="border border-light rounded" />
            <p className="mt-2 text-light">{juego.titulo}</p>
        </div>
    )
}

export default CardJuego