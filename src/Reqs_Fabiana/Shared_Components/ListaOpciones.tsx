import styles from './SharedComponents.module.css'

const ListaOpciones = () => {
    return (
        <div className={"list-group d-flex flex-column " + styles.ListaOpciones}>
         

            <a href="/req22" className={"list-group-item list-group-item-action " + styles.ListItem}>Usuarios</a>
            <button className={"list-group-item list-group-item-action " + styles.ListItem} aria-disabled="true">Juegos</button>
            <a href="/req24" className={"list-group-item list-group-item-action " + styles.ListItem}>Noticias</a>
            <a href="/req21" className={"list-group-item list-group-item-action " + styles.ListItem}>Estadísticas</a>
            <button className={"list-group-item list-group-item-action " + styles.ListItem + " " + styles.ItemFinal} aria-disabled="true">Cerrar sesión</button>
        </div>
    )
}

export default ListaOpciones