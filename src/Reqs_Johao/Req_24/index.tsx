import BarraLateral from '../Shared_Components/BarraLateral'
import CuerpoPagina from './Components/CuerpoPagina'

const Req24 = () => {
  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="col-md-3 col-sm-4 px-0 h-100">
          <BarraLateral />
        </div>
        <div className="col-md-9 col-sm-8 px-0 h-100 d-flex flex-column">
          <CuerpoPagina />
        </div>
      </div>
    </div>
  )
}

export default Req24