import { Button, Form, Container } from "react-bootstrap";

export default () => {
    return (
        <Container>
            <Form>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" placeholder="unique username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}