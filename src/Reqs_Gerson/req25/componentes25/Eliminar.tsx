// src/Reqs_Gerson/req25/componentes25/Eliminar.tsx

import React from "react";
import { FaTrash } from "react-icons/fa";

interface Props {
  id: number;
  onDelete: (id: number) => void;
}

const Eliminar: React.FC<Props> = ({ id, onDelete }) => {
  const handleClick = () => {
    if (confirm("¿Estás seguro de eliminar esta noticia?")) {
      onDelete(id);
    }
  };

  return (
    <button className="btn btn-outline-danger btn-sm" onClick={handleClick}>
      <FaTrash />
    </button>
  );
};

export default Eliminar;
