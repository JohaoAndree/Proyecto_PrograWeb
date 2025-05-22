import BarraLateral from "../../Reqs_Fabiana/Shared_Components/BarraLateral";
import CuerpoPagina from './Components/CuerpoPagina';

const Req17 = () => {
  return (
    <div className="container-fluid d-flex min-vh-100">
      <div className="row flex-grow-1 w-100">
        <div className="col-md-3 col-sm-4 px-0">
          <BarraLateral />
        </div>
        <div className="col-md-9 col-sm-8 px-0 d-flex flex-column">
          <CuerpoPagina />
        </div>
      </div>
    </div>
  )
}

export default Req17
