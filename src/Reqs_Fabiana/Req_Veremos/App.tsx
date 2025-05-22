import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Juegos from "../Req_9/Req9"; // O "./Paginas/Juegos" si lo renombraste
import Header from "./Componentes/Header";
import Carrito from "./Paginas/Carrito";
import Inicio from "./Paginas/Inicio";
import Noticias from "./Paginas/Noticias";
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
