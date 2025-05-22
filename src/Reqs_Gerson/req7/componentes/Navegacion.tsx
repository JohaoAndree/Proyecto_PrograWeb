interface Props {
  tabActivo: string;
  setTabActivo: (tab: string) => void;
}

const Navegacion = ({ tabActivo, setTabActivo }: Props) => {
  return (
    <div className="nav nav-tabs custom-tabs">
      <li className="nav-item">
        <a
          className={`nav-link ${tabActivo === "vendidos" ? "active" : ""}`}
          href="#"
          onClick={() => setTabActivo("vendidos")}
        >
          Juegos mas vendidos
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${tabActivo === "valorados" ? "active" : ""}`}
          href="#"
          onClick={() => setTabActivo("valorados")}
        >
          Juegos mejor valorados
        </a>
      </li>
    </div>
  );
};

export default Navegacion;
