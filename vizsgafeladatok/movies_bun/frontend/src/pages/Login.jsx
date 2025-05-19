import { Form, Button, Container } from "react-bootstrap";
export default ({ setLogged }) => {
    async function handleLogin(e) {
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

            if (!response.ok) {
                alert(body.message);
            } else {
                alert(body.message);
                localStorage.setItem("token", body.token);
                setLogged(true);
            }
        } catch (error) {
            console.log(error);

            alert("Something went wrong!");
        }
    }

    return (
        <Container>
            <Form className="m-3" onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" id="username" required/>
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" id="password" required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    )
}