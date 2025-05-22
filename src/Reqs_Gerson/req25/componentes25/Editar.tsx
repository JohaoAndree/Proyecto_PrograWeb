// Archivo: src/Reqs_Gerson/req25/componentes25/Editar.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Noticia {
  id: number;
  foto: string;
  nombre: string;
  descripcion: string;
}

interface EditarProps {
  noticia: Noticia;
  onGuardar: (noticiaActualizada: Noticia) => void;
}

const Editar = ({ noticia, onGuardar }: EditarProps) => {
  const [nombre, setNombre] = useState(noticia.nombre);
  const [descripcion, setDescripcion] = useState(noticia.descripcion);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const noticiaActualizada: Noticia = {
      ...noticia,
      nombre,
      descripcion,
    };
    onGuardar(noticiaActualizada);
    navigate("/noticias"); // volver a la vista principal
  };

  return (
    <div className="container mt-5">
      <h2>Editar Noticia</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Editar;