// import használata a require "varázsfüggvény" helyett
import { createPool } from "mysql2/promise";    // /promise használata, async függvény híváshoz szükséges
import express from "express";    // így elég csak a szükséges dolgokat beimportálni pl. az mysql2 modulnál

const PORT = 3000;  // port létrehozása

const app = express();  // app létrehozása

app.use(express.json());    // json body-k használatához meghívjuk az express json modulját az app-ban

// createConnection vs. connectionPool 
// A pool egyszerre több kérést képes futtatni egy időben

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",   // nincs jelszó alapból a xampp szerveren, de kell átadni neki egy üres stringet másképp error
    database: "teaching_site"
});

app.get("/teachers", async (req, res) => {  // megadjuk az arrow func.-nek hogy async legyen
    try {
        const name = req.query.name;

        let results;

        if (!name) {
            [results,] = await pool.query("SELECT * FROM teachers;");
            // az értéket átadjuk a results változónak, a FieldPacketet eldobjuk
        } else {
            if (typeof name == "string") {
                [results,] = await pool.query("SELECT * FROM teachers WHERE name LIKE ?;", [`%${name}%`]);  // % like kereséshez
            } else {
                throw new Error("Parameter error: 'name' must be a string.");  // custom error
            }
        }

        res.json(results);

    } catch (error) {
        if (error.message.includes("Parameter error")) {    // ellenőrizzük hogy a mi hibánkat dobtuk-e
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({  // minden mas hiba kezelése "Fallback" válasz
            "message": "Internal server error, couldn't query teachers"
        });
    }
});

app.get("/teachers/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);   // útvonal paraméter lekerese

        if (isNaN(id)) { // ha a parseInt nem számot kapott, Nan (Not a Number) az értéke
            throw new Error("Parameter error: 'id' must be a valid integer.");
        }

        if (id < 0) {
            throw new Error("Parameter error: 'id' must be greater than 0.");
        }

        const [results,] = await pool.query("SELECT * FROM teachers WHERE id = ?", [id]);

        res.json(results);

    } catch (error) {
        if (error.message.includes("Parameter error")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        // Fallback
        res.status(500).json({
            "message": "Something went wrong!"
        });
    }
});

app.get("/courses", async (req, res) => {
    try {
        const teacherId = parseInt(req.query.teacher);

        if (teacherId && isNaN(teacherId)) {
            throw new Error("Parameter error: Invalid teacher parameter, must be a number!");
        }

        if (teacherId < 0) {
            throw new Error("Parameter error: Teacher id must be a positive number!");
        }

        let results;

        if (teacherId) {
            [results,] = await pool.query(`
                SELECT courses.id, courses.name, description, length, teachers.name as 'teacher' 
                FROM courses 
                INNER JOIN teachers ON teachers.id = courses.teacher_id
                WHERE teachers.id = ?;
            `, [teacherId]);
        } else {
            [results,] = await pool.query(`
                SELECT courses.id, courses.name, description, length, teachers.name as 'teacher' 
                FROM courses 
                INNER JOIN teachers ON teachers.id = courses.teacher_id;
            `);
        }

        res.json(results);

    } catch (error) {
        if (error.message.includes("Parameter error")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Cannot query courses!"
        });
    }
});

app.post("/courses", async (req, res) => {
    try {
        const body = req.body;

        if (!body || typeof (body) !== "object" || Object.keys(body).length < 1) {
            throw new Error("Server says: Invalid body!");
        }

        if (!body.name || typeof (body.name) !== "string") {
            throw new Error("Server says: Invalid name field");
        }

        if (!body.description || typeof (body.description) !== "string") {
            throw new Error("Server says: Invalid name field");
        }

        if (!body.length || typeof (body.length) !== "number") {
            throw new Error("Server says: Invalid length field");
        }

        if (!body.teacher_id || typeof (body.teacher_id) !== "number") {
            throw new Error("Server says: Invalid teacher_id field");
        }

        const [result, ] = await pool.execute(`
            SELECT name FROM teachers WHERE id = ?;
            `,
            [body.teacher_id]
        );
        
        if(Object.keys(result).length == 0) {
            throw new Error("Server says: This teacher id do not exists!");
        }

        await pool.execute(`
            INSERT INTO courses (id, name, description, length, teacher_id) 
            VALUES (?, ?, ?, ?, ?);`, 
            ['', body.name, body.description, body.length, body.teacher_id]
        );

        res.status(201).json({
            "message" : "Course added!"
        });
        
    } catch (error) {
        if (error.message.includes("Server says")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        // Fallback
        console.log(error);

        res.status(500).json({
            "message": "Something went wrong! Couldn't insert into table!"
        });
    }
});

app.post("/teachers", async (req, res) => {
    try {
        const body = req.body;

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 2) {
            // Ellenőrizzük hogy a body létezik-e, objetum-e és a body annyi értéket tartalmaz amennyit várunk, se többet se kevesebbet.
            throw new Error("Server says: Invalid body!");
        }

        if (!body.name || typeof (body.name) !== "string") {
            throw new Error("Server says: Invalid name field");
        }

        if (!body.age || typeof (body.age) !== "number") {
            throw new Error("Server says: Invalid age field");
        }

        if (body.age < 18) {
            throw new Error("Server says: Under 18! No way :o");
        }

        const [result,] = await pool.query("INSERT INTO teachers (name, age) VALUES (?, ?) returning *;", [body.name, body.age]);

        res.status(201).json(result);

    } catch (error) {
        if (error.message.includes("Server says")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        // Fallback
        console.log(error);

        res.status(500).json({
            "message": "Something went wrong! Couldn't insert into table!"
        });
    }
});

app.listen(PORT, () => {
    console.info(`Server started on port ${PORT}!`);
});

// HF: tanarok-ra, PUT, PATCH, DELETE + Frontend cucc
// pl egy táblázat amibe lehet szerkeszteni őket

// pl discordon: message update egy PATCH
// a slashCommand update egy PUT
