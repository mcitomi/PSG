import Express, { json } from "express";
import { hash, compare } from "bcrypt";
import { createPool } from "mysql2/promise";
import jwt from "jsonwebtoken";
import cors from "cors";

const PORT = 3030;

const pool = createPool({
    database: "movies",
    host: "192.168.0.102",
    password: "",
    user: "root"
});

const app = Express();

app.use(cors());
app.use(json());

app.post("/register", async (req, res) => {
    try {
        const body = req.body;

        console.log(body);
        

        if (Object.keys(body).length !== 3) {
            throw new Error("Invalid body object");
        }

        if (!body.username || typeof (body.username) !== "string") {
            throw new Error("Invalid username field");
        }

        if (!body.email || typeof (body.email) !== "string") {
            throw new Error("Invalid email field");
        }

        if (!body.password || typeof (body.password) !== "string") {
            throw new Error("Invalid password field");
        }

        const hashedPassword = await hash(body.password, 12);

        const userQuery = await pool.query(`INSERT INTO users (username, email, password) VALUES (?, ?, ?);`, [body.username, body.email, hashedPassword]);

        if (userQuery[0].affectedRows !== 1) {
            return res.status(500).json({
                "message": "unable to create user"
            });
        }

        res.status(201).json({
            "message": "User successfully created"
        });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({
                "message": error.message
            });
        }

        if (error.message.includes("Duplicate entry")) {
            return res.status(400).json({
                "message": "Username alerdy exists"
            });
        }

        return res.status(500).json({
            "message": error.message
        });
    }
});

app.post("/login", async (req, res) => {
    try {
        const body = req.body;

        if (Object.keys(body).length !== 2) {
            throw new Error("Invalid body object");
        }

        if (!body.username || typeof (body.username) !== "string") {
            throw new Error("Invalid username field");
        }

        if (!body.password || typeof (body.password) !== "string") {
            throw new Error("Invalid password field");
        }

        const userQuery = await pool.query(`SELECT * FROM users WHERE username = ?;`, [body.username]);

        if (!userQuery[0][0]?.id) {
            return res.status(401).json({
                "message": "Invalid username or password!"
            });
        }

        if (!await compare(body.password, userQuery[0][0].password)) {
            return res.status(401).json({
                "message": "Invalid username or password!"
            });
        }

        const token = jwt.sign({ _id: userQuery[0][0].id }, "secret", { expiresIn: "6h" });

        res.json({
            "token": token,
            "message": "Successfully logged in"
        });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({
                "message": error.message
            });
        }

        return res.status(500).json({
            "message": error.message
        });
    }
});

app.get("/movies", async (req, res) => {
    try {
        const moviesQuery = await pool.query(`SELECT * FROM movies;`);

        res.json(moviesQuery[0]);

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }
});

app.get("/favourite", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const payload = jwt.decode(token, "secret");

        const favouriteQuery = await pool.query(`SELECT * FROM movies INNER JOIN fav ON fav.movies_id = movies.id WHERE user_id = ?;`, [payload._id]);

        res.json(favouriteQuery[0]);

    } catch (error) {
        return res.status(500).json({
            "message": error.message
        });
    }
});

app.post("/favourite/:id", async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);

        if (isNaN(movieId) || movieId < 1) {
            throw new Error("Invalid movieId");
        }

        const token = req.headers.authorization.split(" ")[1];

        const payload = jwt.decode(token, "secret");

        const favouriteQuery = await pool.query("INSERT INTO fav (user_id, movies_id) VALUES (?,?);", [payload._id, movieId]);

        if (favouriteQuery[0].affectedRows !== 1) {
            return res.status(400).json({
                "message": "Unable to like this movie"
            });
        }

        res.json({
            "message": "Movie added to your favourites"
        });
    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({
                "message": error.message
            });
        }

        return res.status(500).json({
            "message": error.message
        });
    }
});


app.delete("/favourite/:id", async (req, res) => {
    try {
        const movieId = parseInt(req.params.id);

        if (isNaN(movieId) || movieId < 1) {
            throw new Error("Invalid movieId");
        }

        const token = req.headers.authorization.split(" ")[1];

        const payload = jwt.decode(token, "secret");

        const favouriteQuery = await pool.query("DELETE FROM fav WHERE user_id = ? AND movies_id = ?;", [payload._id, movieId]);

        if (favouriteQuery[0].affectedRows !== 1) {
            return res.status(400).json({
                "message": "Unable to remove this movie"
            });
        }

        res.json({
            "message": "Movie removed from your favourites"
        });
    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({
                "message": error.message
            });
        }

        return res.status(500).json({
            "message": error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend started on port http://localhost:${PORT}/`);
});