import BarraLateral from "../../Reqs_Johao/Shared_Components/BarraLateral"
import CuerpoPagina from './Components/CuerpoPagina'

const Req18 = () => {
  return (
    <div className="container-fluid d-flex vh-100 overflow-hidden">
      <div className="row flex-grow-1 w-100">
        <div className="col-md-3 col-sm-4 px-0 h-100">
          <BarraLateral />
        </div>
        <div className="col-md-9 col-sm-8 px-0 d-flex flex-column h-100">
          <CuerpoPagina />
        </div>
      </div>
    </div>
  )
}

export default Req18
