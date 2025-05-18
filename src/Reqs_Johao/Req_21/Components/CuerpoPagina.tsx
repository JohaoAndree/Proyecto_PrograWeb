import styles from './styles.module.css'
import CuadroConteoUsuarios from './CuadroConteoUsuarios'
import Titulo from '../../Shared_Components/Titulo'

const CuerpoPagina = () => {
    const titulo = "Estadísticas"
    const contador = 250

    return (
        <div className={styles.CuerpoPagina}>
            <Titulo texto={titulo}/>
            <CuadroConteoUsuarios numero={contador}/>
        </div>
    )
}

export default CuerpoPagina