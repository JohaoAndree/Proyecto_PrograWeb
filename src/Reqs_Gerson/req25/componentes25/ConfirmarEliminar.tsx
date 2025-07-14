import React from "react";
import styles from "./styles.module.css";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmarEliminar: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h4 className="text-center mb-3">¿Estás seguro de eliminar esta noticia?</h4>
        <div className="d-flex justify-content-around">
          <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
          <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarEliminar;