import { Form, Button, Container } from "react-bootstrap";

export default ({ setLogged }) => {
    async function login(e) {
        try {
            e.preventDefault();

            const response = await fetch("http://localhost:3030/bejenlentkezes", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: document.getElementById("username").value,
                    password: document.getElementById("password").value
                })
            });

            if (!response.ok) {
                throw new Error("Failed to bejenlentkezes");
            } else {
                alert("Sikeres bejenlentkezes");
                const body = await response.json();

                localStorage.setItem("token", body.token);
                setLogged(true);
            }


        } catch (error) {
            console.log(error);
            alert("Nem sikerült végrehalytani a kérést.");
        }
    }

    return (
        <Container className="m-3">
            <Form onSubmit={login}>
                <Form.Group className="mb-3">
                    <Form.Label>Felhasználónév</Form.Label>
                    <Form.Control id="username" type="text" placeholder="Felhasználónév" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Jelszavad" required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Gomb
                </Button>
            </Form>
        </Container>
    )
}