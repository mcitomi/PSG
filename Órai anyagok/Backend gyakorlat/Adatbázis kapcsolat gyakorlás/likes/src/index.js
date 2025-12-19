import express from "express";
import mysql from "mysql2/promise";

const PORT = 3000;

const app = express();
const pool = mysql.createPool({
    user: "root",
    password: "",
    database: "social_media", 
});

app.use(express.json());

// select posts.id, name, content, likes, dislikes from posts
// inner join users on posts.user_id = users.id;
app.get("/posts", async (_req, res) => {
    try {
        const [results, ] = await pool.query(
            `select posts.id, name, content, likes, dislikes from posts
            inner join users on posts.user_id = users.id;`
        );

        res.json(results);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            "error": "Nem sikerült lekérdezni a posztokat."
        });
    }
});

// insert into posts (user_id, content, likes, dislikes) values (?, ?, 0, 0);
app.post("/posts", async (req, res) => {
    try {
        const body = req.body;

        if (!body || typeof(body) !== "object" || Object.keys(body).length !== 2) {
            throw new Error("Helytelen kérés törzs.");
        }

        if (!body.user_id || typeof(body.user_id) !== "number") {
            throw new Error("Helytelen 'user_id' mező.");
        }

        if (!body.content || typeof(body.content) !== "string") {
            throw new Error("Helytelen 'content' mező.");
        }

        const [results, ] = await pool.query(
            "insert into posts (user_id, content, likes, dislikes) values (?, ?, 0, 0);",
            [body.user_id, body.content]
        );

        const [newPost, ] = await pool.query(
            `select posts.id, name, content, likes, dislikes from posts
            inner join users on posts.user_id = users.id
            where posts.id = ?;`,
            [results.insertId]
        );

        res.status(201).json(newPost);
    } catch (err) {
        if (err.message.includes("Helytelen")) {
            res.status(400).json({
                "error": err.message,
            });
            return;
        }

        res.status(500).json({
            "error": "Nem sikerült beilleszteni a posztot."
        });
    }
});


// update posts set likes = likes + 1 where id = ?;
app.patch("/like/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Helytelen 'id' paraméter.");
        }

        const [result, ] = await pool.query(
            "update posts set likes = likes + 1 where id = ?;",
            [id]
        );

        if (result.affectedRows < 1) {
            throw new Error("Nem található az adott poszt.");
        }

        const [newPost, ] = await pool.query(
            `select posts.id, name, content, likes, dislikes from posts
            inner join users on posts.user_id = users.id
            where posts.id = ?;`,
            [id]
        );

        res.json(newPost);
    } catch (err) {
        if (err.message.includes("Helytelen")) {
            res.status(400).json({
                "error": err.message
            });
            return;
        }

        if (err.message.includes("Nem található")) {
            res.status(404).json({
                "error": err.message
            });
            return;
        }

        res.status(500).json({
            "error": "Hiba a likeolás közben."
        });
    }
});

app.listen(PORT, () => {
    console.log(`A szerver elindult localhost:${PORT}-on.`);
});