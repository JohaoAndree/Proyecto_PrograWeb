import { Link } from 'react-router-dom'
import styles from './SharedComponents.module.css'

const ListaOpciones = () => {
    return (
        <div className={"list-group d-flex flex-column " + styles.ListaOpciones}>
            <Link to="/req22" className={"list-group-item list-group-item-action " + styles.ListItem}>Usuarios</Link>
            <Link to="/req18" className={"list-group-item list-group-item-action " + styles.ListItem}>Juegos</Link>
            <Link to="/req24" className={"list-group-item list-group-item-action " + styles.ListItem}>Noticias</Link>
            <Link to="/reqs_21_and_23" className={"list-group-item list-group-item-action " + styles.ListItem}>Estadísticas</Link>
            <Link to="/usuario" className={"list-group-item list-group-item-action " + styles.ListItem + " " + styles.ItemFinal}>Cerrar sesión</Link>
        </div>
    )
}

export default ListaOpciones