import Titulo from '../../Shared_Components/Titulo'
import styles from '../styles.module.css'
import TablaJuegos from './TablaJuegos'

const CuerpoPagina = () => {
  return (
    <div className={styles.CuerpoPagina}>
      <Titulo texto="Games" />
      <TablaJuegos />
    </div>
  )
}

export default CuerpoPagina
