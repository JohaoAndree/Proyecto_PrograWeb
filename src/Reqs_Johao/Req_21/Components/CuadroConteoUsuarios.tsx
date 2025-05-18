import styles from '../styles.module.css'

interface CuadroProps{
    numero : number
}

const CuadroConteoUsuarios = (props : CuadroProps) => {
    return (
      <div className={styles.CuadroConteoUsuarios}>
        <p>Total de usuarios registrados:</p>
        <h2 className={styles.Numero}>{props.numero}</h2>
      </div>
    );
}

export default CuadroConteoUsuarios