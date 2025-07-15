import styles from "./styles.module.css";
import { FaEdit, FaPlus } from "react-icons/fa";
import Modal from "../../../Reqs_Gerson/req25/componentes25/Editar";
import Eliminar from "../../../Reqs_Gerson/req25/componentes25/Eliminar";
import Agregar from "../../../Reqs_Gerson/req25/componentes25/Agregar";
import {
  eliminarNoticia as eliminarNoticiaApi,
} from "../../../api/usuarios.api";
import { useState } from "react";

export interface Noticia {
  id: number;
  foto: string;
  nombre: string;
  descripcion: string;
}

interface PropsListaNoticias {
  noticias: Noticia[];
  recargarNoticias: () => void;
}

const ListaNoticias = ({ noticias, recargarNoticias }: PropsListaNoticias) => {
  const [noticiaEditando, setNoticiaEditando] = useState<Noticia | null>(null);
  const [modalAgregar, setModalAgregar] = useState(false);

  const handleEditar = (noticia: Noticia) => {
    setNoticiaEditando(noticia);
  };

  const handleEliminar = async (id: number) => {
    try {
      await eliminarNoticiaApi(id);
      await recargarNoticias();
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
    }
  };

  return (
    <div className="container text-center mt-4">
      <div className="mb-3 d-flex justify-content-end">
        <button
          className="btn btn-primary"
          onClick={() => setModalAgregar(true)}
        >
          <FaPlus className="me-2" /> Agregar Noticia
        </button>
      </div>

      <ul className="list-group d-flex flex-column">
        <li className={`list-group-item ${styles.Encabezado}`}>
          <div className="row align-items-center">
            <div className="col-1">ID</div>
            <div className="col-2">Foto</div>
            <div className="col-3">Nombre</div>
            <div className="col-4">Descripción</div>
            <div className="col-2">Acciones</div>
          </div>
        </li>

        {noticias.map((noticia) => (
          <li className="list-group-item" key={noticia.id}>
            <div className="row align-items-center">
              <div className="col-1">{noticia.id}</div>
              <div className="col-2">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${noticia.foto}`}
                  alt="foto"
                  className={styles.ImagenNoticia}
                />
              </div>
              <div className="col-3">{noticia.nombre}</div>
              <div className="col-4">{noticia.descripcion}</div>
              <div className="col-2">
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleEditar(noticia)}
                >
                  <FaEdit />
                </button>
                <Eliminar id={noticia.id} onDelete={handleEliminar} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {noticiaEditando && (
        <Modal
          noticia={noticiaEditando}
          onClose={() => setNoticiaEditando(null)}
          onSave={recargarNoticias}
        />
      )}

      {modalAgregar && (
        <Agregar
          onClose={() => setModalAgregar(false)}
          onSave={recargarNoticias}
        />
      )}
    </div>
  );
};

export default ListaNoticias;