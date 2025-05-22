import styles from './styles.module.css'
import CuadroConteoUsuarios from './CuadroConteoUsuarios'
import Titulo from '../../Shared_Components/Titulo'
import Grafico from './Grafico'

const CuerpoPagina = () => {
    const titulo = "Estadísticas"
    const contador = 250
    const titutoGrafico = "Ganancias de los últimos 12 meses"
    const ganancias = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200]
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const tituloX = "Meses"
    const tituloY = "Ganancias ($)"

    return (
        <div className={"flex-grow-1 " + styles.CuerpoPagina}>
            <Titulo texto={titulo}/>
            <CuadroConteoUsuarios numero={contador}/>
            <Grafico
                titulo={titutoGrafico}
                ganancias={ganancias}
                meses={meses}
                tituloX={tituloX}
                tituloY={tituloY}
            />
        </div>
    )
}

export default CuerpoPagina