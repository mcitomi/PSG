import Express from "express";
import { createPool } from "mysql2/promise";
import Cors from "cors";
import CookieParser from "cookie-parser";
import Jwt from "jsonwebtoken";
import Argon2 from "argon2";

import Logger from "./middlewares/logger.js";

import CONFIG from "../config.json" with { type: "json" };

const pool = createPool({
    password: "",
    database: "tinder_app_db",
    host: "localhost",
    user: "root"
});

const app = Express();

app.use(Logger);
app.use(Express.json());

app.post("/register", async (req, res) => {
    const body = req.body;

    if(Object.keys(body).length != 9) {
        throw new Error("Invalid body");
    }

    if (!body.username || typeof (body.username) != "string") {
        throw new Error("Invalid username");
    }

    if (!body.email || typeof (body.email) != "string") {
        throw new Error("Invalid email");
    }

    if (!body.password || typeof (body.password) != "string") {
        throw new Error("Invalid password");
    }

    if (!body.full_name || typeof (body.full_name) != "string") {
        throw new Error("Invalid full_name");
    }

    if (!body.birth_date || typeof (body.birth_date) != "string") {
        throw new Error("Invalid birth_date");
    }

    if (!body.gender || typeof (body.gender) != "string") {
        throw new Error("Invalid gender");
    }

    if (!body.bio || typeof (body.bio) != "string") {
        throw new Error("Invalid bio");
    }

    if (!body.longitude || typeof (body.longitude) != "number") {
        throw new Error("Invalid longitude");
    }

    if (!body.latitude || typeof (body.latitude) != "number") {
        throw new Error("Invalid latitude");
    }

    const [insertResults] = await pool.query(`
        INSERT INTO users 
        (username, email, password_hash, full_name, birth_date, gender, bio, latitude, longitude)
        VALUES
        (?,?,?,?,?,?,?,?,?)    
    `,
        [body.username, body.email, await Argon2.hash(body.password), body.full_name, body.birth_date, body.gender, body.bio, body.latitude, body.longitude]
    );

    if(insertResults.affectedRows != 1) {
        return res.status(500).json({message: "Valami hiba törtent sqlbe"});
    }

    res.status(201).json({message: "Registered"});
});



app.listen(CONFIG.port, () => {
    console.log(`Webserver started on port ${CONFIG.port}`);
});