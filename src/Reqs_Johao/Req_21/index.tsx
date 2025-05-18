import BarraLateral from './Components/BarraLateral'
import CuerpoPagina from './Components/CuerpoPagina'
/* import styles from './styles.module.css' */

const Req21 = () => {
  return <div className="container-fluid px-0">
    <div className="row">
      <div className="col-md-3 px-0">
        <BarraLateral />
      </div>
      <div className="col-md-9 px-0">
        <CuerpoPagina />
      </div>
    </div>
  </div>
}

export default Req21