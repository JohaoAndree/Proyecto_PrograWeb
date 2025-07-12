import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";

interface Props {
  id: number;
  onDelete: (id: number) => void;
}

const Eliminar = ({ id, onDelete }: Props) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleConfirmar = () => {
    onDelete(id);
    setMostrarModal(false);
  };

  return (
    <>
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => setMostrarModal(true)}
      >
        <FaTrash />
      </button>

      {mostrarModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3 className="text-center mb-3">¿Deseas eliminar esta noticia?</h3>
            <div className="d-flex justify-content-around">
              <button className="btn btn-danger" onClick={handleConfirmar}>
                Sí, eliminar
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setMostrarModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Eliminar;
