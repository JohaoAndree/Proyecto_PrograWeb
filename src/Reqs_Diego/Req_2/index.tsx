import backend from "../../api/axios";
import { useState } from 'react';
import styles from "./styles.module.css";

const Req2 = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contra, setContra] = useState("");
  const [repContra, setRepContra] = useState("");
  const [pais, setPais] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  const onClick = async () => {
    if (!nombre || !correo || !contra || !repContra || !pais) {
      setMensaje("Por favor, llena todos los campos obligatorios.");
      setErrorStatus(true);
      return;
    }

    if (!correo.includes("@") || !correo.includes(".")) {
      setMensaje("Ingresa un correo electrónico válido.");
      setErrorStatus(true);
      return;
    }

    if (contra.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setErrorStatus(true);
      return;
    }

    if (contra !== repContra) {
      setMensaje("Las contraseñas no coinciden.");
      setErrorStatus(true);
      return;
    }

    setCargando(true);
    setMensaje("");
    setErrorStatus(false);

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("correo", correo);
    formData.append("password", contra);
    formData.append("pais", pais);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const res = await backend.post(
        `/api/gerson/games/registro`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 200) {
        setMensaje(res.data.msg || "¡Registro exitoso! Bienvenido.");
        setErrorStatus(false);
        // Limpiar formulario si es necesario
        setNombre("");
        setCorreo("");
        setContra("");
        setRepContra("");
        setPais("");
        setFoto(null);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.msg || error.response?.data?.mensaje || "Ocurrió un error al registrar.";
      setMensaje(errorMsg);
      setErrorStatus(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className={styles.fondoAzulOsc}>
      <div className={styles.cajaRegist + " fadeInUp"}>
        <h2 className="mb-2 text-center">
          Únete a <strong>GameStore</strong>
        </h2>
        <p className="text-center mb-4">Crea tu cuenta y empieza la aventura</p>

        <div className="mb-3">
          <label htmlFor="nombreRegis" className={styles.formLabel}>
            Nombres Completos
          </label>
          <input
            id="nombreRegis"
            type="text"
            className={styles.formControl + " w-100"}
            placeholder="Ej. Juan Pérez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emailRegis" className={styles.formLabel}>
            Correo Electrónico
          </label>
          <input
            id="emailRegis"
            type="email"
            className={styles.formControl + " w-100"}
            placeholder="ejemplo@correo.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="paisRegis" className={styles.formLabel}>
            País de Residencia
          </label>
          <input
            id="paisRegis"
            type="text"
            className={styles.formControl + " w-100"}
            placeholder="Ej. Perú"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className={styles.formLabel}>Foto de Perfil</label>
          <div className={styles.fileInputContainer}>
            <input
              id="fotoRegis"
              type="file"
              className="d-none"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFoto(e.target.files[0]);
                }
              }}
            />
            <label htmlFor="fotoRegis" className={styles.customFileLabel}>
              {foto ? `✓ ${foto.name}` : "Seleccionar imagen..."}
            </label>
          </div>
        </div>

        <div className="row g-3 mb-3">
          <div className="col-md-6">
            <label htmlFor="contraRegis" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              id="contraRegis"
              type="password"
              className={styles.formControl + " w-100"}
              placeholder="••••••••"
              value={contra}
              onChange={(e) => setContra(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="repContraRegis" className={styles.formLabel}>
              Confirmar
            </label>
            <input
              id="repContraRegis"
              type="password"
              className={styles.formControl + " w-100"}
              placeholder="••••••••"
              value={repContra}
              onChange={(e) => setRepContra(e.target.value)}
            />
          </div>
        </div>

        <button
          id="buttonRegis"
          className={styles.submitBtn + " w-100"}
          onClick={onClick}
          disabled={cargando}
        >
          {cargando ? (
            <>
              <span className={styles.spinner}></span> Procesando...
            </>
          ) : (
            "Crear Cuenta"
          )}
        </button>

        {mensaje && (
          <div
            className={`${styles.alert} ${errorStatus ? styles.alertError : styles.alertSuccess
              } text-center`}
          >
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
};

export default Req2;