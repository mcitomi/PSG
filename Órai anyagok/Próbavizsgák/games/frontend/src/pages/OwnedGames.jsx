// lekérdezzük a játékokat (/owned_games) -> megjelenítjük
// DE: mindegyiknél egy gomb: töröl -> DELETE /games/:id

import React, { useState, useEffect } from "react";

export default function OwnedGames() {
    const [games, setGames] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchGames() {
            try {
                const response = await fetch("http://localhost:3001/owned_games", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

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

    // START: valamilyen eseményhez kötünk valamit
    async function deleteGame(id) {
        // DELETE /games/id
        try {
            const response = await fetch(`http://localhost:3001/games/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                alert(`Nem sikerült törölni a játékot: ${data.message}`);
            } else {
                alert("Sikerült törölni a játékot.")
            }
        } catch (err) {
            console.log(err);
            alert("Nem sikerült törölni a játékot.");
        }
    }
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
                                    <button 
                                        className="btn btn-primary" 
                                        onClick={() => deleteGame(game.id)}
                                    >
                                            Törlés
                                    </button>
                                </div>
                            </div>
                        );
                    }) : "Betöltés..."}
                </div>
            </div>
        </div>
    );
}