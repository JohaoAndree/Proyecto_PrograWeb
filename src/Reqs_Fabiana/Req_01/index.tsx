import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';


const Login = () => {
  return (
    <div className={styles.fondoAzulOscuro}>
     
      <div className={styles.loginBox}>
        <h2 className="mb-4">Ingresa <br /><strong>GameStore</strong></h2>

        <label htmlFor="email" className="form-label">Usuario o correo electrónico:</label>
        <input id="email" type="text" className="form-control mb-3" />

        <div className="d-flex justify-content-between align-items-center mb-2">
          <label htmlFor="password" className="form-label mb-0">Contraseña:</label>
          <a href="#" className={`text-white text-decoration-none ${styles.linkOlvido}`}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <input id="password" type="password" className="form-control mb-3" />

        <button className="btn btn-danger w-100 mb-3">Ingresa</button>

        <p>¿Eres nuevo en GameStore? <a href="#" className="text-white fw-bold text-decoration-underline">Crea una cuenta</a></p>
      </div>
    </div>
  );
};

export default Login;