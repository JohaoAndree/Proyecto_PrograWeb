import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">GameZone</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/juegos" className="nav-link">Juegos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/noticias" className="nav-link">Noticias</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/carrito" className="nav-link">Carrito de compras</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/usuario" className="nav-link">Usuario</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
