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
                    "password" : document.getElementById("password").value,
                })
            });

            const message = (await response.json()).message;

            if(!response.ok) {
                alert("Sikertelen regisztráció: " + message);
            } else {
                alert("Sikeres regisztráció");
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
                        <Form.Label>Email cím</Form.Label>
                        <Form.Control type="email" placeholder="Írja be email címét" id="email" required/>
                        <Form.Text className="text-muted">
                            Soha nem osztjuk meg e-mail-címét másokkal.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Felhasználónév</Form.Label>
                        <Form.Control type="text" placeholder="Írja be felhasználónevét" id="username" required/>
                        <Form.Text className="text-muted">
                            Ez lesz az ön egyedi felhasználóneve.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control type="password" placeholder="Adja meg jelszavát" id="password" required/>
                    </Form.Group>
                   
                    <Button variant="primary" type="submit">
                        Regisztráció
                    </Button>
                </Form>
            </Container>
        </>
    )
}