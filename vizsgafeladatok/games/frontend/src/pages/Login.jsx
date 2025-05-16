import { Form, Button, Container } from "react-bootstrap";
export default () => {
    async function login(e) {
        try {
            e.preventDefault();

            const response = await fetch("http://localhost:3030/login", {
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "username" : document.getElementById("username").value,
                    "password" : document.getElementById("password").value
                })
            });

            const body = await response.json();

            if(!response.ok) {
                alert(`Nem sikerült a bejelentkezés: ${body.message}`)
            } else {
                localStorage.setItem("token", body.token);
                alert("Sikeres bejelentkezés");
            }
        } catch (error) {
            console.log(error);
            alert("Valami hiba történt bejelentkezés közben");
        }
    }

    return (
        <Container className="my-3">
            <Form onSubmit={login}>
                <Form.Group className="mb-3">
                    <Form.Label>Felhasználónév</Form.Label>
                    <Form.Control type="text" id="username" placeholder="Felhasználónév" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Jelszó" required />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Bejelentkezés
                </Button>
            </Form>
        </Container>
    )
}