import React, { useState } from "react";
import type { Noticia } from "./ListaNoticias";
import styles from "./styles.module.css";

interface Props {
  onClose: () => void;
  onSave: (nueva: Noticia) => void;
}

const Agregar: React.FC<Props> = ({ onClose, onSave }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState<File | null>(null);

  const handleGuardar = async () => {
    if (!nombre || !descripcion || !foto) return;

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    formData.append("foto", foto);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
          throw new Error('Fallo al agregar la noticia');
      }
      const nuevaNoticia = await response.json();
      onSave(nuevaNoticia);
      onClose();
    } catch (error) {
      console.error("Error al agregar noticia:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`card p-4 ${styles.modalContent}`} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h4 className="text-center mb-4">Agregar Noticia</h4>

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

        <label>Imagen:</label>
        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files?.[0] || null)}
        />

        <div className="d-flex justify-content-around mt-3">
          <button className="btn btn-success" onClick={handleGuardar}>
            Guardar
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agregar;