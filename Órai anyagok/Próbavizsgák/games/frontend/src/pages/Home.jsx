import React, { useState, useEffect } from "react";

// lekérdezi a játékokat -> megjeleníti őket kártyákban

export default function Home() {
    const [games, setGames] = useState([]);

    // START: oldal betöltésénél szeretnénk lekérdezni
    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch("http://localhost:3001/games");

                const data = await response.json();

                if (!response.ok) {
                    alert(`Nem sikerült lekérdezni a játékokat: ${data.message}`);
                } else {
                    setGames(data.games);
                }
            } catch (err) {
                console.log(err);
                alert("Nem sikerült lekérdezni a játékokat.");
            }
        }

        fetchGames();
    }, []);
    // END

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                    {games ? games.map((game) => {
                        return (
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{game.name}</h5>
                                    <p className="card-text">{game.developer}</p>
                                </div>
                            </div>
                        );
                    }) : "Betöltés..."}
                </div>
            </div>
        </div>
    );
}