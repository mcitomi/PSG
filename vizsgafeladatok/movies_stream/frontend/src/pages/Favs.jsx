import { Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default () => {
    const [movies, setMovies] = useState([]);

  
    async function getMovies() {
        try {
            const response = await fetch("http://localhost:3030/favourite", {
                headers: {
                    "authorization" : "Bearer " + localStorage.getItem("token")
                }
            });

            if(!response.ok) {
                alert("Valami hiba történt a filmek lekérdezésekor");
            }

            const body = await response.json()
            setMovies(body);

        } catch (error) {
            console.log(error);
        }
    }

    async function deleteFromFavs(id) {
        try {
            const response = await fetch(`http://localhost:3030/favourite/${id}`, {
                method: "delete",
                headers: {
                    "authorization" : "Bearer " + localStorage.getItem("token")
                }
            });

            if(!response.ok) {
                alert("Valami hiba történt!");
            } else {
                getMovies();
                alert("Sikeresen törölve!");
            }

            const body = await response.json();

            console.log(body);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMovies();
        
    }, []);

    return (
        <>
            <h1 className="text-center">Kedvencek</h1>
            <div>
                {movies.length < 1 && <h3 className="text-center my-3">Nincsenek lájkolt filmjeid!</h3>}
                {
                    movies.map((movie, i) => {
                        return (
                            <Card style={{ width: '18rem' }} className="text-center m-3" key={i}>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{movie.director}</Card.Subtitle>
                                    <Card.Text>{movie.price} Ft.</Card.Text>
                                    <Button size="sm" variant="danger" onClick={() => deleteFromFavs(movie.movies_id)}>Eltávolítás</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}