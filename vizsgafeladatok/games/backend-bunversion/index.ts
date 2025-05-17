import { Database } from "bun:sqlite";
import CORS from "bun-routes-cors";
import { sign, decode } from "jsonwebtoken";

const db = new Database("adatbazis.sqlite", { create: true });

try {
    db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username VARCHAR(255) UNIQUE,
            email VARCHAR(255) UNIQUE,
            password VARCHAR(255)
        );

        CREATE TABLE games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            owner INTEGER,
            developer VARCHAR(255),
            name VARCHAR(255),
            price INT,
            FOREIGN KEY(owner) REFERENCES users(id)
        );

        INSERT INTO users (username, email, password) VALUES 
        ("admin", "admin@admin.hu", "$2a$12$3hA3ZIpERFNT.kLsXFBUfuE4e2r4l3xTCHuNF3.Batbo1G9rwaxJC"),
        ("dominik", "dominik@admin.hu", "$2a$12$XX6i5hqpqYCsH0MZ4m9VwOEs9sv5.4ls.flHS.B8p3EVcYdaLA.3m"),
        ("asd", "asd@admin.hu", "$2a$12$McJcS7aqT9GyIefIo.BU4.O8M5ObRQO2IMpG.R3IMsTw1EzrBP.NG");

        INSERT INTO games (owner, developer, name, price) VALUES
        (1, "Epic Games", "Fortinte", 0),
        (1, "Rackstar", "GTA V", 5000),
        (1, "Minecraft", "Notch", 3000);
    `);
} catch (e) { }

function errorHandler(error) {
    if (error.message.includes("Invalid")) {
        return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: "Something went wrong" }, { status: 500 });
}

Bun.serve({
    port: 3030,
    development: true,
    routes: CORS({
        "/register": {
            POST: async (req: Bun.BunRequest<"/register">) => {
                try {
                    const body = await req.json() as { username: string, password: string, email: string; };

                    if (Object.keys(body).length !== 3) {
                        throw new Error("Invalid body");
                    }

                    if (!body.email || typeof (body.email) !== "string" || !body.email.includes("@")) {
                        throw new Error("Invalid email");
                    }

                    if (!body.password || typeof (body.password) !== "string") {
                        throw new Error("Invalid password");
                    }

                    if (!body.username || typeof (body.username) !== "string") {
                        throw new Error("Invalid username");
                    }

                    const hashedPassword = Bun.password.hashSync(body.password, {
                        algorithm: "argon2id",
                        timeCost: 2,
                        memoryCost: 16
                    });

                    const saveUser = db.run(`INSERT INTO users (email, password, username) VALUES (?,?,?);`, [body.email, hashedPassword, body.username]);

                    if (saveUser.changes !== 1) {
                        throw new Error("Failed to insert user");
                    }

                    return Response.json({ message: "Successfully registrated" }, { status: 201 });

                } catch (error) {
                    console.log(error);

                    if (error.message.includes("Invalid")) {
                        return Response.json({ message: error.message }, { status: 400 });
                    }

                    return Response.json({ message: "Failed to insert user!" }, { status: 500 });
                }
            }
        },
        "/login": {
            POST: async (req: Bun.BunRequest) => {
                try {
                    const body = await req.json() as { username: string, password: string; };

                    if (Object.keys(body).length !== 2) {
                        throw new Error("Invalid body");
                    }

                    if (!body.password || typeof (body.password) !== "string") {
                        throw new Error("Invalid password");
                    }

                    if (!body.username || typeof (body.username) !== "string") {
                        throw new Error("Invalid username");
                    }

                    const user = await db.query("SELECT password, id FROM users WHERE username = ?;").get(body.username) as { password: string, id: number; };

                    if (!user || !user.id) {
                        throw new Error("Invalid username query");
                    }

                    if (!Bun.password.verifySync(body.password, user.password)) {
                        throw new Error("Invalid password");
                    }

                    const token = sign({ _id: user.id }, "secret");

                    return Response.json({
                        message: "Successfully logged in",
                        token: token
                    });

                } catch (error) {
                    console.log(error);

                    if (error.message.includes("Invalid")) {
                        return Response.json({ message: error.message }, { status: 400 });
                    }

                    return Response.json({ message: "Failed to login" }, { status: 500 });
                }
            }
        },
        "/games": {
            GET: async (req: Bun.BunRequest) => {
                try {
                    const games = await db.query("SELECT * FROM games;").all() as { id: number, owner: string, developer: string, name: string, price: number; }[];
                    return Response.json({ games: games });
                } catch (error) {
                    console.log(error);
                    return Response.json({ message: "Failed to get games" }, { status: 500 });
                }
            },
            POST: async (req: Bun.BunRequest) => {
                try {

                } catch (error) {
                    return Response.json({ message: "Failed to post game" }, { status: 500 });
                }
            },

        },
        "/games/:id": {
            DELETE: async (req: Bun.BunRequest<"/games/:id">) => {
                try {
                    const gameId = parseInt(req.params.id);

                    if (isNaN(gameId) || gameId < 0) {
                        throw new Error("Invalid game id");
                    }

                    const query = await db.run("DELETE FROM games WHERE id = ?;", [gameId]);

                    if (query.changes !== 1) {
                        throw new Error("Failed to delete game");
                    }

                } catch (error) {
                    return errorHandler(error);
                }
            }
        },
        "/owngames": {
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

                    const payload = decode(token) as { _id: number; };

                    const games = await db.query("SELECT * FROM games WHERE owner = ?;").all(payload._id) as { id: number, owner: string, developer: string, name: string, price: number; }[];
                    return Response.json({ games: games });

                } catch (error) {
                    if (error.message.includes("Unauthorized")) {
                        return Response.json({ message: error.message }, { status: 400 });
                    }

                    return Response.json({ message: "Failed to get your games" }, { status: 500 });
                }
            }
        }
    })
});

console.log("Bun runnin");
