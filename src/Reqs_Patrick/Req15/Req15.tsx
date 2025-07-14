import { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.css";

const Req15 = () => {
  const [nombre, setNombre] = useState("Patrick");
  const [email, setEmail] = useState("patrick@example.com");
  const [foto, setFoto] = useState("https://i.ibb.co/7G8VYgD/default-user.jpg");
  const [mensaje, setMensaje] = useState("");

  const handleGuardar = async () => {
  if (!nombre || !email) {
    setMensaje("❌ Todos los campos son obligatorios.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    setMensaje("❌ Correo inválido.");
    return;
  }

  try {
    const respuesta = await fetch("http://localhost:5073/api/usuario/1", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre,
        correo: email,
        foto,
      }),
    });

    const data = await respuesta.json();

    if (respuesta.ok) {
      setMensaje(data.mensaje || "✅ Datos actualizados correctamente.");
    } else {
      setMensaje(data.mensaje || "❌ Error al actualizar el perfil.");
    }
  } catch (error) {
    console.error("Error al conectar con el backend", error);
    setMensaje("❌ Fallo de conexión con el servidor.");
  }

  setTimeout(() => setMensaje(""), 3000);
};


  return (
    <div className={styles.fondoAzulOsc}>
      <div className={styles.cajaPerfil}>
        <h2>⚙️ Configuración de Usuario</h2>
        <img src={foto} alt="Foto de perfil" className={styles.fotoPerfil} />

        <label className={styles.formLabel}>📸 Foto de perfil (URL):</label>
        <input
          type="text"
          className="form-control"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          placeholder="https://..."
        />

        <label className={styles.formLabel}>👤 Nombre:</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label className={styles.formLabel}>📧 Correo electrónico:</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn btn-info w-100 mt-3" onClick={handleGuardar}>
          Guardar cambios
        </button>

        {mensaje && <div className={styles.mensaje}>{mensaje}</div>}
      </div>
    </div>
  );
};

export default Req15;

