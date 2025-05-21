import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import FormularioJuego from '../Components/FormularioJuego'

// ✅ Tipo de objeto Juego
type Juego = {
  fecha: string
  categoria: string
  nombre: string
  precio: number
  descuento: string
}

// ✅ Lista base de juegos
const juegosBase: Juego[] = [
  { fecha: "12/12/24", categoria: "Hack & Slash", nombre: "Devil May Cry 5", precio: 90, descuento: "75%" },
  { fecha: "25/03/23", categoria: "Open world", nombre: "Red Dead Redemption 2", precio: 54.97, descuento: "75%" },
  { fecha: "17/02/22", categoria: "Horror", nombre: "Silent Hill 2", precio: 232.5, descuento: "0%" }
]

const TablaJuegos = () => {
  const [mostrarAgregar, setMostrarAgregar] = useState(false)
  const [juegoEditando, setJuegoEditando] = useState<Juego | null>(null)
  const [juegoEliminando, setJuegoEliminando] = useState<Juego | null>(null)

  return (
    <div className="table-responsive px-4">
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-secondary">Filter</button>
        <button className="btn btn-primary" onClick={() => setMostrarAgregar(true)}>+ Add</button>
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
          {juegosBase.map((juego, index) => (
            <tr key={index}>
              <td>{juego.fecha}</td>
              <td>{juego.categoria}</td>
              <td>{juego.nombre}</td>
              <td>S/. {juego.precio}</td>
              <td>{juego.descuento}</td>
              <td>
                <button className="btn btn-outline-dark btn-sm me-2" onClick={() => setJuegoEditando(juego)}>
                  <FaEdit />
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => setJuegoEliminando(juego)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL CENTRADO: Agregar o Editar */}
      {(mostrarAgregar || juegoEditando) && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div style={{ width: '90%', maxWidth: '700px' }}>
            <FormularioJuego
              modo={mostrarAgregar ? 'agregar' : 'editar'}
              juego={juegoEditando ?? undefined}
              onCancelar={() => {
                setMostrarAgregar(false)
                setJuegoEditando(null)
              }}
              onGuardar={(juego) => {
                console.log(mostrarAgregar ? 'Juego agregado:' : 'Juego editado:', juego)
                setMostrarAgregar(false)
                setJuegoEditando(null)
              }}
            />
          </div>
        </div>
      )}

      {/* MODAL CENTRADO: Confirmación de eliminación */}
      {juegoEliminando && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
          <div className="alert alert-danger text-center p-4 rounded-4 shadow" style={{ width: '90%', maxWidth: '500px' }}>
            <h5>¿Está seguro de eliminar "{juegoEliminando.nombre}"?</h5>
            <div className="d-flex justify-content-center mt-3 gap-2">
              <button className="btn btn-secondary" onClick={() => setJuegoEliminando(null)}>Cancelar</button>
              <button className="btn btn-danger">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TablaJuegos
