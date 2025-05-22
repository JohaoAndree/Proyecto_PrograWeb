import styles from './styles.module.css'
import Titulo from '../../Shared_Components/Titulo'
import ListaUsuarios, { type Usuario } from './ListaUsuarios'
import AvatarZed from "../../Resources/avatarZed.jpg"
import AvatarIrelia from "../../Resources/avatarIrelia.jpg"
import AvatarAatrox from "../../Resources/avatarAatrox.jpg"

const CuerpoPagina = () => {
    const titulo = "Usuarios"
    const lista : Usuario[] = [
        {id : 1, foto : AvatarZed, nickname : "El maestro de las sombras", nombre : "Zed"},
        {id : 2, foto : AvatarIrelia, nickname : "La danza de las cuchillas", nombre : "Irelia"},
        {id : 3, foto : AvatarAatrox, nickname : "La espada de los oscuros", nombre : "Aatrox"}
    ]

    return (
        <div className={"flex-grow-1 " + styles.CuerpoPagina}>
            <Titulo texto={titulo}/>
            <ListaUsuarios data={lista}/>
        </div>
    )
}

export default CuerpoPagina