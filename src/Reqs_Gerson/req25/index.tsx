import BarraLateral from "../../Reqs_Gerson/Shared_components/BarraLateral";
import CuerpoPagina from "./componentes25/CuerpoPagina";

const Req25 = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "250px" }}>
        <BarraLateral />
      </div>
      <div style={{ flex: 1, padding: "20px" }}>
        <CuerpoPagina />
      </div>
    </div>
  );
};

export default Req25;
