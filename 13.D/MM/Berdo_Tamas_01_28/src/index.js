import Express, { json } from "express";
import { createPool } from "mysql2/promise";

const PORT = 3002;

const app = Express();

app.use(json());

const pool = createPool({
    password: "",
    user: "root",
    database: "streaming"
});

app.get("/movies", async (req, res) => {
    try {
        const [queryResults, ] = await pool.query("SELECT * FROM movies");

        res.json(queryResults);
    } catch (error) {
        res.status(500).json({
            "message" : error.message
        });
    }
});

app.post("/movies", async (req, res) => {
    const errors = [];
    try {
        const body = req.body;

        if(!body || Object.keys(body).length !== 4) {
            errors.push("Hibás törzs! Ellenőrizze a bemeneti mezőket (title, director, release_year, views)");
        }

        if(!body.title || typeof(body.title) !== "string") {
            errors.push("A 'title' mező hibás tipusú vagy nem létezik!");
        }

        if(!body.director || typeof(body.director) !== "string") {
            errors.push("A 'director' mező hibás tipusú vagy nem létezik!");
        }

        if(!body.release_year || typeof(body.release_year) !== "number") {
            errors.push("A 'release_year' mező hibás tipusú vagy nem létezik!");
        }

        if(!body.views || typeof(body.views) !== "number") {
            errors.push("A 'views' mező hibás tipusú vagy nem létezik!");
        }

        if(errors.length !== 0) {
            res.status(400).json({
                "message" : errors
            });
            return;
        }

        const [insertResults, ] = await pool.query(
            "INSERT INTO movies (title, director, release_year, views) VALUES (?, ?, ?, ?);",
            [body.title, body.director, body.release_year, body.views]
        );

        if(insertResults.affectedRows !== 1) {
            throw new Error("Nem sikerült futtatni az sql lekérdezést!");
        }

        res.status(201).json({
            "message" : "Film sikeresen feltöltve!"
        });
        
    } catch (error) {
        res.status(500).json({
            "message" : error.message
        });
    }
});

app.patch("/movies/:id/views", async (req, res) => {
    try {
        const movieId = Number.parseInt(req.params.id);

        if(isNaN(movieId) || movieId < 0) {
            throw new Error("Hibás film azonosító!");
        }

        const [queryResults, ] = await pool.query(
            "SELECT views FROM movies WHERE id = ?;", 
            [movieId]
        );

        if(queryResults.length == 0) {
            res.status(404).json({
                "message" : "Nem található ilyen azonosítóval rendelkező film!"
            });
            return;
        }

        const [updateResults, ] = await pool.query(
            "UPDATE movies SET views= ? WHERE id = ?;", 
            [queryResults[0].views + 1, movieId]
        );

        if(updateResults.affectedRows !== 1) {
            throw new Error("Nem sikerült futtatni az sql lekérdezést!");   
        }

        res.status(200).json({
            "message" : "Sikeresen növelte a megtekintések számát!"
        });
        
    } catch (error) {
        res.status(500).json({
            "message" : error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`A szerver elindult a http://localhost:${PORT}/ címen.`); 
});