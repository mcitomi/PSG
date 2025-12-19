import express, { json } from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

import { logger } from "./middlewares/logger.js";
import { error } from "./middlewares/error.js";
import { notfound } from "./middlewares/notfound.js";
import { isAdmin } from "./middlewares/admin.js";

const app = express();

app.use(cors());
app.use(json());

app.use(logger);

app.get("/", (req, res) =>{
    return res.json({message: "Hi"});
});

app.get("/admin", isAdmin, (req, res) =>{
    return res.json({message: "Hi Admin"});
});

app.get("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    if(isNaN(userId) || userId < 0 || userId > 5) {
        throw new Error("Invalid userid");
    }

    return res.json({message: "user checked"});
});

app.use(notfound);
app.use(error);

app.listen(3030, () => {
    console.log("server started");
});