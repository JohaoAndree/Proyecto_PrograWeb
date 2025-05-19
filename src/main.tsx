import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Req2 from "./Reqs_Diego/Req_2"
import Req9 from "./Reqs_Diego/Req_9"
import Req10 from "./Reqs_Diego/Req_10"
import Req12 from "./Reqs_Diego/Req_12"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Página de inicio del proyecto</h1>} />
        <Route path="/req2" element={<Req2 />} />
        <Route path="/req9" element={<Req9 />} />
        <Route path="/req10" element={<Req10 />} />
        <Route path="/req12" element={<Req12 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
