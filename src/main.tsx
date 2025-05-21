import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Necesario para que el carrusel funcione

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutConHeader from './Reqs_Fabiana/Req_Veremos/Componentes/LayoutConHeader';

import PaginaPrincipal from './Reqs_Fabiana/Req_Veremos/PaginaPrincipal';

// Componentes de requerimientos
import Req1 from './Reqs_Fabiana/Req_01';
import Req11 from './Reqs_Fabiana/Req_11';
import Req17 from './Reqs_Fabiana/Req_17';
import Req18 from './Reqs_Fabiana/Req_18';
import Req9 from './Reqs_Fabiana/Req_9/Req9';

import Noticias from './Reqs_Fabiana/Req_Veremos/Paginas/Noticias';
import Carrito from './Reqs_Fabiana/Req_Veremos/Paginas/Carrito';
import Usuario from './Reqs_Fabiana/Req_Veremos/Paginas/Usuario';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Todo lo que esté dentro hereda el header */}
        <Route element={<LayoutConHeader />}>
          <Route path="/" element={<PaginaPrincipal />} />
          <Route path="/juegos" element={<Req9 />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/usuario" element={<Usuario />} />
        </Route>

        {/* Estas rutas son independientes y no tendrán header */}
        <Route path="/req1" element={<Req1 />} />
        <Route path="/req11" element={<Req11 />} />
        <Route path="/req17" element={<Req17 />} />
        <Route path="/req18" element={<Req18 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

