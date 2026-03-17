import { useState, useMemo } from "react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import styles from "./styles.module.css";
import { eliminarNoticia as eliminarNoticiaApi } from "../../../api/usuarios.api";
import FormularioNoticia from "./FormularioNoticia";

export interface Noticia {
  id: number;
  foto: string;
  nombre: string;
  descripcion: string;
}

interface PropsListaNoticias {
  noticias: Noticia[];
  recargarNoticias: () => void;
}

const ListaNoticias = ({ noticias, recargarNoticias }: PropsListaNoticias) => {
  const [noticiaEditando, setNoticiaEditando] = useState<Noticia | null>(null);
  const [modalAgregar, setModalAgregar] = useState(false);
  const [juegoEliminando, setJuegoEliminando] = useState<Noticia | null>(null);

  // Filtros
  const [filtroId, setFiltroId] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");

  const noticiasFiltradas = useMemo(() => {
    return noticias
      .filter(n => {
        const matchId = n.id.toString().includes(filtroId);
        const matchNombre = n.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
        return matchId && matchNombre;
      })
      .sort((a, b) => a.id - b.id);
  }, [noticias, filtroId, filtroNombre]);

  const handleEliminar = async (id: number) => {
    try {
      await eliminarNoticiaApi(id);
      setJuegoEliminando(null);
      await recargarNoticias();
    } catch (error) {
      console.error("Error al eliminar noticia:", error);
    }
  };

  return (
    <div className={styles.FullSpaceContainer}>
      <div className={styles.HeaderTable}>
        <div className={styles.SearchContainer}>
          <div className={styles.SearchGroup}>
            <label>ID</label>
            <input
              type="text"
              placeholder="Buscar ID..."
              className={styles.SearchInput}
              value={filtroId}
              onChange={(e) => setFiltroId(e.target.value)}
              style={{ maxWidth: '120px' }}
            />
          </div>
          <div className={styles.SearchGroup}>
            <label>Nombre de Noticia</label>
            <input
              type="text"
              placeholder="Ej: Lanzamiento de DLC..."
              className={styles.SearchInput}
              value={filtroNombre}
              onChange={(e) => setFiltroNombre(e.target.value)}
            />
          </div>
        </div>

        <button className={styles.BtnAgregar} onClick={() => setModalAgregar(true)}>
          <FaPlus /> Agregar Noticia
        </button>
      </div>

      <div className={styles.TableWrapper}>
        <table className={styles.AdminTable}>
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th style={{ width: '100px' }}>Foto</th>
              <th style={{ width: '250px' }}>Nombre</th>
              <th>Descripción</th>
              <th style={{ width: '120px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {noticiasFiltradas.map((noticia) => (
              <tr key={noticia.id}>
                <td><strong>#{noticia.id}</strong></td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${noticia.foto}`}
                    alt={noticia.nombre}
                    className={styles.ImagenNoticia}
                  />
                </td>
                <td><span style={{ fontWeight: 600 }}>{noticia.nombre}</span></td>
                <td>
                  <div className={styles.DescripcionCol}>
                    {noticia.descripcion}
                  </div>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button
                    className={`${styles.BtnAction} ${styles.BtnEdit}`}
                    onClick={() => setNoticiaEditando(noticia)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={`${styles.BtnAction} ${styles.BtnDelete}`}
                    onClick={() => setJuegoEliminando(noticia)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modales locales premium */}
      {(modalAgregar || noticiaEditando) && (
        <div className={styles.ModalOverlay}>
          <div className={`${styles.ModalContent} fadeInUp`}>
            <FormularioNoticia
              modo={modalAgregar ? 'agregar' : 'editar'}
              noticia={noticiaEditando || undefined}
              onCancelar={() => {
                setModalAgregar(false);
                setNoticiaEditando(null);
              }}
              onGuardar={async () => {
                await recargarNoticias();
                setModalAgregar(false);
                setNoticiaEditando(null);
              }}
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
              <span style={{ color: '#00aeef' }}>{juegoEliminando.nombre}</span>?
            </h5>
            <p style={{ color: '#A0A0A0', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Esta acción no se puede deshacer. La noticia dejará de ser visible en el portal.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button className={styles.BtnCancel} onClick={() => setJuegoEliminando(null)}>
                Cancelar
              </button>
              <button
                className={styles.BtnSave}
                style={{ background: 'linear-gradient(135deg, #ff4d4d 0%, #b30000 100%)', boxShadow: '0 4px 15px rgba(255, 77, 77, 0.3)' }}
                onClick={() => handleEliminar(juegoEliminando.id)}
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

export default ListaNoticias;
