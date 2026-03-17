import { Link } from 'react-router-dom'
import styles from './SharedComponents.module.css'

const ListaOpciones = () => {
    return (
        <div className={"list-group d-flex flex-column " + styles.ListaOpciones}>
            <Link to="/req22" className={styles.ListItem}>Usuarios</Link>
            <Link to="/req18" className={styles.ListItem}>Juegos</Link>
            <Link to="/req24" className={styles.ListItem}>Noticias</Link>
            <Link to="/reqs_21_and_23" className={styles.ListItem}>Estadísticas</Link>
            <Link to="/usuario" className={styles.ListItem + " " + styles.ItemFinal}>Cerrar sesión</Link>
        </div>
    )
}

export default ListaOpciones