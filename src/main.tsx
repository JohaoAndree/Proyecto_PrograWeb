import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Aquí importa tus componentes de requerimientos, con tu nombre y número de requerimiento
import Req1 from './Reqs_Fabiana/Req_01';
import Req11 from './Reqs_Fabiana/Req_11';
import Req17 from './Reqs_Fabiana/Req_17';
import Req18 from './Reqs_Fabiana/Req_18';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página de inicio del proyecto</h1>} />
        <Route path="/req1" element={<Req1 />} />
        <Route path="/req11" element={<Req11 />} />
        <Route path="/req17" element={<Req17 />} />
        <Route path="/req18" element={<Req18 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
