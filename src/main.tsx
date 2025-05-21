import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Reqs_21_and_23 from './Reqs_Johao/Reqs_21_and_23';
import Req22 from './Reqs_Johao/Req_22';
import Req24 from './Reqs_Johao/Req_24';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página de inicio del proyecto</h1>} />
        <Route path="/reqs_21_and_23" element={<Reqs_21_and_23 />} />
        <Route path="/req22" element={<Req22 />} />
        <Route path="/req24" element={<Req24 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
