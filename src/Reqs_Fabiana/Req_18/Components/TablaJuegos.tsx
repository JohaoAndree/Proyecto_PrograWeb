import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import type { Juego } from '../../../../types';
import FormularioJuego from '../Components/FormularioJuego';
import styles from '../styles.module.css'
import { SkeletonTable } from '../../../Shared/Components/SkeletonView';

const TablaJuegos = () => {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostrarAgregar, setMostrarAgregar] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState<Juego | null>(null);
  const [juegoEliminando, setJuegoEliminando] = useState<Juego | null>(null);
  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    cargarJuegos();
    cargarCategorias();
  }, [categoriaSeleccionada]);

  const cargarJuegos = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/juegos`);
      let lista = res.data;

      // Filtro para mostrar solo juegos activos
      lista = lista.filter((j: Juego) => j.estado === true);

      if (categoriaSeleccionada) {
        lista = lista.filter((j: Juego) => j.categoriaId === categoriaSeleccionada);
      }

      setJuegos(lista);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
    } finally {
      setIsLoading(false);
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
        await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/juegos/${juego.id}`, juego);
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

  const juegosFiltrados = juegos.filter((j) =>
    j.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
  );

  return (
    <div className="fadeInUp h-100 d-flex flex-column">
      {/* Cabecera con Filtros */}
      <div className={styles.HeaderTable}>
        <div className={styles.SearchContainer}>
          <div className={styles.SearchGroup}>
            <label>Nombre</label>
            <input
              type="text"
              placeholder="Buscar juego..."
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
              className={styles.SearchInput}
            />
          </div>
          <div className={styles.SearchGroup}>
            <label>Categoría</label>
            <select
              className={styles.SelectInput}
              value={categoriaSeleccionada ?? ''}
              onChange={(e) =>
                setCategoriaSeleccionada(e.target.value ? Number(e.target.value) : null)
              }
            >
              <option value="">Todas</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className={styles.BtnAgregar} onClick={() => setMostrarAgregar(true)}>
          + Nuevo Juego
        </button>
      </div>

      {/* Contenedor de Tabla Premium */}
      <div className={styles.TableWrapper}>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <table className={styles.AdminTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th style={{ textAlign: 'center' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {juegosFiltrados.map((juego) => (
                <tr key={juego.id}>
                  <td><strong>{juego.nombre}</strong></td>
                  <td>
                    <div className={styles.DescripcionCol}>
                      {juego.descripcion}
                    </div>
                  </td>
                  <td>{juego.categoria?.nombre || '—'}</td>
                  <td className={styles.PrecioCol}>S/. {juego.precio}</td>
                  <td className={styles.DescuentoCol}>S/. {juego.descuento || '0'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className={`${styles.BtnAction} ${styles.BtnEdit}`}
                      onClick={() => setJuegoEditando(juego)}
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className={`${styles.BtnAction} ${styles.BtnDelete}`}
                      onClick={() => setJuegoEliminando(juego)}
                      title="Eliminar"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Formulario */}
      {(mostrarAgregar || juegoEditando) && (
        <div className={styles.ModalOverlay}>
          <div className={styles.ModalContent} style={{ maxWidth: '750px' }}>
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

      {/* Modal Confirmación Eliminación */}
      {juegoEliminando && (
        <div className={styles.ModalOverlay}>
          <div className={`${styles.ModalContent} ${styles.ModalConfirmacion} fadeInUp`}>
            <h5 style={{ fontWeight: 800, fontSize: '1.25rem' }}>
              ¿Estás seguro de eliminar <br />
              <span style={{ color: 'var(--color-primary)' }}>{juegoEliminando.nombre}</span>?
            </h5>
            <p style={{ color: '#A0A0A0', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Esta acción no se puede deshacer. El juego dejará de ser visible en la tienda.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className={styles.BtnCancel} onClick={() => setJuegoEliminando(null)}>
                Cancelar
              </button>
              <button
                className={styles.BtnSave}
                style={{ background: 'linear-gradient(135deg, #ff4d4d 0%, #b30000 100%)', boxShadow: '0 4px 15px rgba(255, 77, 77, 0.3)' }}
                onClick={async () => {
                  if (juegoEliminando?.id) {
                    await eliminarJuego(juegoEliminando.id);
                  }
                }}
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaJuegos;