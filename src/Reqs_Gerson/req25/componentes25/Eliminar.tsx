import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import ConfirmarEliminar from "./ConfirmarEliminar";

interface Props {
  id: number;
  onDelete: (id: number) => void;
}

const Eliminar: React.FC<Props> = ({ id, onDelete }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleEliminar = () => {
    onDelete(id);
    setMostrarModal(false);
  };

  return (
    <>
      <button className="btn btn-outline-danger btn-sm" onClick={() => setMostrarModal(true)}>
        <FaTrash />
      </button>

      {mostrarModal && (
        <ConfirmarEliminar
          onConfirm={handleEliminar}
          onCancel={() => setMostrarModal(false)}
        />
      )}
    </>
  );
};

export default Eliminar;