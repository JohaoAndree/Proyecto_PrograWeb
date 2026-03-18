import BarraLateral from "../../Reqs_Johao/Shared_Components/BarraLateral"
import CuerpoPagina from './Components/CuerpoPagina'

const Req18 = () => {
  return (
    <div className="container-fluid vh-100 px-0" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
      <div className="row h-100 flex-nowrap m-0" style={{ minWidth: '1000px' }}>
        <div className="col-3 px-0 h-100">
          <BarraLateral />
        </div>
        <div className="col-9 px-0 h-100 d-flex flex-column">
          <CuerpoPagina />
        </div>
      </div>
    </div>
  )
}

export default Req18
