import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faGlobe } from "@fortawesome/free-solid-svg-icons";

import "../styles/home.css";

export default () => {
    return (
        <>
            <Container className="mainBar" fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1>Kérdőívek LimeSurvey rendszerben a <span style={{ color: "#1a76d1" }}>SysWeb</span> szerverein</h1>
                            <small>Programozzuk kérdőívét LimeSurvey rendszerben és teljes életciklusán keresztül támogatást nyújtunk az adatok átadásáig.</small>
                            <br />
                            <Button className="previewbtn" variant="primary">Bemutató kérdőív</Button>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Container>
            <Container fluid>
                <Container>
                    <Row>
                        <Col sm={12} md={3} className="card">
                            <h2>Programozás</h2>
                            Kérdőív programozás
                            Mobilbarát kérdőív template design
                            Többnyelvű kérdőívek
                            Speciális kérdéstípusok,kérdéscsoportok
                            Speciális kérdőívek (napló, multi-blokk, conjoint,...)
                        </Col>
                        <Col sm={12} md={3} className="card">
                            <h2>Hoszting</h2>
                            Nagymintás lekérdezések támogatása
                            Extrém terhelés támogatása slave szerverekkel
                            Dedikált LimeSurvey Szerver
                            GDPR kompatibilis file szerver

                        </Col>
                        <Col sm={12} md={3} className="card">
                            <h2>Support</h2>
                            LimeSurvey telepítés
                            LimeSurvey adminisztráció
                            LimeSurvey integráció (CAWI, CAPI, TAPI)
                            LimeSurvey tréning
                            Saját domain használat
                            Php / Javascript / SQL support
                        </Col>
                    </Row>
                </Container>
                <Container style={{ textAlign: "center" }}>
                    <h1>Megoldásaink</h1>
                    <p>Jelenleg szervereinken ennyi kérdőív készül évente:</p>
                </Container>
            </Container>
            <Container fluid className="informations">
                <Container fluid className="informations-blue">
                    <Container>
                        <Row>
                            <Col className="item">
                                <Row>
                                    <Col>
                                        <FontAwesomeIcon icon={faGlobe} size="2xl" />
                                    </Col>
                                    <Col>
                                        <h3>100000</h3>
                                        <p>CAWI kérdőív</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="item">
                                <Row>
                                    <Col>
                                        <FontAwesomeIcon icon={faGlobe} size="2xl" />
                                    </Col>
                                    <Col>
                                        <h3>20000</h3>
                                        <p>CAPI kérdőív</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="item">
                                <Row>
                                    <Col>
                                        <FontAwesomeIcon icon={faGlobe} size="2xl" />
                                    </Col>
                                    <Col>
                                        <h3>5000</h3>
                                        <p>CATI kérdőív</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="item">
                                <Row>
                                    <Col>
                                        <FontAwesomeIcon icon={faGlobe} size="2xl" />
                                    </Col>
                                    <Col>
                                        <h3>23</h3>
                                        <p>év tapasztalat</p>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </Container>
            </Container>
        </>
    )
}