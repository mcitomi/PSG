import { Database } from "bun:sqlite";
import CORS from "bun-routes-cors";
import { sign, decode, verify } from "jsonwebtoken";

const db = new Database("adatbazis.sqlite", { create: true });

// try {
//     db.run(`
//         CREATE TABLE users (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username TEXT UNIQUE,
//     email TEXT UNIQUE,
//     password TEXT
// );

// CREATE TABLE rangok (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     userId INT,
//     color TEXT,
//     price TEXT,
//     name TEXT,
//     FOREIGN KEY(userId) REFERENCES users(id)
// );

// INSERT INTO users (username, email, password) VALUES
// ("admin", "admin@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$t3csHvmY1IV2d6vrruqq/Q"),
// ("xxxpvppro", "xxxpvppro@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$22zoBRR/2WDOM/QAsvzcdA"),
// ("kissa", "kissa@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$Er4I4JhyyuwZ+Emi0XDhmg"),
// ("mateka2011", "mateka2011@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$YSGknPHLcUxYePPJ1j9oaw");

// INSERT INTO rangok (userId, color, name, price) VALUES
// (2, "piros", "zsírkirály", 12000),
// (3, "narancs", "mindenható", 7000),
// (1, "kék", "funfunfun", 9999999);
//         `)
// } catch (error) {
//     console.log(error);
    
// }

const PORT = 3030;

Bun.serve({
    port: PORT,
    development: true,
    routes: CORS({
        "/regisztracio": {
            POST: async (req: Bun.BunRequest) => {
                try {
                    const body = await req.json() as { username: string; email: string; password: string; };

                    if (!body || Object.keys(body).length !== 3) {
                        throw new Error("Invalid body");
                    }

                    if (!body.email || typeof (body.email) !== "string") {
                        throw new Error("Invalid email");
                    }

                    if (!body.password || typeof (body.password) !== "string") {
                        throw new Error("Invalid password");
                    }

                    if (!body.username || typeof (body.username) !== "string") {
                        throw new Error("Invalid username");
                    }

                    const passwordHash = await Bun.password.hash(body.password, {
                        algorithm: "argon2id",
                        timeCost: 2,
                        memoryCost: 16
                    });

                    const saveUser = db.run(`INSERT INTO users (username, password, email) VALUES (?,?,?);`, [body.username, passwordHash, body.email]);

                    if (saveUser.changes !== 1) {
                        throw new Error("Failed to insert registration");
                    }

                    return Response.json({ "message": "User successfully registrated" }, { status: 201 });
                } catch (error) {
                    if(error.message.includes("Invalid")) {
                        return Response.json({ "message": error.message }, { status: 400 });
                    }

                    return Response.json({ "message": "Failed to insert registration" }, { status: 500 });
                }
            }
        },
        "/bejenlentkezes" : {
            POST: async (req: Bun.BunRequest) => {
                try {
                    const body = await req.json() as { username: string; password: string; };

                    if (!body || Object.keys(body).length !== 2) {
                        throw new Error("Invalid body");
                    }

                    if (!body.password || typeof (body.password) !== "string") {
                        throw new Error("Invalid password");
                    }

                    if (!body.username || typeof (body.username) !== "string") {
                        throw new Error("Invalid username");
                    }

                    const user = await db.query("SELECT id, password FROM users WHERE username = ?;").get(body.username) as {id: number, password: string;};

                    if(!user || !user.id) {
                        throw new Error("Invalid username or password");
                    }

                    if(!await Bun.password.verify(body.password, user.password)) {
                        throw new Error("Invalid username or password");
                    }

                    const token = sign({_uid: user.id}, "secret");

                    return Response.json({
                        "message" : "Succesfully logged in",
                        "token" : token
                    });

                } catch (error) {
                    if(error.message.includes("Invalid")) {
                        return Response.json({ "message": error.message }, { status: 400 });
                    }

                    return Response.json({ "message": "Failed to login" }, { status: 500 });
                }
            }
        },
        "/rangok" : {
            GET: async (req: Bun.BunRequest) => {
                try {
                    const rangok = db.query("SELECT * FROM rangok;").all();

                    return Response.json({"rangok" : rangok});
                } catch (error) {
                    return Response.json({ "message": "Failed to query rangok" }, { status: 500 });
                }
            }
        },
        "/rangjaim" : {
            GET: async (req: Bun.BunRequest) => {
                try {
                    const authHeader = req.headers.get("authorization");
                    if(!authHeader) {
                        throw new Error("Unauthorized");
                    }
                    // Bearer asdduauduwabdk
                    const token = authHeader.split(" ")[1];
                    if(!token) {
                        throw new Error("Unauthorized");
                    }

                    const payload = verify(token, "secret") as {_uid: number; };

                    const rangjaim = db.query("SELECT * FROM rangok WHERE userId = ?;").all(payload._uid);

                    return Response.json({"rangjaim" : rangjaim});
                } catch (error) {
                    if(error.message.includes("Unauthorized")) {
                        return Response.json({ "message": error.message }, { status: 401 });
                    }
                    return Response.json({ "message": "Failed to query rangok" }, { status: 500 });
                }
            }
        }
    })
});

console.log("Bun running");
