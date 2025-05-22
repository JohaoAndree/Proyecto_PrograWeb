import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Req7 from "./Reqs_Gerson/req7/req7";
import Req8 from "./Reqs_Gerson/req8/req8";
import Req25 from "./Reqs_Gerson/req25";
import AppVeremos from "./Reqs_Gerson/req_veremos/App";
import Req3 from "./Reqs_Gerson/req3/req3"; // ✅ Importa tu componente Req3

import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1 style={{ color: "white", textAlign: "center" }}>Página de Inicio</h1>} />
        <Route path="/req7" element={<Req7 />} />
        <Route path="/req8" element={<Req8 />} />
        <Route path="/veremos/*" element={<AppVeremos />} />
        <Route path="/juegos/mas-vendidos" element={<Req7 />} />
        <Route path="/juegos/mas-populares" element={<Req8 />} />
        <Route path="/noticias" element={<Req25 />} />
        <Route path="/registro" element={<Req3 />} /> {/* ✅ Nueva ruta para ver Req3 */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

