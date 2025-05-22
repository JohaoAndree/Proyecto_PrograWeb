import { useState } from 'react'

type Juego = {
  nombre: string
  descripcion: string
  categoria: string
  precio: number
  descuento: string
  foto: string
}

type Props = {
  modo: 'agregar' | 'editar'
  juego?: Partial<Juego>
  onCancelar: () => void
  onGuardar: (juego: Juego) => void
}

const FormularioJuego = ({ modo, juego, onCancelar, onGuardar }: Props) => {
  const [formData, setFormData] = useState<Juego>({
    nombre: juego?.nombre || '',
    descripcion: juego?.descripcion || '',
    categoria: juego?.categoria || '',
    precio: juego?.precio || 0,
    descuento: juego?.descuento || '',
    foto: juego?.foto || ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    onGuardar(formData)
  }

  return (
    <div className="alert alert-light border border-primary rounded-4 p-4">
      <h5 className="mb-4">{modo === 'agregar' ? 'Add game' : 'Edit game'}</h5>

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
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="Horror">Horror</option>
            <option value="Open world">Open world</option>
            <option value="Hack & Slash">Hack & Slash</option>
          </select>
        </div>

        <div className="col-12 mt-3">
          <label>Foto(subir)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  setFormData({ ...formData, foto: reader.result as string })
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label>Precio</label>
          <input
            type="number"
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
          Cancel
        </button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default FormularioJuego
