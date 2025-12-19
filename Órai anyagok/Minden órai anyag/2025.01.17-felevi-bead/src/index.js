import express, { json } from "express";
import mysql from "mysql2/promise";

const app = express();

app.use(json());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "social_media"
});

app.get("/posts", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts");

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/post", async (req, res) => {
    try {
        const body = req.body;

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 2) {
            throw new Error("Invalid request body");
        }

        if(!body.content || typeof (body.content) !== "string") {
            throw new Error("Invalid content!");
        }

        if(!body.user_id || typeof (body.user_id) !== "number") {
            throw new Error("Invalid user_id!");
        }

        const [rows] = await pool.query("INSERT INTO posts (content, user_id, likes, dislikes) VALUES (?, ?, ?, ?)", [body.content, body.user_id, 0, 0]);

        if (rows.affectedRows !== 1) {
            throw new Error("Failed to insert post");
        }

        res.status(201).json({ 
            message: "Post created successfully" 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/post/:id", async (req, res) => {
    try {
        const body = req.body;
        const postId = parseInt(req.params.id);

        if(isNaN(postId)) { 
            throw new Error("Invalid post id!");
        }

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 4) {
            throw new Error("Invalid request body");
        }

        if(!body.content || typeof (body.content) !== "string") {
            throw new Error("Invalid content parameter!");
        }

        if(!body.user_id || typeof (body.user_id) !== "number") {
            throw new Error("Invalid user_id parameter!");
        }

        if(!body.likes || typeof (body.likes) !== "number") {
            throw new Error("Invalid likes parameter!");
        }

        if(!body.dislikes || typeof (body.dislikes) !== "number") {
            throw new Error("Invalid dislikes parameter!");
        }

        const [rows] = await pool.query("UPDATE posts SET content = ?, user_id = ?, likes = ?, dislikes = ? WHERE id = ?", 
            [body.content, body.user_id, body.likes, body.dislikes, postId]
        );

        if (rows.affectedRows !== 1) {
            throw new Error("Failed to update post");
        }

        res.status(200).json({ 
            message: "Post updated successfully" 
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/post/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        if(isNaN(postId)) { 
            throw new Error("Invalid post id!");
        }

        const [rows] = await pool.query("DELETE FROM posts WHERE id = ?", [postId]);

        if (rows.affectedRows !== 1) {
            throw new Error("Failed to delete post");
        }                

        res.status(200).json({ 
            message: "Post deleted successfully" 
        });
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
});

app.patch("/content/:id", async (req, res) => {
    try {
        const body = req.body;
        const postId = parseInt(req.params.id);

        if(isNaN(postId)) { 
            throw new Error("Invalid post id!");
        }

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 1) {
            throw new Error("Invalid request body");
        }

        if(!body.content || typeof (body.content) !== "string") {
            throw new Error("Invalid content parameter!");
        }

        const [rows] = await pool.query("UPDATE posts SET content = ? WHERE id = ?", [body.content, postId]);

        if(rows.affectedRows !== 1) {
            throw new Error("Failed to update post");
        }

        res.status(200).json({
            message: "Post content updated successfully"
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
