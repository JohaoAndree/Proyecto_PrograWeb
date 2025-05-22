import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Componentes/Header";
import Inicio from "./Paginas/Inicio";
import Juegos from "../Req_9/Req9"
import Noticias from "./Paginas/Noticias";
import Carrito from "./Paginas/Carrito";
import Usuario from "./Paginas/Usuario";

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/usuario" element={<Usuario />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;