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

  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    cargarJuegos();
    cargarCategorias();
  }, [categoriaSeleccionada]);

  const cargarJuegos = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/juegos`);
    let lista = res.data;

    // ⚠️ Agrega este filtro para que solo se vean los juegos activos
    lista = lista.filter((j: Juego) => j.estado === true);

    if (categoriaSeleccionada) {
      lista = lista.filter((j: Juego) => j.categoriaId === categoriaSeleccionada);
    }

    setJuegos(lista);
  } catch (error) {
    console.error('Error al cargar juegos:', error);
  }
};


  const cargarCategorias = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/juegos/categorias`);
      setCategorias(res.data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  };

  const guardarJuego = async (juego: Juego): Promise<void> => {
    try {
      if (juego.id) {
        await axios.put(`${import.meta.env.ITE_BACKEND_URL}/api/juegos/${juego.id}`, juego);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/juegos`, juego);
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
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/juegos/${id}`, { estado: false });
    setJuegoEliminando(null);
    await cargarJuegos();
  } catch (error) {
    console.error('Error al eliminar juego:', error);
  }
};


  return (
    <div className="table-responsive px-4">
      {/* Filtros */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <div className="d-flex gap-2">
          <select
            className="form-select"
            style={{ width: '200px' }}
            value={categoriaSeleccionada ?? ''}
            onChange={(e) =>
              setCategoriaSeleccionada(e.target.value ? Number(e.target.value) : null)
            }
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary" onClick={() => setMostrarAgregar(true)}>
          + Agregar
        </button>
      </div>

      {/* Tabla */}
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

      {/* Formulario agregar/editar */}
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
                setMostrarAgregar(false);
                setJuegoEditando(null);
              }}
              onGuardar={guardarJuego}
            />
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}
      {juegoEliminando && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        >
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
