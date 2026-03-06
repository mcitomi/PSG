import Express from "express";
import CORS from "cors";
import { createPool } from "mysql2/promise.js";
import CP from "cookie-parser";
import Argon2 from "argon2";
import JWT from "jsonwebtoken";

import crashhandler from "./middlewares/crashhandler.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";

export const SECRET = "iabwhafjh46aentg46tqabtb3uktKR3QOLTI3";

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fesztival_tracker"
});

const app = Express();

app.use(CORS());
app.use(Express.json());
app.use(CP());

app.use(logger);

app.post("/register", async (req, res) => {
    // username
    // password

    const body = req.body;

    if(Object.keys(body).length != 2) {
        throw new Error("Invalid body object");
    }

    if(!body.username || typeof(body.username) != "string") {
        throw new Error("Invalid username");
    }

    if(!body.password || typeof(body.password) != "string") {
        throw new Error("Invalid password");
    }

    const passwordHash = await Argon2.hash(body.password, {
        type: Argon2.argon2id
    });

    const [insertRes] = await pool.query("INSERT INTO users (username, password) VALUES (?,?);", [body.username, passwordHash]);

    if(insertRes.affectedRows != 1) {
        throw new Error("Failed to insert user");
    }

    res.status(201).json({message: "Registered"});
});

app.post("/login", async (req, res) => {
    const body = req.body;

    if(Object.keys(body).length != 2) {
        throw new Error("Invalid body object");
    }

    if(!body.username || typeof(body.username) != "string") {
        throw new Error("Invalid username");
    }

    if(!body.password || typeof(body.password) != "string") {
        throw new Error("Invalid password");
    }

    const conn = await pool.getConnection();

    const [userRes] = await conn.query("SELECT * FROM users WHERE username = ?;", [body.username]);

    const user = userRes[0];

    if(!user) {
        throw new Error("Invalid username or password");
    }
    
    const token = await JWT.sign({userid: user.id, role: user.role}, SECRET);

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    });

    res.json({message: "Logged in successfully"});
});

app.get("/me", [auth], async (req, res) => {
    res.json({me: req.user});
});

app.use(crashhandler);

app.listen(3030, () => {
    console.log("backend runnin on port http://localhost:3030/");
});