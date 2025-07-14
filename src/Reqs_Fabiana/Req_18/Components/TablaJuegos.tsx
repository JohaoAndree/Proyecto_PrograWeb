import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Juego } from '../../../../types';
import FormularioJuego from '../Components/FormularioJuego';

const TablaJuegos = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState<Juego | null>(null);
  const [juegoEliminando, setJuegoEliminando] = useState<Juego | null>(null);

  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    try {
      const res = await axios.get('http://localhost:5020/api/juegos');
      setJuegos(res.data);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    }
  };

  const guardarJuego = async (juego: Juego): Promise<void> => {
    try {
      if (juego.id) {
        await axios.put(`http://localhost:5020/api/juegos/${juego.id}`, juego);
      } else {
        await axios.post('http://localhost:5020/api/juegos', juego);
      }

      setMostrarAgregar(false);
      setJuegoEditando(null);
      await cargarJuegos();
    } catch (error) {
      console.error('Error al guardar juego:', error);
    }
  };

  const eliminarJuego = async (id: number): Promise<void> => {
    try {
      await axios.delete(`http://localhost:5020/api/juegos/${id}`);
      setJuegoEliminando(null);
      await cargarJuegos();
    } catch (error) {
      console.error('Error al eliminar juego:', error);
    }
  };

  return (
    <div className="table-responsive px-4">
      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-secondary">Filtrar</button>
        <button className="btn btn-primary" onClick={() => setMostrarAgregar(true)}>
          + Agregar
        </button>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => (
            <tr key={juego.id}>
              <td>{juego.nombre}</td>
              <td>{juego.descripcion}</td>
              <td>{juego.categoria?.nombre || '—'}</td>
              <td>S/. {juego.precio}</td>
              <td>{juego.descuento || '0%'}</td>
              <td>
                <button
                  className="btn btn-outline-dark btn-sm me-2"
                  onClick={() => setJuegoEditando(juego)}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => setJuegoEliminando(juego)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar o editar */}
      {(mostrarAgregar || juegoEditando) && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div style={{ width: '90%', maxWidth: '700px' }}>
            <FormularioJuego
              modo={mostrarAgregar ? 'agregar' : 'editar'}
              juego={juegoEditando ?? undefined}
              onCancelar={() => {
                setMostrarAgregar(false);
                setJuegoEditando(null);
              }}
              onGuardar={guardarJuego}
            />
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar */}
      {juegoEliminando && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="bg-white p-4 rounded-4 shadow" style={{ width: '90%', maxWidth: '400px' }}>
            <h5>¿Estás segura de eliminar <strong>{juegoEliminando.nombre}</strong>?</h5>
            <div className="d-flex justify-content-end mt-3 gap-2">
              <button className="btn btn-secondary" onClick={() => setJuegoEliminando(null)}>
                Cancelar
              </button>
              <button
                className="btn btn-danger"
                onClick={async () => {
                  if (juegoEliminando?.id) {
                    await eliminarJuego(juegoEliminando.id);
                  }
                }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaJuegos;
