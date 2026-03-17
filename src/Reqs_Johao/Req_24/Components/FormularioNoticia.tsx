import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import type { Noticia } from "./ListaNoticias";

interface Props {
  modo: 'agregar' | 'editar';
  noticia?: Noticia;
  onCancelar: () => void;
  onGuardar: () => Promise<void>;
}

const FormularioNoticia: React.FC<Props> = ({ modo, noticia, onCancelar, onGuardar }) => {
  const [nombre, setNombre] = useState(noticia?.nombre || "");
  const [descripcion, setDescripcion] = useState(noticia?.descripcion || "");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(noticia?.foto ? `${import.meta.env.VITE_BACKEND_URL}${noticia.foto}` : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (noticia) {
      setNombre(noticia.nombre);
      setDescripcion(noticia.descripcion);
      setPreview(`${import.meta.env.VITE_BACKEND_URL}${noticia.foto}`);
    }
  }, [noticia]);

  const handleGuardar = async () => {
    if (!nombre || !descripcion || (modo === 'agregar' && !foto)) {
      alert("Por favor complete todos los campos.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("descripcion", descripcion);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const url = modo === 'agregar' 
        ? `${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias`
        : `${import.meta.env.VITE_BACKEND_URL}/api/johao/noticias/${noticia?.id}`;
      
      const response = await fetch(url, {
        method: modo === 'agregar' ? "POST" : "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al procesar la noticia');
      }
      
      await onGuardar();
    } catch (error) {
      console.error("Error al guardar noticia:", error);
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fadeIn">
      <h2 className={styles.FormTitle}>
        {modo === 'agregar' ? 'Publicar Nueva Noticia' : 'Actualizar Noticia'}
      </h2>

      <div className={styles.FormGroup}>
        <label className={styles.FormLabel}>Encabezado de la Noticia</label>
        <input
          type="text"
          className={styles.SearchInput}
          placeholder="Ej: Gran torneo de E-sports este fin de semana..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div className={styles.FormGroup}>
        <label className={styles.FormLabel}>Contenido / Descripción</label>
        <textarea
          className={`${styles.SearchInput} ${styles.TextAreaInput}`}
          placeholder="Escribe el cuerpo de la noticia aquí..."
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <div className={styles.FormGroup}>
        <label className={styles.FormLabel}>Imagen Principal</label>
        <div className="row align-items-center">
          <div className="col-md-8">
            <div className={styles.FileInputWrapper}>
              <input
                type="file"
                accept="image/*"
                style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                onChange={handleFileChange}
              />
              <span style={{ fontSize: '0.8rem', color: '#00aeef', fontWeight: 600 }}>
                {foto ? '✓ Imagen Seleccionada' : '+ Cargar Imagen de Noticia'}
              </span>
            </div>
          </div>
          <div className="col-md-4 text-center">
            {preview && (
              <img 
                src={preview} 
                alt="Preview" 
                className={styles.ImagenNoticia} 
                style={{ width: '100px', height: '100px', borderRadius: '1rem' }}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.FormActions}>
        <button className={styles.BtnCancel} onClick={onCancelar} disabled={loading}>
          Cancelar
        </button>
        <button className={styles.BtnSave} onClick={handleGuardar} disabled={loading}>
          {loading ? 'Procesando...' : (modo === 'agregar' ? 'Publicar Noticia' : 'Guardar Cambios')}
        </button>
      </div>
    </div>
  );
};

export default FormularioNoticia;
