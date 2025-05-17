import { useState } from "react";
import ListaNoticias from "./componentes2/ListaNoticias";
import Formulario from "./componentes2/Fomulario";
import "./componentes2/Global2.css";

const Req25 = () => {
  const [noticias, setNoticias] = useState<string[]>([]);
  const [noticiaEditando, setNoticiaEditando] = useState<string | null>(null);

  const agregarNoticia = (texto: string) => {
    if (noticiaEditando !== null) {
      setNoticias(noticias.map((n) => (n === noticiaEditando ? texto : n)));
      setNoticiaEditando(null);
    } else {
      setNoticias([...noticias, texto]);
    }
  };

  const eliminarNoticia = (texto: string) => {
    setNoticias(noticias.filter((n) => n !== texto));
  };

  const editarNoticia = (texto: string) => {
    setNoticiaEditando(texto);
  };

  return (
    <div className="pagina">
      <div className="container mt-4">
        <h2 className="titulo-blanco">Gestión de Noticias</h2>
        <Formulario onSubmit={agregarNoticia} valorInicial={noticiaEditando} />
        <ListaNoticias
          noticias={noticias}
          onEliminar={eliminarNoticia}
          onEditar={editarNoticia}
        />
      </div>
    </div>
  );
};

export default Req25;
