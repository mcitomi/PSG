import express from "express"
import cors from "cors"
import { createPool } from "mysql2/promise"
import JWT from "jsonwebtoken"
import COOKIEPARSER from "cookie-parser";
import ARGON from "argon2";

import errhandler from "./middlewares/err.js";
import auth from "./middlewares/auth.js";

const app = express();
export const SECRET = "titok";

app.use(express.json());
app.use(cors());
app.use(COOKIEPARSER());

const pool = createPool({
    host:"localhost",
    database:"kommentek",
    password: "",
    user: "root"
});

app.post("/register", async (req,res)=>{
    const body = req.body
   
    if(Object.keys(body).length != 3){
        throw new Error("Invalid body")
    }
    if(!body.name || typeof(body.name) != "string"){
        throw new Error("Invalid name")
    }
    if(!body.pass || typeof(body.pass) != "string"){
        throw new Error("Invalid pass")
    }
    if(!body.role || typeof(body.role) != "string"){
        throw new Error("Invalid role")
    }
    if(body.pass.length < 6){
        throw new Error("Invalid pass: too short")
    }

    const hashPass = await ARGON.hash(body.pass)

    const [result] = await pool.query("INSERT INTO users (name,pass,role) VALUES (?,?,?);", [body.name,hashPass,body.role])
    if(result.affectedRows != 1){
        throw new Error("Failed to update db")
    }

    res.status(201).json({message: "succesfully created"})
});

app.post("/login", async (req,res)=>{
    const body = req.body

    if(Object.keys(body).length != 2){
        throw new Error("Invalid body")
    }
    if(!body.name || typeof(body.name) != "string"){
        throw new Error("Invalid name")
    }
    if(!body.pass || typeof(body.pass) != "string"){
        throw new Error("Invalid pass")
    }

    const [user] = await pool.query("SELECT * FROM users WHERE name=?",[body.name])

    if(!user || user.length < 1){
        throw new Error("Invalid username or password");
    }

    const isValidPass = await ARGON.verify(user[0].pass, body.pass)

    if(!isValidPass){
        throw new Error("Invalid username orr password")
    }

    const token = JWT.sign({ id: user[0].id, role: user[0].role }, SECRET);

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    });

    res.json({ message: "Successfully logged in" });

});

app.patch("/change/password", auth, async (req, res) =>{
    const body = req.body;

    if(Object.keys(body).length != 2){
        throw new Error("Invalid body")
    }
    if(!body.pass || typeof(body.pass) != "string"){
        throw new Error("Invalid password")
    }
    if(!body.newPass || typeof(body.newPass) != "string"){
        throw new Error("Invalid password")
    }

    const [user] = await pool.query("SELECT * FROM users WHERE id = ?;", [req.userId]);

    const isValidPass = await ARGON.verify(user[0].pass, body.pass);

    if(!isValidPass) {
        throw new Error("Invalid pass");
    }

    const [results] = await pool.query("UPDATE users SET pass = ? WHERE id = ?", 
        [await ARGON.hash(body.newPass), req.userId]
    );

    if(results.affectedRows != 1) {
        throw new Error("Failed to update db");
    }

    res.status(200).json({"message": "OK"});
});


app.use(errhandler);

app.listen(3030, ()=>{
    console.log("fut")
});