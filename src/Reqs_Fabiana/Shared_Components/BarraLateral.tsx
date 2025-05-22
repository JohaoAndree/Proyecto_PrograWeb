import Avatar from "../Resources/Avatar.jpeg"
import ListaOpciones from './ListaOpciones'
import PerfilUsuario from './PerfilUsuario'
import styles from './SharedComponents.module.css'

const BarraLateral = () => {
    const rutaAvatar = Avatar
    const alt = "avatar"
    const nombre = "Johao Andreé"
    const tamaño = 160

    return (
        <div className={"d-flex flex-column p-3 " + styles.BarraLateral}>
            <PerfilUsuario src={rutaAvatar} alt={alt} size={tamaño} nombre={nombre}/>
            <ListaOpciones />
        </div>
    )
}

export default BarraLateral