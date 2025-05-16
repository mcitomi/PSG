import { Form, Button, Container } from "react-bootstrap";
export default () => {
    async function register(e) {
        try {
            e.preventDefault();

            const response = await fetch("http://localhost:3030/register", {
                method: "post",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "username" : document.getElementById("username").value,
                    "email" : document.getElementById("email").value,
                    "password" : document.getElementById("password").value
                })
            });

            const body = await response.json();

            if(!response.ok) {
                alert(`Nem sikerült a regisztráció: ${body.message}`)
            } else {
                alert("Sikeres regisztráció");
            }
        } catch (error) {
            console.log(error);
            alert("Valami hiba történt regisztrálás közben");
        }
    }

    return (
        <Container className="my-3">
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Email cím</Form.Label>
                    <Form.Control type="email" id="email" placeholder="Írja be az email címét" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Felhasználónév</Form.Label>
                    <Form.Control type="text" id="username" placeholder="Felhasználónév" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control type="password" id="password" placeholder="Jelszó" required />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                    Regisztráció
                </Button>
            </Form>
        </Container>
    )
}