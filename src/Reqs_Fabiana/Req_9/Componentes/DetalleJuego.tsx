import type { JuegoDB } from "../Req9";
import styles from "../Req9.module.css";

function DetalleJuego(props:{juego: JuegoDB, onComprar: (juego: JuegoDB)=> void}){
    const {juego, onComprar} = props
    
    // Calcula las estrellas como el promedio redondeado
    const promedio = juego.calificaciones && juego.calificaciones.length > 0 
        ? Math.round(juego.calificaciones.reduce((acc, curr) => acc + curr.valoracion, 0) / juego.calificaciones.length) 
        : 0;
        
    // Generar estrellas visuales
    const estrellasVisuales = "★".repeat(promedio > 5 ? 5 : promedio) + "☆".repeat(5 - (promedio > 5 ? 5 : promedio));

    return (
        <div className={styles.detalleContainer}>
            <div className="d-flex justify-content-between align-items-start">
                <div>
                    <h2 className={styles.detalleTitle}>{juego.nombre}</h2>
                    {juego.categoria && <span className={`badge mb-2 me-2 ${styles.badgeCategory}`}>{juego.categoria.nombre}</span>}
                    {juego.plataformas?.map(p => (
                        <span key={p.plataforma.id} className={`badge mb-2 me-1 ${styles.badgePlatform}`}>{p.plataforma.nombre}</span>
                    ))}
                </div>
                <div className="text-end">
                    {juego.estaOferta && juego.descuento ? (
                        <>
                            <h5 className="text-decoration-line-through text-danger mb-0">S/ {juego.precio.toFixed(2)}</h5>
                            <h3 className="text-success mb-2 fw-bold">S/ {(juego.precio - juego.descuento).toFixed(2)}</h3>
                        </>
                    ) : (
                        <h3 className="mb-2 fw-bold">S/ {juego.precio.toFixed(2)}</h3>
                    )}
                    <button className={styles.btnAction} onClick={()=> onComprar(juego)}>
                        <i className="bi bi-cart-plus me-2"></i> Añadir al Carrito
                    </button>
                </div>
            </div>
            
            <hr className="border-secondary" />
            
            <p className={styles.detalleDesc}>{juego.descripcion}</p>
            
            <hr className="border-secondary" />

            <div className="mt-4">
                <h4 className="mb-3 text-warning">
                    Reseñas comunitarias {juego.calificaciones?.length > 0 && <span className="fs-5 text-light">({estrellasVisuales})</span>}
                </h4>
                {juego.calificaciones && juego.calificaciones.length > 0 ? (
                    <div className={styles.reviewSection}>
                        <ul className="list-unstyled mb-0">
                            {juego.calificaciones.map(resena => (
                                <li key={resena.id} className={styles.reviewItem}>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-info fw-bold">Usuario #{resena.id}</span>
                                        <span className="badge bg-primary rounded-pill">{resena.valoracion}/10</span>
                                    </div>
                                    <p className="mt-2 mb-0 text-light fst-italic">"{resena.comentario}"</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-muted fst-italic">Aún no hay reseñas para este juego.</p>
                )}
            </div>
        </div>
    )
}

export default DetalleJuego