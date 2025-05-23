import React, { useState } from "react";
import type { Noticia } from "./ListaNoticias";
import styles from "./styles.module.css";

interface Props {
  onAdd: (nuevaNoticia: Noticia) => void;
  onClose: () => void;
}

const Agregar: React.FC<Props> = ({ onAdd, onClose }) => {
  const [nuevaNoticia, setNuevaNoticia] = useState<Noticia>({
    id: 0,
    foto: "",
    nombre: "",
    descripcion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNuevaNoticia((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    if (!nuevaNoticia.foto || !nuevaNoticia.nombre || !nuevaNoticia.descripcion) return;
    onAdd(nuevaNoticia);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className="text-center">Agregar Noticia</h2>
        <label>ID:</label>
        <input
          name="id"
          type="number"
          value={nuevaNoticia.id}
          onChange={handleChange}
        />
        <label>Foto (URL):</label>
        <input
          name="foto"
          type="text"
          value={nuevaNoticia.foto}
          onChange={handleChange}
        />
        <label>Nombre:</label>
        <input
          name="nombre"
          type="text"
          value={nuevaNoticia.nombre}
          onChange={handleChange}
        />
        <label>Descripción:</label>
        <input
          name="descripcion"
          type="text"
          value={nuevaNoticia.descripcion}
          onChange={handleChange}
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
