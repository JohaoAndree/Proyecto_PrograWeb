import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reqs_21_and_23 from './Reqs_Johao/Reqs_21_and_23';
import Req22 from './Reqs_Johao/Req_22';
import Req24 from './Reqs_Johao/Req_24';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Necesario para que el carrusel funcione

// Layout principal con Header
import LayoutConHeader from './Reqs_Fabiana/Req_Veremos/Componentes/LayoutConHeader';

// Página principal
import PaginaPrincipal from './Reqs_Fabiana/Req_Veremos/PaginaPrincipal';

// Requerimientos de Fabiana
import Req2 from "./Reqs_Diego/Req_2/index"; // Ajusta la ruta si es diferente
import Req1 from './Reqs_Fabiana/Req_01';

import Req10 from './Reqs_Fabiana/Req_10_11/Carrito'; // Carrito de compras
import Req11 from './Reqs_Fabiana/Req_11';
import Req17 from './Reqs_Fabiana/Req_17';
import Req18 from './Reqs_Fabiana/Req_18';
import Req9 from './Reqs_Fabiana/Req_9/Req9'; // Lista de Juegos
import Noticias from './Reqs_Fabiana/Req_Veremos/Paginas/Noticias';

// Requerimientos de Gerson
import Req7 from './Reqs_Gerson/req7/req7'; // Juegos más vendidos
import Req8 from './Reqs_Gerson/req8/req8'; // Juegos más populares

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutConHeader />}>
          <Route path="/" element={<PaginaPrincipal />} />

          {/* Rutas de navegación principal */}
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/carrito" element={<Req10 />} />
          <Route path="/usuario" element={<Req1 />} />
          <Route path="/registro" element={<Req2 />} />

          {/* Secciones de juegos */}
          <Route path="/juegos" element={<Req7 />} /> {/* Vista general o más vendidos */}
          <Route path="/juegos/mas-vendidos" element={<Req7 />} />
          <Route path="/juegos/mas-populares" element={<Req8 />} />
          <Route path="/juegos/lista" element={<Req9 />} />
        </Route>

        {/* Rutas independientes sin header */}
        <Route path="/req1" element={<Req1 />} />
        <Route path="/req11" element={<Req11 />} />
        <Route path="/req17" element={<Req17 />} />
        <Route path="/req18" element={<Req18 />} />
        <Route path="/reqs_21_and_23" element={<Reqs_21_and_23 />} />
        <Route path="/req22" element={<Req22 />} />
        <Route path="/req24" element={<Req24 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);