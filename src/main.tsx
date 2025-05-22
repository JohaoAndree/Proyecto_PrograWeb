import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import LayoutConHeader from './Reqs_Diego/Req_Test/Componentes/LayoutConHeader'
import PaginaPrincipal from './Reqs_Diego/Req_Test/PaginaPrincipal'

import Req2 from "./Reqs_Diego/Req_2"
//import Req9 from "./Reqs_Diego/Req_9/Req9"
import Noticias from './Reqs_Diego/Req_Test/Paginas/Noticias'
import Carrito from './Reqs_Diego/Req_Test/Paginas/Carrito'
//import Usuario from './Reqs_Diego/Req_Test/Paginas/Usuario'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutConHeader />}>
          <Route path="/" element={<PaginaPrincipal />} />
          {/* <Route path="juegos" element={<Req9 />} /> */}
          <Route path="/noticia" element={<Noticias />} />
          <Route path="/carrito" element={<Carrito />} />          
        </Route>
        <Route path="/req2" element={<Req2 />} />
        {/* <Route path="/req9" element={<Req9 />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
