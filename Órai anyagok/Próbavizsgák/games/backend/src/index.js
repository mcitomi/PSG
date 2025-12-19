import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";

const app = express();

const pool = mysql.createPool({
    "host": "localhost",
    "database": "games",
    "user": "testing", // "root"
    "password": "testing" // ""
});

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    try {
        /*
            {
                "username": "admin",
                "email": "admin@admin.hu",
                "password": "admin"
            }
        */

        const body = req.body;

        // ["username", "email", "password"].length 
        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body."); // 400
        }

        if (!body.username || typeof body.username !== "string") {
            throw new Error("Invalid username."); // 400
        }

        if (!body.email || typeof body.email !== "string") {
            throw new Error("Invalid email."); // 400
        }

        if (!body.password || typeof body.password !== "string") {
            throw new Error("Invalid password."); // 400
        }

        const secretPassword = await bcrypt.hash(body.password, 12);

        const [insertResult] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
            [body.username, body.email, secretPassword]
        );

        if (insertResult.affectedRows === 0) {
            throw new Error("Failed to insert user."); // 500
        }

        res.status(201).json({
            "message": "User registered."
        });
    } catch (err) {
        console.log(err);

        if (err.message.includes("Invalid")) {
            res.status(400).json({
                "message": err.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to register user."
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        /*
            {
                "username": "dominik",
                "password": "szeretemareactot"
            }
        */

        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error("Invalid body.");
        }

        if (!body.username || typeof body.username !== "string") {
            throw new Error("Invalid username.");
        }

        if (!body.password || typeof body.password !== "string") {
            throw new Error("Invalid password.");
        }

        // pool.query() -> [lekérdezésEredménye, adatokALekérdezésről]
        const [user] = await pool.query(
            "SELECT * FROM users WHERE username LIKE ?",
            [body.username]
        );

        // user -> [elsőFelhasználó, másodikFelhasználó]

        if (user.length !== 1) {
            throw new Error("Invalid username.");
        }

        // "admin", "$2a$12$cCDmcW0zBzkSaRUGrepT7.ozHczXgmOLygzAM0yKgQof6i.aXvPmC"
        const isPasswordValid = await bcrypt.compare(body.password, user[0].password);

        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }

        const token = jwt.sign({
            _id: user[0].id
        }, "secret");

        res.json({
            "token": token
        });
    } catch (err) {
        console.log(err);

        if (err.message.includes("Invalid")) {
            res.status(400).json({
                "message": err.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to log in."
        });
    }
});

app.get("/games", async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM games"
        );

        res.json({
            "games": result
        })
    } catch (err) {
        console.log(err);

        res.status(500).json({
            "message": "Failed to query games."
        });
    }
});

app.post("/games", async (req, res) => {
    try {
        /*
            Authorization: Bearer {token}

            token => _id: userId

            {
                "developer": "Rockstar Games",
                "name": "Red Dead Redemption 2",
                "price": 10000
            }
        */

        // START: Tokenből kiszedjük az ID-t
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Unauthorized."); // 402
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized."); // 402
        }

        const decodedToken = jwt.decode(token, "secret");
        // END

        // START: törzs
        const body = req.body;

        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body."); // 400
        }

        if (!body.developer || typeof body.developer !== "string") {
            throw new Error("Invalid developer."); // 400
        }

        if (!body.name || typeof body.name !== "string") {
            throw new Error("Invalid name."); // 400
        }

        if (!body.price || typeof body.price !== "int") {
            throw new Error("Invalid price."); // 400
        }
        // END

        const [result] = await pool.query(
            "INSERT INTO games (owner_id, developer, name, price) VALUES (?, ?, ?, ?)",
            [decodedToken._id, body.developer, body.name, body.price]
        );

        if (result.affectedRows !== 1) {
            throw new Error("Failed to insert game."); // 500
        }

        res.json({
            "message": "Game added successfully."
        });
    } catch (err) {
        console.log(err);

        if (err.message.includes("Invalid")) {
            res.status(400).json({
                "message": err.message
            });
            return;
        }

        if (err.message.includes("Unauthorized")) {
            res.status(402).json({
                "message": err.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to insert new game."
        });
    }
});

// http://localhost:3001/games/1
app.delete("/games/:id", async (req, res) => {
    try {
        // Authorization: Bearer {token}
        // token => userId

        // id => gameId

        // 1 (játék), "Epic Games", "Fortnite", 2 (felhasználó)

        // tokenben: 2
        // lekérdezési paraméterekben: 1

        // START: token
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Unauthorized.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized.");
        }

        const decodedToken = jwt.decode(token, "secret");
        // END

        // START: útvonal paraméter
        const gameId = parseInt(req.params.id);
        if (isNaN(gameId)) {
            throw new Error("Invalid game id.");
        }
        // END

        const [result] = await pool.query(
            "DELETE FROM games WHERE id = ? AND owner_id = ?",
            [gameId, decodedToken._id]
        );

        if (result.affectedRows !== 1) {
            throw new Error("Failed to delete game.");
        }

        res.json({
            "message": "Game deleted."
        });
    } catch (err) {
        console.log(err);

        if (err.message.includes("Unauthorized")) {
            res.status(402).json({
                "message": err.message
            });
            return;
        }

        if (err.message.includes("Invalid")) {
            res.status(400).json({
                "message": err.message
            });
            return;
        }
        
        res.status(500).json({
            "message": "Failed to delete game."
        });
    }
});

app.get("/owned_games", async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Unauthorized.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decodedToken = jwt.decode(token, "secret");

        const [result] = await pool.query(
            "SELECT * FROM games WHERE owner_id = ?",
            [decodedToken._id]
        );

        res.json({
            "games": result
        });
    } catch (err) {
        console.log(err);

        if (err.message.includes("Unauthorized")) {
            res.status(402).json({
                "message": err.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to query owned games."
        });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}.`);
});