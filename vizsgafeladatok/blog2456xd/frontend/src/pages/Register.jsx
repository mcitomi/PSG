import { Button, Form, Container } from "react-bootstrap";
import { useState } from "react";

export default () => {
    const [formValues, setFormValues] = useState({});

    async function handleRegister(e) {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/register", {
            method: "post",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify(formValues)
        });
        console.log(await response.json());
        console.log(response);

        if(response.ok) {

        }
    }

    function handleChange(e) {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    return (
        <Container>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text" name="username" value={formValues.username} onChange={handleChange} placeholder="unique username" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="dname">
                    <Form.Label>dname</Form.Label>
                    <Form.Control type="text" name="display_name" value={formValues.display_name} onChange={handleChange} placeholder="Display name" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="passwordre" value={formValues.passwordre} onChange={handleChange} placeholder="Password again" required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}