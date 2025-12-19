import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3001;
const JWT_SECRET = "secret2000";

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    server: "localhost",
    user: "root",
    password: "",
    database: "blog"
});

// > 1. feladat

// posztok lekérdezése
app.get("/posts", async (req, res) => {
    try {
        const [result] = await pool.query(
            "select username, title, content from posts inner join users on posts.user_id = users.id;"
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong.",
        });
    }
});

// posztok létrehozása
app.post("/posts", async (req, res) => {
    try {
        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error("Invalid body.");
        }

        if (!body.title || typeof body.title !== "string") {
            throw new Error("Invalid title.");
        }

        if (!body.content || typeof body.content !== "string") {
            throw new Error("Invalid content.");
        }

        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Auth header required.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Auth header must have a token.");
        }

        // tokenből kiszedni user_id-t
        // feltölteni adatbázisba
        // választ visszaküldjük

        const decodedToken = jwt.decode(token, JWT_SECRET);

        const [insertResult] = await pool.query(
            "insert into posts (user_id, title, content) values (?, ?, ?)",
            [decodedToken._userId, body.title, body.content]
        );

        if (insertResult.affectedRows < 1) {
            throw new Error("Failed to insert.");
        }

        res.status(201).json({
            message: "Post successfully inserted."
        });
        // köszi Máté
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                error: err.message
            });
            return;
        }

        if (err.message.includes("Auth")) {
            res.status(401).json({
                error: err.message
            });
            return;
        }

        res.status(500).json({
            error: "Something went wrong."
        });
    }
});

// posztok törlése
app.delete("/posts/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Invalid id.");
        }

        if (id < 1) {
            throw new Error("Invalid id.");
        }

        const [result] = await pool.query("delete from posts where id = ?;", [id]);

        if (result.affectedRows < 1) {
            throw new Error("No post found.");
        }

        res.json({
            "id": id
        });
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                message: err.message
            });
            return;
        }

        if (err.message.includes("No post")) {
            res.status(404).json({
                message: err.message
            });
            return;
        }

        res.status(500).json({
            message: "Something went wrong."
        });
    }
});

// posztok módosítása
app.put("/posts/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Invalid id.");
        }

        if (id < 1) {
            throw new Error("Invalid id.");
        }

        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error("Invalid body.");
        }

        if (!body.title || typeof body.title !== "string") {
            throw new Error("Invalid title.");
        }

        if (!body.content || typeof body.content !== "string") {
            throw new Error("Invalid content.");
        }

        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Auth header required.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Auth header must have a token.");
        }

        const decodedToken = jwt.decode(token, JWT_SECRET);

        const [result] = await pool.query(
            "update posts set title = ?, content = ?, user_id = ? where id = ?",
            [body.title, body.content, decodedToken._userId, id]
        );

        if (result.affectedRows < 1) {
            throw new Error("No post found.");
        }

        res.json({
            message: "Post successfully updated."
        });
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                error: err.message
            });
            return;
        }

        if (err.message.includes("Auth")) {
            res.status(401).json({
                error: err.message
            });
            return;
        }

        if (err.message.includes("No post")) {
            res.status(404).json({
                message: err.message
            });
            return;
        }

        res.status(500).json({
            error: "Something went wrong."
        });
    }
});
// < 1. feladat

// > 2. feladat
app.post("/register", async (req, res) => {
    try {
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

        const [existingUser] = await pool.query(
            "select * from users where username = ?;",
            [body.username]
        );

        if (existingUser.length !== 0) {
            throw new Error("Invalid username.");
        }

        const hashedPassword = await bcrypt.hash(body.password, 12);

        const [result] = await pool.query(
            "insert into users (username, password) values (?, ?);",
            [body.username, hashedPassword]
        );

        if (result.affectedRows < 1) {
            throw new Error("Failed to insert user.");
        }

        res.status(201).json({
            message: "User registered successfully."
        });
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                message: err.message
            });
            return;
        }

        res.status(500).json({
            message: "Something went wrong."
        });
    }
});

app.post("/login", async (req, res) => {
    try {
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

        const [existingUser] = await pool.query(
            "select * from users where username = ?",
            [body.username]
        );

        if (existingUser.length == 0) {
            throw new Error("Invalid username.");
        }

        const isPasswordValid = await bcrypt.compare(body.password, existingUser[0].password);

        if (!isPasswordValid) {
            throw new Error("Invalid password.");
        }

        const token = jwt.sign({ _userId: existingUser[0].id }, JWT_SECRET);

        res.json({
            token: token
        });
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                message: err.message
            });
            return;
        }

        res.status(500).json({
            message: "Something went wrong."
        });
    }
});
// < 2. feladat

// > 3. feladat
app.post("/like/:post_id", async (req, res) => {
    try {
        const id = parseInt(req.params.post_id);

        if (isNaN(id)) {
            throw new Error("Invalid id.");
        }

        if (id < 1) {
            throw new Error("Invalid id.");
        }

        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Auth header required.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Auth header must have a token.");
        }

        const decodedToken = jwt.decode(token, JWT_SECRET);

        const [result] = await pool.query(
            "insert into likes (user_id, post_id) values (?, ?);",
            [id, decodedToken._userId]
        );

        if (result.affectedRows < 1) {
            throw new Error("Failed to insert.");
        }

        res.status(201).json({
            message: "Post successfully liked."
        });
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                message: err.message
            });
            return;
        }

        if (err.message.includes("Auth")) {
            res.status(401).json({
                message: err.message
            });
            return;
        }

        res.status(500).json({
            message: "Something went wrong."
        });
    }
});
// < 3. feladat

app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});