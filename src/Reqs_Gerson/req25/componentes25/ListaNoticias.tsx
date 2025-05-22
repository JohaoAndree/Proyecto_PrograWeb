import styles from "./styles.module.css"
import { FaEdit, FaTrash } from 'react-icons/fa';

export interface Noticia{
    id : number
    foto : string
    nombre : string
    descripcion : string
}

interface PropsListaNoticias{
    data : Noticia[]
}

const ListaNoticias = (props: PropsListaNoticias) => {
    return (
        <div className="container text-center mt-4">
            <ul className="list-group d-flex flex-column">
                <li className={"list-group-item " + styles.Encabezado}>
                    <div className="row align-items-center">
                        <div className="col-1">ID</div>
                        <div className="col-3">Foto</div>
                        <div className="col-3">Nombre</div>
                        <div className="col-3">Descripcion</div>
                        <div className="col-2">Acciones</div>
                    </div>
                </li>
                {props.data.map((elemento: Noticia) => {
                    return (
                        <li className={"list-group-item " + styles.ItemLista}>
                            <div className="row align-items-center">
                                <div className="col-1">{elemento.id}</div>
                                <div className="col-3">
                                    <img
                                        src={elemento.foto}
                                        alt={`avatar${elemento.nombre}`}
                                        className="rounded-circle"
                                        style={{ width: 56, height: 56, objectFit: "cover" }}
                                    />
                                </div>
                                <div className="col-3">{elemento.nombre}</div>
                                <div className="col-3">{elemento.descripcion}</div>
                                <div className="col-2 d-flex justify-content-around">
                                    <button className="btn btn-sm btn-outline-primary">
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger">
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListaNoticias