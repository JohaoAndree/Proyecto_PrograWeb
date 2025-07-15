import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5020/api/users/login', {
      correo,
      password
    });

    const usuario = response.data.usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario));
    setMensaje(`Bienvenido, ${usuario.nombre}`);
    setError('');

    if (usuario.correo.trim().toLowerCase() === 'admin@gamestore.es') {
  navigate('/req22'); // vista administrador
} else {
  navigate('/'); // vista normal
}


  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    setMensaje('');
    setError('Correo o contraseña incorrectos');
  }
};


  return (
    <div className={styles.fondoAzulOscuro}>
      <div className="text-center">
        <div className={styles.loginBox}>
          <h2 className="mb-4">
            Ingresa <br /><strong>GameStore</strong>
          </h2>

          <label htmlFor="email" className="form-label">Usuario o correo electrónico:</label>
          <input
            id="email"
            type="text"
            className="form-control mb-3"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <label htmlFor="password" className="form-label mb-0">Contraseña:</label>
            <Link to="/recuperar"className={`text-white text-decoration-none ${styles.linkOlvido}`}>
             ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            className="form-control mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin} className="btn btn-danger w-100 mb-3">
            Ingresa
          </button>

          {mensaje && (
            <div className="alert alert-success" role="alert">
              {mensaje}
            </div>
          )}

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <p>
            ¿Eres nuevo en GameStore?{" "}
            <Link to="/registro" className="text-white fw-bold text-decoration-underline">
              Crea una cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};




export default Login;
