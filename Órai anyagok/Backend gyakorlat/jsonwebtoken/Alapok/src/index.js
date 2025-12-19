import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
    host: "localhost",
    user: "testing",
    password: "testing",
    database: "auth",
});

app.post("/register", async (req, res) => {
    try {
        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error(
                "Invalid request body, should contain 'username' and 'password' fields."
            );
        }

        if (!body.username || typeof body.username !== "string") {
            throw new Error(
                "Invalid request body, field 'username' should be a string."
            );
        }

        if (!body.password || typeof body.password !== "string") {
            throw new Error(
                "Invalid request body, field 'username' should be a string."
            );
        }

        const [existingUser] = await pool.query(
            "select * from users where username like ?;",
            [body.username]
        );
        if (existingUser.length !== 0) {
            throw new Error("Invalid 'username': already taken.");
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const [insertResult] = await pool.query(
            "insert into users (username, password) values (?, ?)",
            [body.username, hashedPassword]
        );

        if (insertResult.affectedRows < 1) {
            throw new Error("Failed to insert new user.");
        }

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        console.error(err);
        if (err.message.includes("Invalid")) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.status(500).json({ error: "Something went wrong." });
    }
});

app.post("/login", async (req, res) => {
    try {
        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error(
                "Invalid request body, should contain 'username' and 'password' fields."
            );
        }

        if (!body.username || typeof body.username !== "string") {
            throw new Error(
                "Invalid request body, field 'username' should be a string."
            );
        }

        if (!body.password || typeof body.password !== "string") {
            throw new Error(
                "Invalid request body, field 'username' should be a string."
            );
        }

        const [user] = await pool.query(
            "select * from users where username like ?;",
            [body.username]
        );
        if (user.length === 0) {
            throw new Error("Invalid credentials.");
        }

        const isPasswordValid = await bcrypt.compare(
            body.password,
            user[0].password
        );
        if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
        }

        const token = jwt.sign(
            { _id: user[0].id },
            "secret",
            {}
        );

        res.json({ token: token });
    } catch (err) {
        console.error(err);
        if (err.message.includes("Invalid")) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.status(500).json({ error: "Something went wrong." });
    }
});

app.get("/profile", async (req, res) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new Error("Authentication required.");
        }

        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new Error("Authentication required.");
        }

        const decodedToken = jwt.decode(token, "secret");

        const [user] = await pool.query(
            "select * from users where id = ?",
            [decodedToken._id]
        );

        if (user.length !== 1) {
            throw new Error("Invalid token: user not found");
        }

        res.json({ username: user[0].username });
    } catch (err) {
        console.error(err);
        if (err.message.includes("Authentication")) {
            res.status(402).json({ error: err.message });
            return;
        }
        if (err.message.includes("Invalid")) {
            res.status(400).json({ error: err.message });
            return;
        }

        res.status(500).json({ error: "Something went wrong." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The server is running on localhost:${PORT}.`);
});
