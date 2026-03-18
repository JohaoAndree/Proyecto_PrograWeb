import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGamepad, FaHome, FaNewspaper, FaShoppingCart, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import styles from "./Header.module.css";
import { clearCache } from '../../../api/axios';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  // Detectar scroll para efecto de sombra
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cerrarSesion = () => {
    // Remove local user and clear cached responses tied to session
    localStorage.removeItem("usuario");
    try { clearCache(); } catch { /* ignore */ }
    navigate("/");
  };

  // Helper para determinar si una ruta está activa
  const isActive = (path: string) => location.pathname === path;
  const isJuegosActive = location.pathname.startsWith("/juegos");

  const navLinkClass = (path: string) =>
    `${styles.navLink} ${isActive(path) ? styles.navLinkActive : ""}`;

  return (
    <Navbar
      expand="lg"
      className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.brand}>
          <FaGamepad className={styles.brandIcon} />
          GameStore
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={navLinkClass("/")}>
              <FaHome className={styles.linkIcon} />
              Inicio
            </Nav.Link>

            <NavDropdown
              title={
                <span>
                  <FaGamepad className={styles.linkIcon} /> Juegos
                </span>
              }
              id="juegos-dropdown"
              className={`${styles.dropdown} ${isJuegosActive ? styles.dropdownActive : ""}`}
            >
              <NavDropdown.Item as={Link} to="/juegos/mas-vendidos">
                Más vendidos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/juegos/mas-populares">
                Más populares
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/juegos/lista">
                Lista de juegos
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/noticias" className={navLinkClass("/noticias")}>
              <FaNewspaper className={styles.linkIcon} />
              Noticias
            </Nav.Link>

            <Nav.Link as={Link} to="/carrito" className={navLinkClass("/carrito")}>
              <FaShoppingCart className={styles.linkIcon} />
              Carrito
            </Nav.Link>

            {usuario ? (
              <Nav.Link onClick={cerrarSesion} className={styles.logoutBtn}>
                <FaSignOutAlt className={styles.linkIcon} />
                Cerrar sesión
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/usuario" className={navLinkClass("/usuario")}>
                <FaSignInAlt className={styles.linkIcon} />
                Acceder
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
