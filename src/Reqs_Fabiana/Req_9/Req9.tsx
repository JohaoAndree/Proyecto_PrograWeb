import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DetalleJuego from "./Componentes/DetalleJuego";
import FilaJuegos from "./Componentes/FilaJuegos";
import type { Juego } from "./dataJuegos";
//import { listaJuegos } from "./dataJuegos";

function Req9() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState<Juego | null>(null)
    const [carrito, setCarrito] = useState<Juego[]>([])
    const [juegosDisponibles, setJuegosDisponibles] = useState<Juego[]>([])
    const navigate = useNavigate();

    //usando el back, ayuda xd
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/juegos`).then(res=>{
            setJuegosDisponibles(res.data)
        }).catch(err=>{
            console.error("Error al cargar los juegos: ",err)
        })
    }, [])

    //cargar carrito
    useEffect(() => {
        const carritoGuardado = localStorage.getItem("carrito")
        if (carritoGuardado) {
            setCarrito(JSON.parse(carritoGuardado))
        }
    }, [])

    //guardar carrito actualizado
    useEffect(() => {
        localStorage.setItem("carrito",JSON.stringify(carrito))
    }, [carrito])
    
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

    function irAlCarrito() {
        navigate("/carrito")
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Lista de Juegos</h2>
                {carrito.length > 0 && (
                    <div className="text-end">
                        <span style={{ fontSize: "1.8rem" }}>🛒</span>
                        <div className="bg-light p-2 rounded mt-2 text-dark">
                            <h5>Juegos en el carrito:</h5>
                            <ul className="mb-2">
                                {carrito.map(j => (
                                    <li key={j.id}>{j.titulo}</li>
                                ))}
                            </ul>
                            <button className="btn btn-success" onClick={irAlCarrito}>
                                Ir al carrito
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            <FilaJuegos juegos={juegosDisponibles} select={manejarSeleccion} />
            {juegoSeleccionado && (
                <div className="mt-5">
                    <DetalleJuego juego={juegoSeleccionado} onComprar={agregarCarrito} />
                </div>
            )}
        </div>
    )
}

export default Req9
