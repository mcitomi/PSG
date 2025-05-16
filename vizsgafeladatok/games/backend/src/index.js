import Express from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const app = Express();

const pool = createPool({
    host: "192.168.0.102",
    database: "games",
    user: "root",
    password: ""
});

app.use(Express.json());
app.use(cors());

const PORT = 3030;

app.post("/register", async (req, res) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length !== 3) {
            throw new Error("Invalid body");
        }

        if (!body.email || typeof (body.email) !== "string") {
            throw new Error("Invalid email");
        }

        if (!body.username || typeof (body.username) !== "string") {
            throw new Error("Invalid username");
        }

        if (!body.password || typeof (body.password) !== "string") {
            throw new Error("Invalid password");
        }

        const hashedPassword = await hash(body.password, 12);

        const [insertResults] = await pool.query(
            "INSERT INTO users (username, email, password) VALUES (?, ?, ?);",
            [body.username, body.email, hashedPassword]
        );

        if (insertResults.affectedRows !== 1) {
            throw new Error("Failed to insert user");
        }

        res.status(201).json({
            "message": "User registered"
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }
        res.status(500).json({
            "message": "Failed to register user"
        });
        return;
    }
});

app.post("/login", async (req, res) => {
    try {
        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error("Invalid body");
        }

        if (!body.username || typeof (body.username) !== "string") {
            throw new Error("Invalid username");
        }

        if (!body.password || typeof (body.password) !== "string") {
            throw new Error("Invalid password");
        }

        const [user] = await pool.query("SELECT * FROM users WHERE username LIKE ?;", [body.username]);

        if (user.length !== 1) {
            throw new Error("Invalid username");
        }

        if (!await compare(body.password, user[0].password)) {
            throw new Error("Invalid password");
        }

        const token = jwt.sign({
            _id: user[0].id
        }, "secret");

        res.json({
            "token": token
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to login"
        });
        return;
    }
});

app.get("/games", async (req, res) => {
    try {
        const [result] = await pool.query(
            "SELECT * FROM games;"
        );

        res.json({ "games": result });
    } catch (error) {
        console.log(error);

        res.status(500).json({ "message": "Failed to query games" });
    }
});

app.post("/games", async (req, res) => {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            throw new Error("Unauthorized");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decodedToken = jwt.decode(token, "secret");

        const body = req.body;

        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body");
        }

        if (!body.developer || typeof (body.developer) !== "string") {
            throw new Error("Invalid developer");
        }

        if (!body.name || typeof (body.name) !== "string") {
            throw new Error("Invalid name");
        }

        if (!body.price || typeof (body.price) !== "number") {
            throw new Error("Invalid price");
        }

        const [result] = await pool.query("INSERT INTO games (owner, developer, name, price) VALUES (?,?,?,?);", [decodedToken._id, body.developer, body.name, body.price]);

        if (result.affectedRows !== 1) {
            throw new Error("Failed to insert game");
        }

        res.json({
            "message": "Game added successfully"
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        if (error.message.includes("Unauthorized")) {
            res.status(402).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to insert game"
        });
        return;
    }
});

app.delete("/games/:id", async (req, res) => {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            throw new Error("Unauthorized");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decodedToken = jwt.decode(token, "secret");

        const gameId = parseInt(req.params.id);

        if(isNaN(gameId)) {
            throw new Error("Invalid game id");
        }

        const [result] = await pool.query("DELETE FROM games WHERE id = ? AND owner = ?;", [gameId, decodedToken._id]);

        if(result.affectedRows !== 1) {
            throw new Error("Failed to delete game");
        }

        res.json({
            "message" : "Game successfully deleted"
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        if (error.message.includes("Unauthorized")) {
            res.status(402).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to delete game"
        });
        return;
    }
});

app.get("/owned_games", async (req, res) => {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            throw new Error("Unauthorized");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const decodedToken = jwt.decode(token, "secret");

        const [result] = await pool.query("SELECT * FROM games WHERE owner = ?;", [decodedToken._id]);

        res.json({
            "games" : result
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("Unauthorized")) {
            res.status(402).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Failed to query games"
        });
        return;
    }
})

app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);
});
