import Express, { json } from "express";
import { createPool } from "mysql2/promise";
import CORS from "cors";
import COOKIEPARSER from "cookie-parser";
import ARGON from "argon2";
import JWT from "jsonwebtoken";

import errhandler from "./middlewares/errhandler.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";

const app = Express();

app.use(CORS());
app.use(COOKIEPARSER());
app.use(json());
app.use(logger);

export const SECRET = "Titkospass123";

const pool = createPool({
    host: "localhost",
    database: "todoapp",
    password: "",
    user: "root"
});

app.get("/todo/list", async (req, res) => {
    const [list] = await pool.query("SELECT * FROM todos;");

    if (!list || list.length < 1) {
        res.status(404).json({ message: "A lista üres" });
        return;
    }

    res.json({ list });
});

app.post("/todo/add", auth, async (req, res) => {
    // console.log(req.userId);
    const body = req.body;

    if(Object.keys(body).length != 2) {
        throw new Error("Invalid body object");
    }

    if(!body.title || typeof(body.title) != "string") {
        throw new Error("Invalid title field");
    }

    if(!body.description || typeof(body.description) != "string") {
        throw new Error("Invalid description field");
    }
    
    const [insertResult] = await pool.query("INSERT INTO todos (title, description, user_id) VALUES (?,?,?);",
        [body.title, body.description, req.userId]
    );

    if(insertResult.affectedRows != 1) {
        throw new Error("Failed to insert todo");
    }

    res.status(201).json({ message: "Todo uploaded" });
});

app.post("/register", async (req, res) => {
    const body = req.body;

    if (Object.keys(body).length != 3) {
        throw new Error("Invalid body object");
    }

    if (!body.username || typeof (body.username) != "string") {
        throw new Error("Invalid username");
    }

    if (!body.password || typeof (body.password) != "string") {
        throw new Error("Invalid password field");
    }

    if (!body.email || typeof (body.email) != "string") {
        throw new Error("Invalid email field");
    }

    if (body.password.length < 8) {
        throw new Error("Invalid password: Too weak");
    }

    const hashPass = await ARGON.hash(body.password);

    const [insertResult] = await pool.query("INSERT INTO users (username, password_hash, email) VALUES (?,?,?);",
        [body.username, hashPass, body.email]
    );

    if (insertResult.affectedRows != 1) {
        throw new Error("Failed to insert to the database");
    }

    res.status(201).json({ message: "User created" });
});

app.post("/login", async (req, res) => {
    const body = req.body;

    if (Object.keys(body).length != 2) {
        throw new Error("Invalid body object");
    }

    if (!body.username || typeof (body.username) != "string") {
        throw new Error("Invalid username");
    }

    if (!body.password || typeof (body.password) != "string") {
        throw new Error("Invalid password field");
    }

    const [user] = await pool.query("SELECT * FROM users WHERE username = ?;", [body.username]);

    if (!user || user.length < 1) {
        throw new Error("Invalid username or password");
    }

    const isValidPass = await ARGON.verify(user[0].password_hash, body.password);

    if (!isValidPass) {
        throw new Error("Invalid username or password");
    }

    const token = JWT.sign({ id: user[0].id }, SECRET);

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ message: "Successfully logged in" });
});

app.use(errhandler);

app.listen(3030, () => {
    console.log("App runnin at port localhost:3030");
});