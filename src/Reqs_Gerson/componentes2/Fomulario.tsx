import { useState, useEffect } from "react";

interface Props {
  onSubmit: (texto: string) => void;
  valorInicial: string | null;
}

const Formulario = ({ onSubmit, valorInicial }: Props) => {
  const [texto, setTexto] = useState("");

  useEffect(() => {
    setTexto(valorInicial || "");
  }, [valorInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (texto.trim()) {
      onSubmit(texto);
      setTexto("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        className="form-control"
        placeholder="Escribe una noticia"
      />
      <button className="btn btn-primary mt-2" type="submit">
        {valorInicial ? "Guardar cambios" : "Agregar noticia"}
      </button>
    </form>
  );
};

export default Formulario;
