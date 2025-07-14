import React, { useState } from "react";
import type { Noticia } from "./ListaNoticias";
import styles from "./styles.module.css";

interface Props {
  noticia: Noticia;
  onClose: () => void;
  onSave: () => void;
}

const Editar: React.FC<Props> = ({ noticia, onClose, onSave }) => {
  const [nombre, setNombre] = useState(noticia.nombre);
  const [descripcion, setDescripcion] = useState(noticia.descripcion);
  const [foto, setFoto] = useState<File | null>(null);

  const handleGuardar = async () => {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (foto) formData.append("foto", foto);

    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias/${noticia.id}`, {
        method: "PUT",
        body: formData,
      });
      onSave();
      onClose();
    } catch (error) {
      console.error("Error al editar noticia:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`card p-4 ${styles.modalContent}`} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h4 className="text-center mb-4">Editar Noticia</h4>

        <label>Nombre:</label>
        <input
          type="text"
          className="form-control mb-3"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Descripción:</label>
        <input
          type="text"
          className="form-control mb-3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <label>Nueva Imagen (opcional):</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files?.[0] || null)}
        />

        <div className="d-flex justify-content-around mt-3">
          <button className="btn btn-success" onClick={handleGuardar}>
            Guardar Cambios
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Editar;