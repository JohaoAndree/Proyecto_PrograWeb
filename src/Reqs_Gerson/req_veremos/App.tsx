import { Routes, Route } from "react-router-dom";
import LayoutConHeader from "./Componentes/LayoutConHeader";
import PaginaPrincipal from "./PaginaPrincipal";
import Noticias from "./Paginas/Noticias";
import Usuario from "./Paginas/Usuario";
import Carrito from "./Paginas/Carrito";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutConHeader />}>
        <Route index element={<PaginaPrincipal />} />
        <Route path="noticias" element={<Noticias />} />
        <Route path="usuario" element={<Usuario />} />
        <Route path="carrito" element={<Carrito />} />
      </Route>
    </Routes>
  );
}

export default App;
