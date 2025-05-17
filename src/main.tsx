import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Req21 from './Reqs_Johao/Req_21';
import Req22 from './Reqs_Johao/Req_22';
import Req23 from './Reqs_Johao/Req_23';
import Req24 from './Reqs_Johao/Req_24';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página de inicio del proyecto</h1>} />
        <Route path="/req21" element={<Req21 />} />
        <Route path="/req22" element={<Req22 />} />
        <Route path="/req23" element={<Req23 />} />
        <Route path="/req24" element={<Req24 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
