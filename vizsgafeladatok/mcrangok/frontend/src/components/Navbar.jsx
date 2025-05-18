import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default ({ logged, setLogged }) => {
    function logout() {
        localStorage.removeItem("token");
        setLogged(false);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">MC BOLT</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Főoldal</Nav.Link>
                        {!logged && <Nav.Link as={Link} to="/regisztracio">Regisztráció</Nav.Link>}
                        {!logged && <Nav.Link as={Link} to="/bejelentkezes">Bejelentkezés</Nav.Link>}
                        {logged && <Nav.Link as={Link} to="/rangom">Rangom</Nav.Link>}
                        {logged && <Nav.Link as={Link} to="/" onClick={logout}>Kijelentkezés</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}