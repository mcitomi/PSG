import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default ({ logged }) => {
    const [movies, setMovies] = useState([]);

    async function addToFavs(id) {
        try {
            const response = await fetch(`http://localhost:3030/favourite/${id}`, {
                method: "post",
                headers: {
                    "authorization" : "Bearer " + localStorage.getItem("token")
                }
            });

            if(!response.ok) {
                alert("Valami hiba történt!");
            } else {
                getMovies();
                alert("Sikeresen lájkolva!");
            }

            const body = await response.json();

            console.log(body);

        } catch (error) {
            console.log(error);
        }
    }

    async function getMovies() {
        try {
            const response = await fetch("http://localhost:3030/movies");

            if(!response.ok) {
                alert("Valami hiba történt a filmek lekérdezésekor");
            }

            const body = await response.json()
            setMovies(body);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <>
            <h1 className="text-center">Kezdőlap</h1>
            <div>
                {
                    movies.map((movie, i) => {
                        return (
                            <Card style={{ width: '18rem' }} className="text-center m-3" key={i}>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{movie.director}</Card.Subtitle>
                                    {logged && <Card.Text>{movie.price} Ft.</Card.Text>}
                                    {logged && <Button size="sm" variant="primary" onClick={() => addToFavs(movie.id)}>Kedvencekhez adás</Button>}
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}