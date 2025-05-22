import styles from './SharedComponents.module.css'
import ListaOpciones from './ListaOpciones'
import PerfilUsuario from './PerfilUsuario'
import Avatar from "../Resources/Avatar.jpeg"

const BarraLateral = () => {
    const rutaAvatar = Avatar
    const alt = "avatar"
    const nombre = "Johao Andreé"
    const tamaño = 180

    return (
        <div className={"d-flex flex-column p-3 " + styles.BarraLateral}>
            <PerfilUsuario src={rutaAvatar} alt={alt} size={tamaño} nombre={nombre}/>
            <ListaOpciones />
        </div>
    )
}

export default BarraLateral