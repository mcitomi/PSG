import { Card } from "react-bootstrap";

export default ({name, price, color}) => {
    return (
        <Card className="m-3" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {price} Ft.
                    Színe: {color}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}