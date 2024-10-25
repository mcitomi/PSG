// import használata a require "varázsfüggvény" helyett
import { createPool } from "mysql2/promise";    // /promise használata, async függvény híváshoz szükséges
import { application, json } from "express";    // így elég csak a szükséges dolgokat beimportálni, nem kell létrehozni app constanst, elég importálni
import { PORT } from "../cfg.json"; // konfiguráció létrehozása

application.use(json());    // json body-k használatához meghívjuk az express json modulját az app-ban

// createConnection vs. connectionPool 
// A pool egyszerre több kérést képes futtatni egy időben

const pool = createPool({   
    host: "localhost",  
    user: "root",
    password: "",   // nincs jelszó alapból a xampp szerveren, de kell átadni neki egy üres stringet másképp error
    database: "teaching_site"
});

application.get("/teachers", async (req, res) => {  // megadjuk az arrow func.-nek hogy async legyen
    // const [results] = await pool.query()
});

application.listen(PORT, () => {
    console.info(`Server started on port ${PORT}!`);
});