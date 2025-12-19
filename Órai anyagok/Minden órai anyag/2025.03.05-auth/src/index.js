import Express, { json } from "express";
import { createPool } from "mysql2/promise";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";

const app = Express();
const pool = createPool({
    user: "root",
    password: "",
    database: "auth"
});

const PORT = 3000;

app.use(json());

app.post("/register", async (req, res) => {
    try {
        const body = req.body;

        // itt lenne az ellenőrzés ami szokott.


        const [existingUser] = await pool.query(`
            SELECT * FROM users WHERE users.username LIKE ?;
            `, [body.username]
        );

        if (existingUser.length) {
            throw new Error("Invalid username already taken");
        }

        const passwordHash = await hash(body.password, 14);

        const [insertResult] = await pool.query(`
            INSERT INTO users (username, password) VALUES (?, ?);
            `, [body.username, passwordHash]
        );

        if (insertResult.affectedRows < 1) {
            throw new Error("Failed to insert new user");
        }

        res.status(201).json({
            "message": "User registered"
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
    }
});

app.post("/login", async (req, res) => {
    try {
        const body = req.body;

        // itt lenne az ellenőrzés ami szokott.

        const [existingUser] = await pool.query(`
            SELECT * FROM users WHERE users.username LIKE ?;
            `, [body.username]
        );

        if (!existingUser.length) {
            throw new Error("Invalid credentials (username)");
        }

        const isPasswordValid = await compare(
            body.password,
            existingUser[0].password
        );

        if (!isPasswordValid) {
            throw new Error("Invalid credentials (passw)");
        }

        const token = jwt.sign(
            {
                _id: existingUser[0].id,
            },
            "secret",
            {
                expiresIn: "2h"
            }
        );

        res.json({ token: token });
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
    }

});

app.get("/profile", async (req, res) => {
    try {
        const authHeader = req.headers?.authorization;
        if (!authHeader) {
            throw new Error("Auth required");
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new Error("Auth required / missing token");
        }

        const decodedToken = jwt.verify(token, "secret");

        const [user] = await pool.query(`
            SELECT * FROM users WHERE id = ?;
            `, [decodedToken._id]
        );

        if (!user.length) {
            throw new Error("Auth failed: invalid token");
        }

        res.json({
            "username": user[0].username
        });

    } catch (error) {
        if (error.message.includes("Auth")) {
            res.status(401).json({
                "message": error.message
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
    }
});


app.listen(PORT, () => {
    console.log(`App started on http://localhost:${PORT}/`);
});