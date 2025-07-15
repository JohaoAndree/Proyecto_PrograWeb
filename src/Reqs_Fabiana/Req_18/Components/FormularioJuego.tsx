import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Juego } from '../../../../types';

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
    <div className="alert alert-light border border-primary rounded-4 p-4">
      <h5 className="mb-4">{modo === 'agregar' ? 'Agregar juego' : 'Editar juego'}</h5>

      <div className="row mb-3">
        <div className="col">
          <label>Nombre</label>
          <input
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label>Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label>Categoría</label>
          <select
            className="form-control"
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

        <div className="col">
          <label>Foto (subir)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const base64 = reader.result as string;
setFormData({
  ...formData,
  foto: base64,
  imagen: base64, // ✅ enviar lo mismo en ambos campos
});

                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label>Precio</label>
          <input
            type="text"
            className="form-control"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <label>Descuento</label>
          <input
            className="form-control"
            name="descuento"
            value={formData.descuento}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Guardar
        </button>
      </div>
    </div>
  );
};

export default FormularioJuego;

