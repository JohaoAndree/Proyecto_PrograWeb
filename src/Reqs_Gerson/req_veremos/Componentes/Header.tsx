import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">GameZone</Navbar.Brand>
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
            </NavDropdown>

            <Nav.Link as={Link} to="/req25">Noticias</Nav.Link>
            <Nav.Link as={Link} to="/carrito">Carrito de compras</Nav.Link>
            <Nav.Link as={Link} to="/usuario">Usuario</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
