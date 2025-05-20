import Express from "express";
import { createPool } from "mysql2/promise";
import cors from "cors";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

const app = Express();

const PORT = 3030;

const pool = createPool({
    host: "192.168.0.106",
    password: "",
    user: "root",
    database: "autokereskedes"
});

app.use(cors());
app.use(Express.json());

app.post("/register", async (req, res) => {
    try {
        const body = await req.body;

        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body");
        }

        if (!body.username || typeof (body.username) !== "string") {
            throw new Error("Invalid username");
        }

        if (!body.email || typeof (body.email) !== "string") {
            throw new Error("Invalid email");
        }

        if (!body.password || typeof (body.password) !== "string") {
            throw new Error("Invalid password");
        }

        const passwordHash = await hash(body.password, 12);

        const [result] = await pool.query("INSERT INTO users (username, email, password) VALUES (?,?,?);", [body.username, body.email, passwordHash]);

        if (result.affectedRows !== 1) {
            throw new Error("Failed to insert user");
        }

        res.status(201).json({ "message": "Successfully registered" });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({ "message": error.message });
            return;
        }

        res.status(500).json({ "message": error.message });
    }
});

app.post("/login", async (req, res) => {
    try {
        const body = await req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error("Invalid body");
        }

        if (!body.username || typeof (body.username) !== "string") {
            throw new Error("Invalid username");
        }

        if (!body.password || typeof (body.password) !== "string") {
            throw new Error("Invalid password");
        }

        const [user] = await pool.query("SELECT * FROM users WHERE username LIKE ?;", [body.username]);

        if (user[0].length < 1) {
            throw new Error("Invalid username or password");
        }

        if (!await compare(body.password, user[0].password)) {
            throw new Error("Invalid username or password");
        }

        const token = jwt.sign({ _uid: user[0].id }, "secret");

        res.json({ "token": token, "message": "User successfully logged in" });

    } catch (error) {
        console.log(error);
        
        if (error.message.includes("Invalid")) {
            res.status(400).json({ "message": error.message });
            return;
        }

        res.status(500).json({ "message": error.message });
    }
});

app.get("/cars", async (req, res) => {
    try {
        const [cars] = await pool.query("SELECT * FROM cars;");

        res.json({ "cars": cars });
    } catch (error) {
        res.status(500).json({ "message": error.message });
    }
});

app.post("/cars", async (req, res) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            throw new Error("Unauthorized");
        }

        const token = auth.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const payload = jwt.verify(token, "secret");

        const body = await req.body;

        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body");
        }

        if (!body.model || typeof (body.model) !== "string") {
            throw new Error("Invalid model");
        }

        if (!body.manufacturer || typeof (body.manufacturer) !== "string") {
            throw new Error("Invalid manufacturer");
        }

        if (!body.price || typeof (body.price) !== "number") {
            throw new Error("Invalid price");
        }

        const [result] = await pool.query("INSERT INTO cars (owner, model, manufacturer, price) VALUES (?,?,?,?);", [payload._uid, body.model, body.manufacturer, body.price]);

        if (result.affectedRows !== 1) {
            throw new Error("Failed to insert car");
        }

        res.json({ "message": "Car successfully uploaded" });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({ "message": error.message });
            return;
        }
        if (error.message.includes("Unauthorized")) {
            res.status(401).json({ "message": error.message });
            return;
        }
        res.status(500).json({ "message": error.message });
    }
});

app.delete("/cars/:id", async (req, res) => {
    try {
        const carId = parseInt(req.params.id);
        if (isNaN(carId)) {
            throw new Error("Invalid car id");
        }

        const auth = req.headers.authorization;
        if (!auth) {
            throw new Error("Unauthorized");
        }

        const token = auth.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const payload = jwt.verify(token, "secret");

        const [result] = await pool.query("DELETE FROM cars WHERE owner = ? AND id = ?;", [payload._uid, carId]);

        if (result.affectedRows !== 1) {
            throw new Error("Failed to delete car");
        }

        res.json({ "message": "Car successfully deleted" });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({ "message": error.message });
            return;
        }
        if (error.message.includes("Unauthorized")) {
            res.status(401).json({ "message": error.message });
            return;
        }
        res.status(500).json({ "message": error.message });
    }
});

app.get("/mycars", async (req, res) => {
    try {
        const auth = req.headers.authorization;
        if (!auth) {
            throw new Error("Unauthorized");
        }

        const token = auth.split(" ")[1];
        if (!token) {
            throw new Error("Unauthorized");
        }

        const payload = jwt.verify(token, "secret");

        const [cars] = await pool.query("SELECT * FROM cars WHERE owner = ?;", [payload._uid]);

        res.json({ "cars": cars });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            res.status(400).json({ "message": error.message });
            return;
        }
        if (error.message.includes("Unauthorized")) {
            res.status(401).json({ "message": error.message });
            return;
        }
        res.status(500).json({ "message": error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend port: http://localhost:${PORT}/`);
});