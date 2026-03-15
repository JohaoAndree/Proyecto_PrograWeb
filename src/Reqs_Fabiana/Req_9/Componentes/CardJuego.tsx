import type { JuegoDB } from "../Req9"
import styles from "../Req9.module.css"

function CardJuego(props: { juego: JuegoDB, select: (id: number) => void, isActive: boolean }) {
    const { juego } = props;

    function enClick() {
        props.select(juego.id)
    }

    // Lógica dinámica: Si la imagen ya es URL completa, úsala.
    // Si no, concatena el backend URL asegurando que no haya doble slash.
    const imageUrl = juego.imagen.startsWith('http')
        ? juego.imagen
        : `${import.meta.env.VITE_BACKEND_URL}/${juego.imagen.replace(/^\//, '')}`;

    return (
        <div className={`${styles.card} ${props.isActive ? styles.cardActive : ''}`} onClick={enClick}>
            <div className={styles.imageContainer}>
                <img
                    src={imageUrl}
                    alt={juego.nombre}
                    className={styles.cardImage}
                />
            </div>
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{juego.nombre}</h3>
                <div className="mt-2 text-info fw-bold">
                    S/ {juego.precio.toFixed(2)}
                </div>
            </div>
        </div>
    )
}

export default CardJuego