import { sign, verify } from "jsonwebtoken";
import CORS from "bun-routes-cors";
import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const db = new Database("database.sqlite", { create: true });

try {
    db.run(readFileSync(join(import.meta.dir, "database", "input.sql"), { encoding: "utf-8" }));
} catch (error) {
    console.log("Database already created");
}

const PORT = 3030;

Bun.serve({
    port: PORT,
    development: true,
    routes: CORS({
        "/register": {
            POST: async (req: Bun.BunRequest) => {
                try {
                    const body = await req.json() as { username: string; password: string; email: string; };

                    if (!body || Object.keys(body).length !== 3) {
                        throw new Error("Invalid body");
                    }

                    if (!body.email || typeof (body.email) !== "string") {
                        throw new Error("Invalid email");
                    }

                    if (!body.username || typeof (body.username) !== "string") {
                        throw new Error("Invalid username");
                    }

                    if (!body.password || typeof (body.password) !== "string") {
                        throw new Error("Invalid password");
                    }

                    const secretPassword = await Bun.password.hash(body.password, {
                        algorithm: "argon2id",
                        timeCost: 2,
                        memoryCost: 16
                    });

                    const insertedUser = db.run(`INSERT INTO users (pass, email, username) VALUES (?,?,?);`, [secretPassword, body.email, body.username]);

                    if (insertedUser.changes !== 1) {
                        throw new Error("Failed to insert user");
                    }

                    return Response.json({ "message": "User successfully created!" }, { status: 201 });
                } catch (error) {
                    console.log(error);

                    if (error.message.includes("Invalid")) {
                        return Response.json({ "message": error.message }, { status: 400 });
                    }
                    return Response.json({ "message": error.message }, { status: 500 });
                }
            }
        },
        "/login": {
            POST: async (req: Bun.BunRequest) => {
                try {
                    const body = await req.json() as { username: string; password: string; };

                    if (!body || Object.keys(body).length !== 2) {
                        throw new Error("Invalid body");
                    }

                    if (!body.username || typeof (body.username) !== "string") {
                        throw new Error("Invalid username");
                    }

                    if (!body.password || typeof (body.password) !== "string") {
                        throw new Error("Invalid password");
                    }

                    const user = await db.query("SELECT id, pass FROM users WHERE username LIKE ?;").get(body.username) as { id: number; pass: string; };

                    if (!user || !user.id) {
                        throw new Error("Invalid username or password");
                    }

                    if (!await Bun.password.verify(body.password, user.pass)) {
                        throw new Error("Invalid username or password");
                    }

                    const jwt = sign({ _uid: user.id }, "secret");

                    return Response.json({ "message": "User successfully logged in", "token": jwt }, { status: 200 });

                } catch (error) {
                    console.log(error);

                    if (error.message.includes("Invalid")) {
                        return Response.json({ "message": error.message }, { status: 400 });
                    }
                    return Response.json({ "message": error.message }, { status: 500 });
                }
            }
        },
        "/movies": {
            GET: async (req: Bun.BunRequest) => {
                try {
                    const movies = db.query("SELECT * FROM movies;").all();

                    return Response.json({ "movies": movies }, { status: 200 });
                } catch (error) {
                    return Response.json({ "message": error.message }, { status: 500 });
                }
            }
        },
        "/movies/:id": {
            DELETE: async (req: Bun.BunRequest<"/movies/:id">) => {
                try {
                    const movieId = parseInt(req.params.id);
                    if (isNaN(movieId) || movieId < 1) {
                        throw new Error("Invalid movie id");
                    }

                    const auth = req.headers.get("authorization");
                    if (!auth) {
                        throw new Error("Unauthorized");
                    }

                    const token = auth.split(" ")[1];
                    if (!token) {
                        throw new Error("Unauthorized");
                    }

                    const payload = verify(token, "secret") as { _uid: number; };

                    const result = await db.run("DELETE FROM favourites WHERE userId = ?", [payload._uid]);

                    if (result.changes !== 1) {
                        throw new Error("Failed to delete movie");
                    }

                    return Response.json({ "message": "Movie deleted" }, { status: 200 });

                } catch (error) {
                    if (error.message.includes("Invalid")) {
                        return Response.json({ "message": error.message }, { status: 400 });
                    }

                    if (error.message.includes("Unauthorized")) {
                        return Response.json({ "message": error.message }, { status: 401 });
                    }

                    return Response.json({ "message": error.message }, { status: 500 });
                }
            }
        },
        "/likedmovies": {
            GET: async (req: Bun.BunRequest) => {
                try {
                    const auth = req.headers.get("authorization");
                    if (!auth) {
                        throw new Error("Unauthorized");
                    }

                    const token = auth.split(" ")[1];
                    if (!token) {
                        throw new Error("Unauthorized");
                    }

                    const payload = verify(token, "secret") as { _uid: number; };

                    const movies = db.query("SELECT * FROM favourites INNER JOIN movies ON movies.id = favourites.movieId WHERE userId = ?;").all(payload._uid);

                    if (!movies) {
                        throw new Error("Unable to query movies");
                    }

                    return Response.json({ "movies": movies }, { status: 200 });
                } catch (error) {
                    if (error.message.includes("Unauthorized")) {
                        return Response.json({ "message": error.message }, { status: 401 });
                    }
                    return Response.json({ "message": error.message }, { status: 500 });
                }
            }
        },
        "/likedmovies/:id": {
            POST: async (req: Bun.BunRequest<"/likedmovies/:id">) => {
                try {
                    const movieId = parseInt(req.params.id);
                    if (isNaN(movieId) || movieId < 1) {
                        throw new Error("Invalid movie id");
                    }

                    const auth = req.headers.get("authorization");
                    if (!auth) {
                        throw new Error("Unauthorized");
                    }

                    const token = auth.split(" ")[1];
                    if (!token) {
                        throw new Error("Unauthorized");
                    }

                    const payload = verify(token, "secret") as { _uid: number; };

                    const result = db.run("INSERT INTO favourites (userId, movieId) VALUES (?,?);", [payload._uid, movieId]);

                    if (result.changes !== 1) {
                        throw new Error("Failed to add movie to your library");
                    }

                    return Response.json({ "message": "Movie added to your library" }, { status: 200 })

                } catch (error) {
                    if (error.message.includes("Unauthorized")) {
                        return Response.json({ "message": error.message }, { status: 401 });
                    }
                    if (error.message.includes("Invalid")) {
                        return Response.json({ "message": error.message }, { status: 400 });
                    }
                    return Response.json({ "message": error.message }, { status: 500 });
                }
            }
        }
    })
});

console.log(`Bun backend started on http://localhost:${PORT}/`);
