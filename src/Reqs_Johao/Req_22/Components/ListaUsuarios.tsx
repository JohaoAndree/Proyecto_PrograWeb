import styles from "./styles.module.css"

export interface Usuario {
    id: number
    foto: string
    nickname: string
    nombre: string
    pais: string
}

interface PropsListaUsuarios {
    data: Usuario[]
}

const ListaUsuarios = (props: PropsListaUsuarios) => {
    return (
        <div className={styles.TableWrapper}>
            <table className={styles.AdminTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Perfil</th>
                        <th>Nickname</th>
                        <th>Nombre</th>
                        <th>País</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((usuario: Usuario) => (
                        <tr key={usuario.id}>
                            <td className={styles.IdCol}>#{usuario.id}</td>
                            <td>
                                <img
                                    src={usuario.foto}
                                    alt={usuario.nombre}
                                    className={styles.UserAvatar}
                                />
                            </td>
                            <td className={styles.NicknameCol}>{usuario.nickname}</td>
                            <td className={styles.NombreCol}>{usuario.nombre}</td>
                            <td>
                                <span className={styles.PaisBadge}>{usuario.pais}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaUsuarios