import styles from '../styles.module.css'

interface TituloProps{
    texto : string
}

const Titulo = (props : TituloProps) => {
    return (
        <h1 className={styles.Titulo}>
            {props.texto}
        </h1>
    )
}

export default Titulo