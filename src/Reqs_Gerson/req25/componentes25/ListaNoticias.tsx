import { useState } from "react";
import styles from "./styles.module.css";
import { FaEdit, FaPlus } from "react-icons/fa";
import Modal from "./Editar";
import Eliminar from "./Eliminar";
import Agregar from "./Agregar";

export interface Noticia {
  id: number;
  foto: string;
  nombre: string;
  descripcion: string;
}

interface PropsListaNoticias {
  data: Noticia[];
}

const ListaNoticias = ({ data }: PropsListaNoticias) => {
  const [noticias, setNoticias] = useState(data);
  const [noticiaEditando, setNoticiaEditando] = useState<Noticia | null>(null);
  const [modalAgregar, setModalAgregar] = useState(false);

  const handleEditar = (noticia: Noticia) => {
    setNoticiaEditando(noticia);
  };

  const guardarCambios = (nueva: Noticia) => {
    setNoticias((prev) =>
      prev.map((n) => (n.id === nueva.id ? nueva : n))
    );
    setNoticiaEditando(null);
  };

  const eliminarNoticia = (id: number) => {
    setNoticias(noticias.filter((n) => n.id !== id));
  };

  const agregarNoticia = (nueva: Noticia) => {
    setNoticias((prev) => [...prev, nueva]);
    setModalAgregar(false);
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
            <div className="col-4">Descripcion</div>
            <div className="col-2">Acciones</div>
          </div>
        </li>
        {noticias.map((noticia) => (
          <li className="list-group-item" key={noticia.id}>
            <div className="row align-items-center">
              <div className="col-1">{noticia.id}</div>
              <div className="col-2">
                <img
                  src={noticia.foto}
                  alt="foto"
                  style={{ width: 60, height: 60, borderRadius: "50%" }}
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
                <Eliminar id={noticia.id} onDelete={eliminarNoticia} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      {noticiaEditando && (
        <Modal
          noticia={noticiaEditando}
          onSave={guardarCambios}
          onClose={() => setNoticiaEditando(null)}
        />
      )}

      {modalAgregar && (
        <Agregar
          onSave={agregarNoticia}
          onClose={() => setModalAgregar(false)}
        />
      )}
    </div>
  );
};

export default ListaNoticias;

