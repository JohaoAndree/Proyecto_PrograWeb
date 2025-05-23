import { useState, useEffect } from "react";
import type { Noticia } from "./ListaNoticias";
import styles from "./styles.module.css";

interface Props {
  noticia: Noticia;
  onSave: (noticia: Noticia) => void;
  onClose: () => void;
}

const EditarModal: React.FC<Props> = ({ noticia, onSave, onClose }) => {
  const [editNoticia, setEditNoticia] = useState<Noticia>({ ...noticia });

  useEffect(() => {
    setEditNoticia({ ...noticia });
  }, [noticia]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditNoticia((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editNoticia);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Noticia</h2>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <label>
            ID:
            <input
              type="text"
              name="id"
              value={editNoticia.id}
              onChange={handleChange}
              readOnly
            />
          </label>
          <label>
            Foto (URL):
            <input
              type="text"
              name="foto"
              value={editNoticia.foto}
              onChange={handleChange}
            />
          </label>
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={editNoticia.nombre}
              onChange={handleChange}
            />
          </label>
          <label>
            Descripción:
            <input
              type="text"
              name="descripcion"
              value={editNoticia.descripcion}
              onChange={handleChange}
            />
          </label>
          <div className={styles.buttonGroup}>
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarModal;
