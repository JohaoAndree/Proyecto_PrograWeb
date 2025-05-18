import styles from './SharedComponents.module.css'

const ListaOpciones = () => {
    return (
        <div className={"d-flex flex-column " + styles.ListaOpciones}>
            <button type="button" className={"list-group-item list-group-item-action " + styles.ListItem} aria-current="true">Usuarios</button>
            <button type="button" className={"list-group-item list-group-item-action " + styles.ListItem}>Juegos</button>
            <button type="button" className={"list-group-item list-group-item-action " + styles.ListItem}>Noticias</button>
            <button type="button" className={"list-group-item list-group-item-action " + styles.ListItem}>Estadísticas</button>
            <button type="button" className={"list-group-item list-group-item-action " + styles.ListItem + " " + styles.ItemFinal} aria-disabled="true">Cerrar sesión</button>
        </div>
    )
}

export default ListaOpciones