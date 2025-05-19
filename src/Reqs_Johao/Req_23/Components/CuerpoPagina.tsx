import styles from './styles.module.css'
import Titulo from '../../Shared_Components/Titulo'

const CuerpoPagina = () => {
    const titulo = "Estadísticas"

    return (
        <div className={styles.CuerpoPagina}>
            <Titulo texto={titulo}/>
        </div>
    )
}

export default CuerpoPagina