import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import StatCard from './StatCard';
import Grafico from './Grafico';
import { contarUsuarios, obtenerGanancias, obtenerNoticias, contarVentas } from '../../../api/usuarios.api';
import axios from 'axios';
import { FaUsers, FaGamepad, FaNewspaper, FaShoppingCart } from 'react-icons/fa';
import { SkeletonCard } from '../../../Shared/Components/SkeletonView';

interface GananciaApi {
  mes: string;
  total: number;
}

const CuerpoPagina = () => {
  const [stats, setStats] = useState({
    usuarios: 0,
    juegos: 0,
    noticias: 0,
    ventas: 0
  });
  const [ganancias, setGanancias] = useState<number[]>([]);
  const [meses, setMeses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    const cargarTodo = async () => {
      try {
        setIsLoading(true);
        // Multi-fetching paralos KPIs
        const [resUsers, resNoticias, resJuegos, resGanancias, resVentasCount] = await Promise.all([
          contarUsuarios(),
          obtenerNoticias(),
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/juegos`),
          obtenerGanancias(),
          contarVentas()
        ]);

        if (ignore) return;

        // Procesar KPIs
        setStats({
          usuarios: resUsers,
          noticias: resNoticias.length,
          juegos: resJuegos.data.filter((j: { estado: boolean }) => j.estado === true).length,
          ventas: resVentasCount
        });

        // Procesar Gráfico
        const datos: GananciaApi[] = resGanancias;
        const mesesFormateados: string[] = datos.map((item: GananciaApi) => {
          const fecha = new Date(item.mes + '-01');
          const nombreMes = fecha.toLocaleString('es-PE', { month: 'short' });
          return `${nombreMes.charAt(0).toUpperCase()}${nombreMes.slice(1)}`;
        });

        setGanancias(datos.map(d => d.total));
        setMeses(mesesFormateados);
      } catch (error) {
        console.error('Error al cargar dashboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarTodo();
    return () => { ignore = true; };
  }, []);

  return (
    <div className={styles.CuerpoPagina}>
      {/* KPI Section */}
      <div className={styles.KPI_Grid}>
        {isLoading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <>
            <StatCard label="Usuarios" value={stats.usuarios} icon={<FaUsers />} />
            <StatCard label="Juegos" value={stats.juegos} icon={<FaGamepad />} />
            <StatCard label="Noticias" value={stats.noticias} icon={<FaNewspaper />} />
            <StatCard label="Ventas" value={stats.ventas} icon={<FaShoppingCart />} />
          </>
        )}
      </div>

      {/* Chart Section */}
      <div className={styles.ChartWrapper}>
        <div className={styles.ChartHeader}>
          <h2 className={styles.ChartTitle}>Desempeño Mensual</h2>
        </div>
        <div className={styles.Grafico}>
          {isLoading ? (
            <div style={{ padding: '2rem', height: '300px' }}> {/* Placeholder simple para el gráfico */}
              <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem' }} />
            </div>
          ) : (
            <Grafico
              titulo="Ganancias Proyectadas (S/.)"
              ganancias={ganancias}
              meses={meses}
              tituloX="Periodo"
              tituloY="Ingresos"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CuerpoPagina;