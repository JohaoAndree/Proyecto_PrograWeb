import { useAdmin } from '../../Context/AdminContext'
import styles from './SharedComponents.module.css'
import ListaOpciones from './ListaOpciones'
import PerfilAdmin from './PerfilAdmin'
import AvatarPlaceholder from "../Resources/Avatar.jpeg"

const BarraLateral = () => {
    const { admin } = useAdmin();

    return (
        <div className={styles.BarraLateral}>
            <PerfilAdmin 
                src={admin.foto || AvatarPlaceholder} 
                alt="Admin Avatar" 
                nombre={admin.nombre} 
            />
            <ListaOpciones />
        </div>
    )
}

export default BarraLateral