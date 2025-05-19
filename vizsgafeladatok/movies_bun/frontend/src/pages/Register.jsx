import { Form, Button, Container } from "react-bootstrap";
export default () => {
    async function handleRegister(e) {
        try {
            e.preventDefault();

            const response = await fetch("http://localhost:3030/register", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": document.getElementById("username").value,
                    "password": document.getElementById("password").value,
                    "email" : document.getElementById("email").value
                })
            });

            const body = await response.json();

            if (!response.ok) {
                alert(body.message);
            } else {
                alert(body.message);
            }
        } catch (error) {
            console.log(error);

            alert("Something went wrong!");
        }
    }

    return (
        <Container>
            <Form className="m-3" onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" id="username" required/>
                </Form.Group>

                 <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" id="email" required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password" required/>
                </Form.Group>

                <Button variant="success" type="submit">
                    Register
                </Button>
            </Form>
        </Container>
    )
}