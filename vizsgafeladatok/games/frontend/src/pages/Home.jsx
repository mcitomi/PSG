import { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
export default () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch("http://localhost:3030/games");

                const body = await response.json();

                if (!response.ok) {
                    alert("Sikertelen lekérdezés");
                } else {
                    setGames(body.games);
                }
            } catch (error) {
                console.log(error);

            }
        }

        fetchGames();
    }, []);

    return (
        <>
            <Container>
                {!games.length && <h3>Betöltés...</h3>}
                {
                    games.map((game, i) => {
                        return <Card style={{ width: '18rem' }} key={i} className="m-3">
                            <Card.Body>
                                <Card.Title>{game.name}</Card.Title>
                                <Card.Text>
                                    {game.developer}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    })
                }
            </Container>
        </>
    )
}