import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Req7 from "./Reqs_Gerson/req7";
import Req25 from "./Reqs_Gerson/req25";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Req7 />} />
        <Route path="/noticias" element={<Req25 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
