import type { JuegoDB } from "../Req9";
import CardJuego from "./CardJuego";
import styles from "../Req9.module.css";

function FilaJuegos(props: {juegos: JuegoDB[], select: (juego: JuegoDB)=>void, juegoSeleccionadoId?: number}){
    return (
        <div className={styles.gridContainer}>
            {props.juegos.map(juego => (
                <CardJuego 
                    key={juego.id} 
                    juego={juego} 
                    select={() => props.select(juego)} 
                    isActive={props.juegoSeleccionadoId === juego.id}
                />
            ))}
        </div>
    )
}

export default FilaJuegos