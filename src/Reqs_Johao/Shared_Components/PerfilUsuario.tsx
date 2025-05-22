import styles from './SharedComponents.module.css'

interface PropsPerfilUsuario{
    src : string
    alt : string
    nombre : string
    size : number
}

const PerfilUsuario = (props : PropsPerfilUsuario) => {
    return (
        <div className={"d-flex flex-row align-items-center gap-3 " + styles.PerfilUsuario}>
            <img 
                src={props.src} 
                alt={props.alt} 
                className="rounded-circle" 
                style={{
                    width: props.size, 
                    height: props.size, 
                    objectFit: "cover",
                    border: "1px solid white",
                    flexShrink: 0
                }}
            />
            <span className="fw-semibold">{props.nombre}</span>
        </div>
    )
}

export default PerfilUsuario