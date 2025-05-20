import { FaEdit, FaTrash } from 'react-icons/fa'

const juegos = [
  {
    fecha: "12/12/24",
    categoria: "Hack & Slash",
    nombre: "Devil May Cry 5",
    precio: 90,
    descuento: "75%"
  },
  {
    fecha: "25/03/23",
    categoria: "Open world",
    nombre: "Red Dead Redemption 2",
    precio: 54.97,
    descuento: "75%"
  },
  {
    fecha: "17/02/22",
    categoria: "Horror",
    nombre: "Silent Hill 2",
    precio: 232.5,
    descuento: "0%"
  }
]

const TablaJuegos = () => {
  return (
    <div className="table-responsive px-4">
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-secondary">Filter</button>
        <button className="btn btn-primary">+ Add</button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Name</th>
            <th>Base price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego, index) => (
            <tr key={index}>
              <td>{juego.fecha}</td>
              <td>{juego.categoria}</td>
              <td>{juego.nombre}</td>
              <td>S/. {juego.precio}</td>
              <td>{juego.descuento}</td>
              <td>
                <button className="btn btn-outline-dark btn-sm me-2">
                  <FaEdit />
                </button>
                <button className="btn btn-outline-danger btn-sm">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaJuegos
