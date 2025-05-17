interface Props {
  noticias: string[];
  onEliminar: (texto: string) => void;
  onEditar: (texto: string) => void;
}

const ListaNoticias = ({ noticias, onEliminar, onEditar }: Props) => {
  return (
    <ul className="list-group">
      {noticias.map((n, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between"
        >
          {n}
          <div>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => onEditar(n)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => onEliminar(n)}
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListaNoticias;
