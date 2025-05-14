import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default () => {
    return (
        <>
            <Container className="topBar">
                <span className="floatR"><img src="https://www.sysweb.hu/img/en.png" alt="lang" style={{ width: "25px" }} /></span>
                <span className="floatR"><FontAwesomeIcon className="mx-2" icon={faEnvelope} style={{ color: "#1A76D1", }} /><a href="mailto:office@sysweb.hu">office@sysweb.hu</a></span>
            </Container>

            <Navbar expand="md" sticky="top" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home"><Image className="brand" src="https://www.sysweb.hu/img/sysweb_logo.jpg" fluid /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Főoldal</Nav.Link>
                            <Nav.Link href="#link">Kapcsolat</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    )
}