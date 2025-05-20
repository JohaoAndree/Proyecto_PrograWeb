import { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import FormularioJuego from '../Components/FormularioJuego'

// ✅ 1. Declaramos el tipo de objeto "Juego"
type Juego = {
  fecha: string
  categoria: string
  nombre: string
  precio: number
  descuento: string
}

// ✅ 2. Usamos el tipo en el arreglo base
const juegosBase: Juego[] = [
  { fecha: "12/12/24", categoria: "Hack & Slash", nombre: "Devil May Cry 5", precio: 90, descuento: "75%" },
  { fecha: "25/03/23", categoria: "Open world", nombre: "Red Dead Redemption 2", precio: 54.97, descuento: "75%" },
  { fecha: "17/02/22", categoria: "Horror", nombre: "Silent Hill 2", precio: 232.5, descuento: "0%" }
]

const TablaJuegos = () => {
  // ✅ 3. Especificamos los tipos en useState
  const [mostrarAgregar, setMostrarAgregar] = useState(false)
  const [juegoEditando, setJuegoEditando] = useState<any>(null)

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

      {mostrarAgregar && (
  <FormularioJuego
    modo="agregar"
    onCancelar={() => setMostrarAgregar(false)}
    onGuardar={(nuevoJuego) => {
      console.log('Juego agregado:', nuevoJuego)
      setMostrarAgregar(false)
    }}
  />
)}

      {juegoEditando && (
  <FormularioJuego
    modo="editar"
    juego={juegoEditando}
    onCancelar={() => setJuegoEditando(null)}
    onGuardar={(juegoEditado) => {
      console.log('Juego editado:', juegoEditado)
      setJuegoEditando(null)
    }}
  />
)}


      {juegoEliminando && (
        <div className="alert alert-danger">
          <h5>¿Está seguro de eliminar "{juegoEliminando.nombre}"?</h5>
          <button className="btn btn-secondary me-2" onClick={() => setJuegoEliminando(null)}>Cancelar</button>
          <button className="btn btn-danger">Eliminar</button>
        </div>
      )}
    </div>
  )
}

export default TablaJuegos
