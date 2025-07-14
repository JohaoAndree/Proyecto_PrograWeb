import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import CuadroConteoUsuarios from './CuadroConteoUsuarios';
import Titulo from '../../Shared_Components/Titulo';
import Grafico from './Grafico';
import { contarUsuarios, obtenerGanancias } from '../../../api/usuarios.api';

interface GananciaApi {
  mes: string;
  total: number;
}

const CuerpoPagina = () => {
  const titulo = "Estadísticas";
  const [contador, setContador] = useState<number>(0);
  const [ganancias, setGanancias] = useState<number[]>([]);
  const [meses, setMeses] = useState<string[]>([]);

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const total = await contarUsuarios();
        const datos: GananciaApi[] = await obtenerGanancias();

        const mesesFormateados: string[] = datos.map((item: GananciaApi) => {
            const fecha = new Date(item.mes + '-01');
            const nombreMes = fecha.toLocaleString('es-PE', { month: 'long' });
            const anio = fecha.getFullYear();
            return `${nombreMes.charAt(0).toUpperCase()}${nombreMes.slice(1)} ${anio}`;
        });

        const valoresGanancia: number[] = datos.map((item: GananciaApi) => item.total);

        setContador(total);
        setGanancias(valoresGanancia);
        setMeses(mesesFormateados);
      } catch (error) {
        console.error('Error al cargar estadísticas:', error);
      }
    };

    cargarEstadisticas();
  }, []);

  return (
    <div className={"flex-grow-1 " + styles.CuerpoPagina}>
      <Titulo texto={titulo} />
      <CuadroConteoUsuarios numero={contador} />
      <Grafico
        titulo="Ganancias de los últimos 12 meses"
        ganancias={ganancias}
        meses={meses}
        tituloX="Meses"
        tituloY="Ganancias ($)"
      />
    </div>
  );
};

export default CuerpoPagina;