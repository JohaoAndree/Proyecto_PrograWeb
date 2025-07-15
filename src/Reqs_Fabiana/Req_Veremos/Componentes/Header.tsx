import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // 👇 Leer directamente del localStorage en cada render
  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/"); // redirigir a inicio
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">DieguitoStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>

            <NavDropdown title="Juegos" id="juegos-dropdown">
              <NavDropdown.Item as={Link} to="/juegos/mas-vendidos">
                Juegos más vendidos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/juegos/mas-populares">
                Juegos más populares
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/juegos/lista">
                Lista de Juegos
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/carrito">Carrito de compras</Nav.Link>

            {/* ✅ Mostrar Acceder o Cerrar sesión según si hay usuario */}
            {usuario ? (
              <Nav.Link onClick={cerrarSesion}>Cerrar sesión</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/usuario">Acceder</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
