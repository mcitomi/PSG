import { Database } from "bun:sqlite";

import createDb from "./db";

const db = new Database("blog.sqlite", { create: true });

import { sign, verify } from "jsonwebtoken";

const JWT_SEC = "secret";

// import CORS from "bun-routes-cors";
import CORS from "D:/Codes/2025/corsmod/index.ts";

createDb(db);

Bun.serve({
    port: 8080,
    development: true,
    routes: CORS({
        "/posts": {
            GET: async (req: Bun.BunRequest<"/posts">) => {
                try {
                    const posts = db.query("SELECT * FROM posts").all();

                    return Response.json(posts);
                } catch (error) {
                    return Response.json({
                        "message": error.message
                    }, { status: 500 });
                }
            },
            POST: async (req: Bun.BunRequest<"/posts">) => {
                try {
                    const token = req.headers.get("authorization").split(' ')[1];
                    if (!token) {
                        throw new Error("Auth error, invalid token or signature");

                    }
                    const decoded = verify(token, JWT_SEC) as { _uid: number };

                    const body = await req.json() as {
                        title: string;
                        content: string;
                    };

                    if (Object.keys(body).length !== 2) {
                        throw new Error("Invalid body");
                    }

                    if (!body?.title || typeof (body.title) != "string") {
                        throw new Error("Invalid title");
                    }

                    if (!body?.content || typeof (body.content) != "string") {
                        throw new Error("Invalid content");
                    }

                    const dbResults = db.run("INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?);", [body.title, body.content, decoded._uid]);

                    if (dbResults.changes !== 1) {
                        throw new Error("Error inserting row");
                    }

                    return Response.json({
                        "message": "Post successfully created!"
                    }, { status: 201 });

                } catch (error) {
                    if (error.message.includes("Invalid")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 400 });
                    }

                    if (error.message.includes("signature")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 401 });
                    }

                    return Response.json({
                        "message": error.message
                    }, { status: 500 });
                }
            }
        },
        "/posts/:id": {
            DELETE: async (req: Bun.BunRequest<"/posts/:id">) => {
                try {
                    const id = parseInt(req.params.id);

                    if (id < 1 || isNaN(id)) {
                        throw new Error("Invalid id");
                    }

                    const decoded = verify(req.headers.get("authorization").split(' ')[1], JWT_SEC) as { _uid: number };

                    const dbResults = db.run("DELETE FROM posts WHERE id = ? AND user_id = ?;", [id, decoded._uid]);

                    if (dbResults.changes !== 1) {
                        throw new Error("This post not found or not deletable");
                    }

                    return Response.json({
                        "message": "Successfully deleted"
                    });
                } catch (error) {
                    if (error.message.includes("Invalid")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 400 });
                    }

                    if (error.message.includes("not found")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 404 });
                    }

                    return Response.json({
                        "message": error.message
                    }, { status: 500 });
                }
            },
            PUT: async (req: Bun.BunRequest<"/posts/:id">) => {
                try {
                    const id = parseInt(req.params.id);

                    if (id < 1 || isNaN(id)) {
                        throw new Error("Invalid id");
                    }

                    const decoded = verify(req.headers.get("authorization").split(' ')[1], JWT_SEC) as { _uid: number };

                    const body = await req.json() as {
                        title: string;
                        content: string;
                    };

                    if (Object.keys(body).length !== 2) {
                        throw new Error("Invalid body");
                    }

                    if (!body?.title || typeof (body.title) != "string") {
                        throw new Error("Invalid title");
                    }

                    if (!body?.content || typeof (body.content) != "string") {
                        throw new Error("Invalid content");
                    }

                    const dbResults = db.run("UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?;", [body.title, body.content, id, decoded._uid]);

                    if (dbResults.changes !== 1) {
                        throw new Error("Post with this id not found or not deletable");
                    }

                    return Response.json({
                        "message": "Post successfully updated!"
                    });

                } catch (error) {
                    if (error.message.includes("Invalid")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 400 });
                    }

                    if (error.message.includes("not found")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 404 });
                    }

                    return Response.json({
                        "message": error.message
                    }, { status: 500 });
                }
            }
        },
        "/register": {
            POST: async (req: Bun.BunRequest<"/register">) => {
                try {
                    const body = await req.json() as {
                        username: string;
                        display_name: string;
                        password: string;
                        passwordre: string;
                    };

                    if (Object.keys(body).length !== 4) {
                        throw new Error("Invalid body");
                    }

                    if (!body?.username || typeof (body.username) != "string") {
                        throw new Error("Invalid username");
                    }

                    if (!body?.display_name || typeof (body.display_name) != "string") {
                        throw new Error("Invalid display_name");
                    }

                    if (!body?.password || typeof (body.password) != "string") {
                        throw new Error("Invalid password");
                    }

                    if (!body?.passwordre || typeof (body.passwordre) != "string") {
                        throw new Error("Invalid password");
                    }

                    if (body.password != body.passwordre) {
                        throw new Error("Invalid password: password do not match");
                    }

                    const hashPassword = await Bun.password.hash(body.password, {
                        algorithm: "argon2id"
                    });

                    const dbResults = db.run(`INSERT INTO users (username, display_name, password) VALUES (?, ?, ?)`, [body.username, body.display_name, hashPassword]);

                    if (dbResults.changes !== 1) {
                        throw new Error("Error inserting row");
                    }

                    return (Response.json({
                        "message": "User successfully registered!"
                    }, { status: 201 }));

                } catch (error) {
                    if (error.message.includes("Invalid")) {
                        return (Response.json({
                            "message": error.message
                        }, { status: 400 }));
                    }
                    return (Response.json({
                        "message": error.message
                    }, { status: 500 }));
                }
            }
        },
        "/login": {
            POST: async (req: Bun.BunRequest) => {
                try {
                    const body = await req.json() as {
                        username: string;
                        password: string;
                    };

                    if (Object.keys(body).length !== 2) {
                        throw new Error("Invalid body");
                    }

                    if (!body?.username || typeof (body.username) != "string") {
                        throw new Error("Invalid username");
                    }

                    if (!body?.password || typeof (body.password) != "string") {
                        throw new Error("Invalid password");
                    }

                    const userValues = db.query("SELECT * FROM users WHERE username = ?;").get(body.username) as {
                        id: number;
                        username: string;
                        display_name: string;
                        password: string;
                    };

                    if (!userValues) {
                        throw new Error("Invalid username or password");
                    }

                    if (!await Bun.password.verify(body.password, userValues.password)) {
                        throw new Error("Invalid username or password");
                    }

                    const token = sign({ _uid: userValues.id }, JWT_SEC, {
                        expiresIn: "2h"
                    });

                    return Response.json({
                        "message": "User successfully logged in",
                        "token": token
                    });
                } catch (error) {
                    if (error.message.includes("Invalid")) {
                        return Response.json({
                            "message": error.message
                        }, { status: 400 });
                    }
                    return Response.json({
                        "message": error.message
                    }, { status: 500 });
                }
            }
        },
        "/": Response.redirect("https://example.com"),
        "/asd": () => {
            return new Response("asd")
            return 
        },
        "/asdsadas": {
            GET: async (req) => {
                return Response.json();
            }
        },
        "/api/status": new Response("OK"),

        // Dynamic routes
        "/users/:id": (req: Bun.BunRequest<"/users/:id">) => {
            return new Response(`Hello User ${req.params.id}!`);
        },

        // Per-HTTP method handlers
        "/api/posts": {
            GET: () => new Response("List posts"),
            POST: async req => {
                const body = await req.json();
                return Response.json({ created: true });
            }
        },

        // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
        "/api/*": Response.json({ message: "Not found" }, { status: 404 }),

        // Redirect from /blog/hello to /blog/hello/world
        "/blog/hello": Response.redirect("/blog/hello/world"),

        // Serve a file by buffering it in memory
        "/file": new Response(await Bun.file("./readme.md").bytes(), {
            headers: {
                "Content-Type": "image/x-icon",
            },
        })
    })
});


console.log("started");
