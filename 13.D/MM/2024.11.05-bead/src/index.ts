import express, { type Application, json } from "express";
import { createPool } from "mysql2/promise";
import { join } from "node:path";
import { www, mysql } from "../config.json"; // config adatok 

async function main() {
    const sqlPool = createPool({  // adatbázisnak az órán is hasznalt db-t használtam
        host: mysql.host,   // a configból beimportált adatok használata
        user: mysql.user,
        password: mysql.password,
        database: mysql.database
    });

    const app: Application = express(); // express app létrehozása typeokkal

    app.use(express.static(join(import.meta.dir, "..", "public"))); // frontend "hostolása"
    // https://stackoverflow.com/questions/30845416/how-to-go-back-1-folder-level-with-dirname
    // így a frontend elérhető egy hostról, így biztonságosabb és nem kell a cors package
    // a "join" funciont importáltam a node:path modulból, ezzel minden oprendszeren ugyan úgy működik az elérési út
    // az import.meta.dir egy beépített bun.sh tulajdonság, ami absolutan visszaadja a file helyét

    app.use(json()); // használjuk az express modul json funkcióját

    app.get("/api/teachers", async (req, res) => {
        try {
            const query = await sqlPool.execute("SELECT * FROM teachers;");

            res.json(query[0]); // visszaadja a lekérdezett értékeket
        } catch (error) {
            res.status(500).json({
                "message": "Nem sikerült lekérdezni a tanárok listáját"
            });
        }
    });

    app.patch("/api/teachers", async (req, res) => {
        try {
            const body = req.body;

            let sqlQuery = "UPDATE teachers SET";
            let sqlValue: string;

            if (!body || typeof (body) != "object" || Object.keys(body).length !== 2) {
                throw new Error("Hiba: Hibás törzs kérés");
            }

            if (!body.id || typeof (body.id) != "number") {
                throw new Error("Hiba: Hibás tanár azonosító");
            }

            if (body.name) {
                if (typeof (body.name) != "string" || !body.name.trim().includes(' ')) {
                    throw new Error("Hiba: A név nem megfelelő");
                }
                sqlQuery += " name = ? ";
                sqlValue = body.name;
            }

            if (body.age) {
                if (isNaN(parseInt(body.age)) || body.age < 18 || body.age > 99) {
                    throw new Error("Hiba: Invalid kor");
                }
                sqlQuery += " age = ? ";
                sqlValue = body.age;
            }

            await sqlPool.execute(`${sqlQuery}WHERE id = ?;`, [sqlValue, body.id]);

            res.json({
                "message": "Adatok sikeresen frissítve!"
            });
        } catch (error) {
            if (error.message.includes("Hiba:")) {
                res.status(400).json({
                    "message": error.message
                })
            } else {
                res.status(500).json({
                    "message": "Szerver oldai hiba!"
                });
            }
        }
    });

    app.put("/api/teachers", async (req, res) => {
        try {
            const body = req.body;

            if (!body || typeof (body) != "object" || Object.keys(body).length !== 3) {
                throw new Error("Hiba: Hibás törzs kérés");
            }

            if (!body.id || typeof (body.id) != "number") {
                throw new Error("Hiba: Hibás tanár azonosító");
            }

            if (!body.age || isNaN(parseInt(body.age)) || body.age < 18 || body.age > 99) {
                throw new Error("Hiba: Invalid kor");
            }

            if (!body.name || typeof (body.name) != "string" || !body.name.trim().includes(' ')) {
                throw new Error("Hiba: A név nem megfelelő");
            }

            await sqlPool.execute("UPDATE teachers SET name = ?, age = ? WHERE id = ?;", [body.name, parseInt(body.age), body.id]);

            res.json({
                "message": "Adatok sikeresen frissítve!"
            });

        } catch (error) {
            if (error.message.includes("Hiba:")) {
                res.status(400).json({
                    "message": error.message
                })
            } else {
                res.status(500).json({
                    "message": "Szerver oldai hiba!"
                });
            }
        }
    });

    app.delete("/api/teachers", async (req, res) => {
        try {
            const body = req.body;

            if (!body || typeof (body) != "object" || Object.keys(body).length !== 1) {
                throw new Error("Hiba: Hibás törzs kérés");
            }

            if (!body.id || typeof (body.id) != "number") {
                throw new Error("Hiba: Hibás tanár azonosító");
            }

            await sqlPool.execute("DELETE FROM teachers WHERE id = ?;", [body.id]);

            res.json({
                "message": "Adatok sikeresen törölve!"
            });
        } catch (error) {
            if (error.message.includes("Hiba:")) {
                res.status(400).json({
                    "message": error.message
                })
            } else {
                res.status(500).json({
                    "message": "Szerver oldai hiba!"
                });
            }
        }
    });

    app.post("/api/teachers", async (req, res) => {
        try {
            const body = req.body;

            if (!body || typeof (body) != "object" || Object.keys(body).length < 2) {
                throw new Error("Hiba: Hiányzó vagy hibás adatok");
            }

            if (!body.id || typeof (body.id) != "number") {
                throw new Error("Hiba: Hibás tanár azonosító");
            }

            if (!body.age || isNaN(parseInt(body.age)) || body.age < 18 || body.age > 99) {
                throw new Error("Hiba: Invalid kor");
            }

            if (!body.name || typeof (body.name) != "string" || !body.name.trim().includes(' ')) {
                throw new Error("Hiba: A név nem megfelelő");
            }

            await sqlPool.execute("INSERT INTO teachers (name, age) VALUES (?, ?);", [body.name, body.age]);

            res.json({
                "message": "Sikeresen hozzáadva!"
            });

        } catch (error) {
            if (error.message.includes("Hiba:")) {
                res.status(400).json({
                    "message": error.message
                })
            } else {
                res.status(500).json({
                    "message": "Szerver oldai hiba!"
                });
            }
        }
    });

    app.listen(www.port, () => {
        console.info(`Az express szerver elindult a ${www.port} porton.\nWeboldal elérése: http://localhost:${www.port}/`);
    });
}

main();