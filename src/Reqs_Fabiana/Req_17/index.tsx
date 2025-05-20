import BarraLateral from "../../Reqs_Fabiana/Shared_Components/BarraLateral";


import CuerpoPagina from './Components/CuerpoPagina';

const Req17 = () => {
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

export default Req17
