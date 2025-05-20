import { useEffect } from "react";
import { useState } from "react";
import { Card } from "react-bootstrap";
export default () => {
    const [cars, setCars] = useState([]);

    async function fetchCars() {
        try {
            const response = await fetch("http://localhost:3030/cars");

            if (!response.ok) {
                alert("Failed to fetch")
            } else {
                const body = await response.json();
                setCars(body.cars)
            }
        } catch (error) {
            alert("Something went wrong")
        }
    }

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <>
            {
                cars.map((car, i) => {
                    return <Card style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>{car.manufacturer}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{car.model}</Card.Subtitle>
                            <Card.Text>
                                {car.price}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                })
            }
        </>
    )
}