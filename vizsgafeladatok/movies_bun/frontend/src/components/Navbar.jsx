import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
export default ({ logged, setLogged } ) => {
    function handleLogout() {
        localStorage.removeItem("token");
        setLogged(false);
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Meow Meow</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {!logged && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                        {!logged && <Nav.Link as={Link} to="/register">Registration</Nav.Link>}
                        {logged && <Nav.Link as={Link} to="/library" >My Library</Nav.Link>}
                        {logged && <Nav.Link as={Link} to="/" onClick={handleLogout}>Logout</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}