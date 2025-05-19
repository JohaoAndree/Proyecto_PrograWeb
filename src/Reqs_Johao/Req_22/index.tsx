import BarraLateral from '../Shared_Components/BarraLateral'
import CuerpoPagina from './Components/CuerpoPagina'

const Req22 = () => {
  return (
    <div className="container-fluid d-flex">
      <div className="row flex-grow-1">
        <div className="col-lg-3 px-0">
          <BarraLateral />
        </div>
        <div className="col-lg-9 px-0">
          <CuerpoPagina />
        </div>
      </div>
    </div>
  )
}

export default Req22