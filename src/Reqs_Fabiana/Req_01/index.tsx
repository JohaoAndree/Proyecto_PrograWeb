import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import styles from './styles.module.css';

const Login = () => {
  return (
    <div className={styles.fondoAzulOscuro}>
      <div className="text-center">
        <div className={styles.loginBox}>
          <h2 className="mb-4">
            Ingresa <br /><strong>GameStore</strong>
          </h2>

          <label htmlFor="email" className="form-label">Usuario o correo electrónico:</label>
          <input id="email" type="text" className="form-control mb-3" />

          <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="password" className="form-label mb-0">Contraseña:</label>
            <Link to="/recuperar"className={`text-white text-decoration-none ${styles.linkOlvido}`}>
             ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input id="password" type="password" className="form-control mb-3" />

          <button className="btn btn-danger w-100 mb-3">Ingresa</button>

          <p>
            ¿Eres nuevo en GameStore?{" "}
            <Link to="/registro" className="text-white fw-bold text-decoration-underline">
              Crea una cuenta
            </Link>
          </p>
        </div>

        <Link to="/req22">
          <button className="btn btn-primary mt-4">
            Ir a la vista administrador
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;

