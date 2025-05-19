import styles from './styles.module.css'
import Titulo from '../../Shared_Components/Titulo'

const CuerpoPagina = () => {
    const titulo = "Noticias"

    return (
        <div className={styles.CuerpoPagina}>
            <Titulo texto={titulo}/>
        </div>
    )
}

export default CuerpoPagina