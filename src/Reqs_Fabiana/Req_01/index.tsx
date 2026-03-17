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
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
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
      <div className={styles.loginBox + ' fadeInUp'}>
        <h2 className="mb-4">
          Ingresa a <br /><strong>GameStore</strong>
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <label htmlFor="email" className={styles.label}>Usuario o correo electrónico</label>
          <input
            id="email"
            type="text"
            className={styles.inputField}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="ejemplo@correo.com"
          />

          <div className="d-flex justify-content-between align-items-center mb-2">
            <label htmlFor="password" className={styles.label + ' mb-0'}>Contraseña</label>
            <Link to="/recuperar" className={styles.linkOlvido}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button type="submit" className={styles.submitBtn}>
            Iniciar Sesión
          </button>
        </form>

        {mensaje && (
          <div className="alert alert-success py-2 small" role="alert">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="alert alert-danger py-2 small" role="alert">
            {error}
          </div>
        )}

        <p className={styles.footerText}>
          ¿Eres nuevo en GameStore?{" "}
          <Link to="/registro" className={styles.registerLink}>
            Crea una cuenta
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;