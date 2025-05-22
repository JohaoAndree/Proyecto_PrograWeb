import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Req7 from "./Reqs_Gerson/req7/req7";
import Req8 from "./Reqs_Gerson/req8/req8";
import Req25 from "./Reqs_Gerson/req25";
import Editar from "./Reqs_Gerson/req25/componentes25/Editar";


import AppVeremos from "./Reqs_Gerson/req_veremos/App";

// 🚨 Asegúrate que esta ruta sea correcta según tu proyecto
import CuerpoPagina from "./Reqs_Gerson/req25/componentes25/CuerpoPagina";


import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/noticias" element={<Req25 />} />
        <Route path="/" element={<h1 style={{ color: "white", textAlign: "center" }}>Página de Inicio</h1>} />
        <Route path="/req7" element={<Req7 />} />
        <Route path="/req8" element={<Req8 />} />
        <Route path="/veremos/*" element={<AppVeremos />} />
        <Route path="/juegos/mas-vendidos" element={<Req7 />} />
        <Route path="/juegos/mas-populares" element={<Req8 />} />
        <Route path="/noticias" element={<Req25 />} />
        <Route path="/editar/:id" element={<Editar />} />


        {/* ✅ Nueva ruta para ver tu página de noticias */}
        <Route path="/noticias" element={<CuerpoPagina />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
