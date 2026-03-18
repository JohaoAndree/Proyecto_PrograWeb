import { Link, useNavigate } from 'react-router-dom'
import styles from './SharedComponents.module.css'
import { clearCache } from '../../../src/api/axios';

const ListaOpciones = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('usuario')
        try { clearCache() } catch { /* ignore */ }
        navigate('/')
    }

    return (
        <div className={"list-group d-flex flex-column " + styles.ListaOpciones}>
            <Link to="/req22" className={styles.ListItem}>Usuarios</Link>
            <Link to="/req18" className={styles.ListItem}>Juegos</Link>
            <Link to="/req24" className={styles.ListItem}>Noticias</Link>
            <Link to="/reqs_21_and_23" className={styles.ListItem}>Estadísticas</Link>
            <button onClick={handleLogout} className={styles.ListItem + " " + styles.ItemFinal}>
                Cerrar sesión
            </button>
        </div>
    )
}

export default ListaOpciones