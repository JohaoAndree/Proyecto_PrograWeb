import styles from "./styles.module.css"

export interface Usuario{
    id : number
    foto : string
    nickname : string
    nombre : string
}

interface PropsListaUsuarios{
    data : Usuario[]
}

const ListaUsuarios = (props: PropsListaUsuarios) => {
    return (
        <div className="container text-center mt-4">
            <ul className="list-group d-flex flex-column">
                <li className={"list-group-item " + styles.Encabezado}>
                    <div className="row">
                        <div className="col-2">ID</div>
                        <div className="col-3">Foto</div>
                        <div className="col-4">Nickname</div>
                        <div className="col-3">Nombre</div>
                    </div>
                </li>
                {props.data.map((elemento: Usuario) => {
                    return (
                        <li className={"list-group-item " + styles.ItemLista}>
                            <div className="row align-items-center">
                                <div className="col-2">{elemento.id}</div>
                                <div className="col-3">
                                    <img
                                        src={elemento.foto}
                                        alt={`avatar${elemento.nombre}`}
                                        className="rounded-circle"
                                        style={{ width: 56, height: 56, objectFit: "cover" }}
                                    />
                                </div>
                                <div className="col-4">{elemento.nickname}</div>
                                <div className="col-3">{elemento.nombre}</div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListaUsuarios