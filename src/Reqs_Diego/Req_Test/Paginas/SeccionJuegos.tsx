import { useState } from "react";
import { listaJuegos, Juego } from "../../Req_9/dataJuegos";
import FilaJuegos from "../../Req_9/Componentes/FilaJuegos";
import DetalleJuego from "../../Req_9/Componentes/DetalleJuego";

function SeccionJuegos() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null)
    const [carrito, setCarrito] = useState<Juego[]>([])

    function manejarSeleccion(juego: Juego) {
        if (juegoSeleccionado && juegoSeleccionado.id === juego.id) {
            setJuegoSeleccionado(null)
        } else {
            setJuegoSeleccionado(juego)
        }
    }

    function agregarCarrito(juego: Juego){
        const agregado = carrito.some(j => j.id === juego.id)
        if (!agregado){
            setCarrito([...carrito,juego])
        }
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Nuestros juegos destacados!</h2>
                {carrito.length > 0 && (
                    <div className="text-end">
                        <span style={{ fontSize: "1.8rem" }}>🛒</span>
                        <div className="bg-light p-2 rounded mt-2 text-dark">
                            <h5>Juegos en el carrito:</h5>
                            <ul className="mb-0">
                                {carrito.map(j => (
                                    <li key={j.id}>{j.titulo}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            
            <FilaJuegos juegos={listaJuegos} select={manejarSeleccion} />
            {juegoSeleccionado && (
                <div className="mt-5">
                    <DetalleJuego juego={juegoSeleccionado} onComprar={agregarCarrito} />
                </div>
            )}
        </div>
    )
}

export default SeccionJuegos