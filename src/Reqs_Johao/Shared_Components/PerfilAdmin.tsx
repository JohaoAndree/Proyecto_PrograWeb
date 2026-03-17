import styles from './SharedComponents.module.css'

interface PropsPerfilAdmin {
    src: string
    alt: string
    nombre: string
}

const PerfilAdmin = (props: PropsPerfilAdmin) => {
    return (
        <div className={styles.PerfilAdmin}>
            <img
                src={props.src}
                alt={props.alt}
                className={styles.Avatar}
            />
            <span className={styles.NombreAdmin}>{props.nombre}</span>
        </div>
    )
}

export default PerfilAdmin