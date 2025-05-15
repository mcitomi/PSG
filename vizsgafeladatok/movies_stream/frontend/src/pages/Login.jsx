import { Form, Button, Container } from "react-bootstrap";

export default ({ setLogged }) => {
    async function register(e) {
        try {
            e.preventDefault();

            const response = await fetch("http://localhost:3030/login", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": document.getElementById("username").value,
                    "password": document.getElementById("password").value
                })
            });

            const body = await response.json();
            const message = body.message;

            if (!response.ok) {
                alert("Sikertelen bejelentkezés: " + message);
            } else {
                localStorage.setItem("token", body.token);
                setLogged(true);
                alert("Sikeres bejelentkezés");
            }

            console.log(message);

        } catch (error) {
            alert("Valami hiba történt!");
            console.log(error);
        }
    }

    return (
        <>
            <Container>
                <Form className="my-3" onSubmit={register}>
                    <Form.Group className="mb-3">
                        <Form.Label>Felhasználónév</Form.Label>
                        <Form.Control type="text" placeholder="Írja be felhasználónevét" id="username" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control type="password" placeholder="Adja meg jelszavát" id="password" required />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Bejelentkezés
                    </Button>
                </Form>
            </Container>
        </>
    )
}