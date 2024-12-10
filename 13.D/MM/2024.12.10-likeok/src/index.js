import express, { json } from "express";
import { createPool } from "mysql2/promise";
import cors from "cors";
import cfg from "../cfg.json" assert { type: "json" };  // a nodejs-ben a json importálása egy kísérleti funkció
// Még nem ismeri fel a node a json-t teljesen.
// A bun pl már támogatja ezt

const app = express();
const pool = createPool({   // A mysql modul alap értékei ezek, nekünk a database-t, user-t és a passwordot kell megadni
    host: "localhost",
    user: "root",
    password: "",
    database: "social_media"
});     // a password-ot akkor is meg kell adni ha az csak egy üres "".

app.use(json());
app.use(cors());

app.get("/posts", async (req, res) => {
    try {
        const [posts] = await pool.query(`
            SELECT posts.id, posts.user_id, users.name, content, likes, dislikes  
            FROM posts
            INNER JOIN users ON users.id = posts.user_id;
        `); // `` jeleket használva törhetjük a lekérdezés sorait

        // if (!posts) {
        //     throw new Error("msg:Nincsenek posztok!");
        // }

        // Hozhatunk létre saját hibaüzenetet, vagy akár térhetünk vissza 404-es errorral,
        // de jobb, ha üres tömbbel térünk vissza, mert megtaláltuk a tartalmat csak üres.

        res.json(posts);

    } catch (error) {
        // if (error.message.startsWith("msg:")) {
        //     res.status(400).json({
        //         "message" : error.message.slice(4)
        //     });
        //     return;
        // }

        res.status(500).json({
            "message" : "Nem sikerült lekérdezni a posztokat"
        });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length !== 2) {
            throw new Error("msg:Hibás törzs kérés!");
        }

        if(!body.user_id || typeof(body.user_id) !== "number") {
            throw new Error("msg:Inavlid felhasználó azonosító!");
        }

        if(!body.content || typeof(body.content) !== "string") {
            throw new Error("msg:Hibás kontent!");
        } 

        const [sqlQuery] = await pool.query(
            `INSERT INTO posts (user_id, content, likes, dislikes) VALUES (?, ?, ?, ?);`, 
            [body.user_id, body.content, 0, 0]
        );

        if(sqlQuery.affectedRows !== 1) {   // Ha nem érintett 1 sort, akkor nem sikerült a feltöltés
            throw new Error("msg:Az adatokat nem sikerült feltölteni");
        }

        const [newPost] = await pool.query(
            `SELECT posts.id, posts.user_id, users.name, content, likes, dislikes  
            FROM posts
            INNER JOIN users ON users.id = posts.user_id 
            WHERE posts.id = ?`,
            [sqlQuery.insertId]
        );  // Az insertnél kapott id-val lekérdezzük az új postot, és a hozzá tartozó nevet
            // Az insertnél visszaadja az autoincrement által megadott id-t

        res.status(201).json(newPost);
        
    } catch (error) {
        if (error.message.startsWith("msg:")) {
            res.status(400).json({
                "message" : error.message.slice(4)
            });     // A slice metódus levág a szövegből, így nem jelenik meg az "msg" szócska az üzenet részeként
            return;
        }

        res.status(500).json({
            "message" : "Szerver hiba!"
        });
    }
});

app.patch("/like/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        if(isNaN(postId)) {
            throw new Error("msg:Helytelen id paraméter");
        }

        const [sqlQuery] = await pool.query(`
            UPDATE posts SET likes = likes + 1 WHERE id = ?
        `, [postId]); 

        if(sqlQuery.affectedRows !== 1) {
            throw new Error("msg:Sikertelen kedvelés");
        }

        const [post] = await pool.query(`
            SELECT posts.id, posts.user_id, users.name, content, likes, dislikes  
            FROM posts
            INNER JOIN users ON users.id = posts.user_id 
            WHERE posts.id = ?`,
            [postId]
        );

        res.json(post);

    } catch (error) {
        if (error.message.startsWith("msg:")) {
            res.status(400).json({
                "message" : error.message.slice(4)
            });
            return;
        }

        res.status(500).json({
            "message" : "Szerver hiba!"
        });
    }
});

app.patch("/dislike/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        if(isNaN(postId)) {
            throw new Error("msg:Helytelen id paraméter");
        }

        const [sqlQuery] = await pool.query(`
            UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?
        `, [postId]); 

        if(sqlQuery.affectedRows !== 1) {
            throw new Error("msg:Sikertelen kedvtelenkedés");
        }

        const [post] = await pool.query(`
            SELECT posts.id, posts.user_id, users.name, content, likes, dislikes  
            FROM posts
            INNER JOIN users ON users.id = posts.user_id 
            WHERE posts.id = ?`,
            [postId]
        );

        res.json(post);

    } catch (error) {
        if (error.message.startsWith("msg:")) {
            res.status(400).json({
                "message" : error.message.slice(4)
            });
            return;
        }

        res.status(500).json({
            "message" : "Szerver hiba!"
        });
    }
});


app.listen(cfg.port, () => {
    console.log(`A szerver elindult - http://localhost:${cfg.port}/`);
});