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
    host: "localhost",
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
            "message": "Something went wrong.",
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
                "message": err.message
            });
            return;
        }

        if (err.message.includes("Auth")) {
            res.status(401).json({
                "message": err.message
            });
            return;
        }

        res.status(500).json({
            "message": "Something went wrong."
        });
    }
});

// egy poszt törlése
app.delete("/posts/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Invalid id");
        }

        if (id < 1) {
            throw new Error("Invalid id");
        }

        const [result] = await pool.query(`
            DELETE FROM posts WHERE id = ?;
            `, [id]
        );

        if (result.affectedRows < 1) {
            throw new Error("Post not found");
        }

        res.json({
            "id": id
        });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        if (error.message.includes("not found")) {
            res.status(404).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Something went wrong"
        });
        return;
    }
});

// egy poszt felülírása
app.put("/posts/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Invalid id");
        }

        if (id < 1) {
            throw new Error("Invalid id");
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

        const authHeader = req.headers.authorization;
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

        const [result] = await pool.query(`
            UPDATE posts SET title = ?, content = ?, user_id = ? WHERE id = ?
            `, [body.title, body.content, decodedToken._userId, id]
        );

        if (result.affectedRows < 1) {
            throw new Error("Post not found");
        }

        res.json({
            "message": "Post successfully updated"
        });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        if (error.message.includes("not found")) {
            res.status(404).json({
                "message": error.message
            });
            return;
        }

        if (error.message.includes("Auth")) {
            res.status(401).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": "Something went wrong"
        });
        return;
    }
});

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

        const hashedPass = await bcrypt.hash(body.password, 12);

        const [result] = await pool.query(`
            INSERT INTO users (username, password) VALUES (?, ?);
            `, [body.username, hashedPass]
        );

        if(result.affectedRows < 1) {
            throw new Error("Failed to insert user");
        }

        res.status(201).json({
            "message" : "User registered successfully"
        });

    } catch (error) {
        if (error.message.includes("Duplicate entry")) {
            res.status(400).json({
                "message": "Invalid username"
            });
            return;
        }
        
        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": error.message
        });
        return;
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

        const [result] = await pool.query(`
            SELECT password FROM users WHERE username = ?;
            `, [body.username]
        );

        if(result.length < 1) {
            throw new Error("Invalid username");
        }

        const isValidPassword = await bcrypt.compare(body.password, result[0].password);

        if(!isValidPassword) {
            throw new Error("Invalid password");
        }
        
        const token = jwt.sign({ _userId: result[0].id }, JWT_SECRET);

        res.json({
            "token": token
        });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": error.message
        });
        return;
    }
});

app.post("/like/:post_id", async (req, res) => {
    try {
        const post_id = parseInt(req.params.post_id);

        if (isNaN(post_id)) {
            throw new Error("Invalid post_id");
        }

        if (post_id < 1) {
            throw new Error("Invalid post_id");
        }

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error("Auth header required.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Auth header must have a token.");
        }

        const decodedToken = jwt.decode(token, JWT_SECRET);

        const [result] = await pool.query(`
            INSERT INTO likes (user_id, post_id) VALUES (?, ?);
            `, [decodedToken._userId, post_id]
        );

        if(result.affectedRows < 1) {
            throw new Error("Failed to insert like");
        }

        res.json({
            "message" : "Post liked successfully"
        });
    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({
                "message": error.message
            });
            return;
        }

        if (error.message.includes("Auth")) {
            res.status(401).json({
                "message": error.message
            });
            return;
        }

        res.status(500).json({
            "message": error.message
        });
        return;
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on localhost:${PORT}`);
});