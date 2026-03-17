import styles from "../styles.module.css"
import TablaJuegos from "./TablaJuegos"

const CuerpoPagina = () => {
  return (
    <div className={styles.CuerpoPagina}>
      <div className={styles.FullSpaceContainer}>
        <TablaJuegos />
      </div>
    </div>
  )
}

export default CuerpoPagina
