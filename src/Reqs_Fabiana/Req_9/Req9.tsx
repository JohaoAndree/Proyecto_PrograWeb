import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
import DetalleJuego from "./Componentes/DetalleJuego";
import FilaJuegos from "./Componentes/FilaJuegos";
import { SkeletonCard } from "../../Shared/Components/SkeletonView";
import styles from "./Req9.module.css";
export interface JuegoDB {
    id: number;
    nombre: string;
    precio: number;
    descuento: number | null;
    imagen: string;
    descripcion: string;
    estaOferta: boolean;
    estado: boolean;
    masVendido: boolean;
    categoriaId: number;
    categoria: {
        id: number;
        nombre: string;
    };
    calificaciones: {
        id: number;
        valoracion: number;
        comentario: string;
    }[];
    plataformas: {
        plataforma: {
            id: number;
            nombre: string;
        };
    }[];
}

function Req9() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState<JuegoDB | null>(null)
    const [carrito, setCarrito] = useState<JuegoDB[]>([])
    const [juegosDisponibles, setJuegosDisponibles] = useState<JuegoDB[]>([])
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //usando el back, ayuda xd
    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/juegos`, { signal: controller.signal })
            .then(res => {
                setJuegosDisponibles(res.data)
                setLoading(false);
            }).catch(err => {
                if (axios.isCancel && axios.isCancel(err)) return;
                console.error("Error al cargar los juegos: ", err)
                setLoading(false);
            })

        return () => { controller.abort(); };
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
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

    function manejarSeleccion(juego: JuegoDB) {
        setJuegoSeleccionado(juego);
        setShowModal(true);
    }

    function agregarCarrito(juego: JuegoDB) {
        const agregado = carrito.some(j => j.id === juego.id)
        if (!agregado) {
            setCarrito([...carrito, juego])
        }
    }

    function irAlCarrito() {
        navigate("/carrito")
    }

    return (
        <div className={`container-fluid ${styles.container}`}>
            <div className="container">
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <h2 className={styles.title}>Lista de Juegos</h2>
                </div>

                {carrito.length > 0 && (
                    <div className={styles.floatingCart}>
                        <div className={`p-4 ${styles.cartWidget}`}>
                            <div className={styles.cartHeader}>
                                <h5>Mi Carrito</h5>
                                <i className={`bi bi-cart-fill ${styles.cartIcon}`}></i>
                            </div>
                            <ul className="mb-4 list-unstyled">
                                {carrito.map(j => (
                                    <li key={j.id} className={styles.cartItemMini}>
                                        <i className="bi bi-caret-right-fill"></i>
                                        <span className="text-truncate">{j.nombre}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-100 ${styles.btnAction}`} onClick={irAlCarrito}>
                                <i className="bi bi-wallet2 me-2"></i>Ir al Checkout
                            </button>
                        </div>
                    </div>
                )}

                {loading ? (
                    <>
                        <div className={styles.loaderContainer}>
                            <div className={styles.spinner}></div>
                            <p className="mt-3 text-info fw-bold">Cargando catálogo de juegos...</p>
                        </div>

                        <div className={styles.gridContainer}>
                            {[...Array(9)].map((_, i) => (
                                <SkeletonCard key={i} />
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <FilaJuegos juegos={juegosDisponibles} select={manejarSeleccion} juegoSeleccionadoId={juegoSeleccionado?.id} />

                        {/* Modal de Detalle de Juego */}
                        <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            centered
                            size="lg"
                            contentClassName={styles.modalContent}
                        >
                            <Modal.Header closeButton closeVariant="white" className={`border-0 text-white ${styles.modalHeader}`}>
                                <Modal.Title>Detalles del Juego</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className="p-0 bg-secondary text-white">
                                {juegoSeleccionado && (
                                    <DetalleJuego juego={juegoSeleccionado} onComprar={(j) => {
                                        agregarCarrito(j);
                                        setShowModal(false);
                                    }} />
                                )}
                            </Modal.Body>
                        </Modal>
                    </>
                )}
            </div>
        </div>
    )
}

export default Req9
