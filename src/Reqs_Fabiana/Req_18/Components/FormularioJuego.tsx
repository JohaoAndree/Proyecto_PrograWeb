import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Juego } from '../../../../types';
import styles from '../styles.module.css';

type Props = {
  modo: 'agregar' | 'editar';
  juego?: Partial<Juego>;
  onCancelar: () => void;
  onGuardar: (juego: Juego) => Promise<void>;
};

const FormularioJuego = ({ modo, juego, onCancelar, onGuardar }: Props) => {
  const [formData, setFormData] = useState<Juego>({
    id: juego?.id,
    nombre: juego?.nombre || '',
    descripcion: juego?.descripcion || '',
    categoriaId: juego?.categoriaId ?? 1,
    precio: juego?.precio !== undefined ? Number(juego.precio) : 0,
    descuento: juego?.descuento || '',
    foto: juego?.foto || '',
    imagen: juego?.imagen || '', // ✅ agregar esto
  });


  const [categorias, setCategorias] = useState<{ id: number; nombre: string }[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/juegos/categorias`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'categoriaId' ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    await onGuardar(formData);
  };

  return (
    <div className="fadeIn">
      <h2 className={styles.FormTitle}>
        {modo === 'agregar' ? 'Agregar Nuevo Juego' : 'Editar Información de Juego'}
      </h2>

      <div className="row">
        <div className="col-md-6">
          <div className={styles.FormGroup}>
            <label className={styles.FormLabel}>Nombre del Juego</label>
            <input
              className={styles.SearchInput}
              name="nombre"
              placeholder="Ej: Elden Ring"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={styles.FormGroup}>
            <label className={styles.FormLabel}>Categoría</label>
            <select
              className={styles.SelectInput}
              name="categoriaId"
              value={formData.categoriaId}
              onChange={handleChange}
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.FormGroup}>
        <label className={styles.FormLabel}>Descripción Detallada</label>
        <textarea
          className={`${styles.SearchInput} ${styles.TextAreaInput}`}
          name="descripcion"
          placeholder="Describe la experiencia del juego..."
          value={formData.descripcion}
          onChange={handleChange}
        />
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className={styles.FormGroup}>
            <label className={styles.FormLabel}>Precio (S/.)</label>
            <input
              type="text"
              className={styles.SearchInput}
              name="precio"
              placeholder="0.00"
              value={formData.precio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.FormGroup}>
            <label className={styles.FormLabel}>Descuento (S/.)</label>
            <input
              className={styles.SearchInput}
              name="descuento"
              placeholder="Ej: 15.00"
              value={formData.descuento}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className={styles.FormGroup}>
            <label className={styles.FormLabel}>Imagen de Portada</label>
            <div className={styles.FileInputWrapper}>
              <input
                type="file"
                accept="image/*"
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64 = reader.result as string;
                      setFormData({
                        ...formData,
                        foto: base64,
                        imagen: base64,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                {formData.foto ? '✓ Imagen Cargada' : '+ Subir Imagen'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.FormActions}>
        <button className={styles.BtnCancel} onClick={onCancelar}>
          Cancelar
        </button>
        <button className={styles.BtnSave} onClick={handleSubmit}>
          {modo === 'agregar' ? 'Guardar Juego' : 'Actualizar Cambios'}
        </button>
      </div>
    </div>
  );
};

export default FormularioJuego;