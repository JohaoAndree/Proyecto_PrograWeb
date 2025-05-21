import { useState } from "react";
import { listaJuegos } from "./dataJuegos";
import type { Juego } from "./dataJuegos";
import FilaJuegos from "./Componentes/FilaJuegos";
import DetalleJuego from "./Componentes/DetalleJuego";

function Req9() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null)

    function manejarSeleccion(juego: Juego) {
        if (juegoSeleccionado && juegoSeleccionado.id === juego.id) {
            setJuegoSeleccionado(null)
        } else {
            setJuegoSeleccionado(juego)
        }
    }
    
    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Juegos</h2>
            <FilaJuegos juegos={listaJuegos} select={manejarSeleccion} />
            {juegoSeleccionado && (
                <div className="mt-5">
                    <DetalleJuego juego={juegoSeleccionado} />
                </div>
            )}
        </div>
    )
}

export default Req9