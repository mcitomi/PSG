import { Form, Button, Container } from "react-bootstrap";

async function register(e) {
    try {
        e.preventDefault();

        const response = await fetch("http://localhost:3030/regisztracio", {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                email: document.getElementById("email").value
            })
        });

        if(!response.ok) {
            throw new Error("Failed to register");
        } else {
            alert("Sikeres regisztráció");
        }

        
    } catch (error) {
        console.log(error);
        alert("Nem sikerült végrehalytani a kérést.");
    }
}

export default () => {
    return (
        <Container className="m-3">
            <Form onSubmit={register}>
                <Form.Group className="mb-3">
                    <Form.Label>Ímélcím</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Írd be az íméled" required/>
                    <Form.Text className="text-muted">
                        Nyugi, az ímélcímedet nem adjuk oda senkinek (eskü)
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Felhasználónév</Form.Label>
                    <Form.Control id="username" type="text" placeholder="Felhasználónév" required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Jelszó</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Jelszavad" required/>
                </Form.Group> 
                
                <Button variant="primary" type="submit">
                    Gomb
                </Button>
            </Form>
        </Container>
    )
}