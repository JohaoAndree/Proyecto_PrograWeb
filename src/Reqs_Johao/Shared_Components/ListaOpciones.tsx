import { Link } from 'react-router-dom'
import styles from './SharedComponents.module.css'

const ListaOpciones = () => {
    return (
        <div className={"list-group d-flex flex-column " + styles.ListaOpciones}>
            <Link to="/req22" className={"list-group-item list-group-item-action " + styles.ListItem}>Usuarios</Link>
            <button className={"list-group-item list-group-item-action " + styles.ListItem} aria-disabled="true">Juegos</button>
            <Link to="/req24" className={"list-group-item list-group-item-action " + styles.ListItem}>Noticias</Link>
            <Link to="/reqs_21_and_23" className={"list-group-item list-group-item-action " + styles.ListItem}>Estadísticas</Link>
            <button className={"list-group-item list-group-item-action " + styles.ListItem + " " + styles.ItemFinal} aria-disabled="true">Cerrar sesión</button>
        </div>
    )
}

export default ListaOpciones