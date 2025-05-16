import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
export default () => {
    const token = localStorage.getItem("token");

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/" >Webshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Főoldal</Nav.Link>
                            {!token && <Nav.Link as={Link} to="/login">Bejelentkezés</Nav.Link>}
                            {!token && <Nav.Link as={Link} to="/register">Regisztráció</Nav.Link>}
                            {token && <Nav.Link as={Link} to="/games">Saját játékaim</Nav.Link>}
                            {token && <Nav.Link as={Link} to="/logout">Kijelentkezés</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}