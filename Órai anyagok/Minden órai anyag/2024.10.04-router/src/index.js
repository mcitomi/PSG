const express = require("express");
const { port } = require("../config.json");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health_check", (req, res) => {
    res.json({
        "status" : "active"
    });
});

app.get("/products", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"})));
});

// hibalehetőségek
// - nincs body
// - nem valid json forma
// - mezők nevei hibásak vagy nincsenek
// - hibás tipusú mező

app.post("/products", (req, res) => {

    const body = req.body;

    if(!body || typeof body != "object") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "Az üzenetnek tartalmazni kell bodyt megfelelő formátumban."
            }
        ).status(400);
    }

    if(!body.név || typeof body.név != "string") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "A bodynak tartalmazni kell 'név' tulajdonságot."
            }
        ).status(400);
    }

    if(!body.autó || typeof body.autó != "string") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "A bodynak tartalmazni kell 'autó' tulajdonságot."
            }
        ).status(400);
    }

    if(!body.állapot || typeof body.állapot != "string") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "A bodynak tartalmazni kell 'állapot' tulajdonságot."
            }
        ).status(400);
    }

    if(!body.ár || typeof body.ár != "number") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "A bodynak tartalmazni kell 'ár' tulajdonságot."
            }
        ).status(400);
    }

    const storageArray = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}));

    if(storageArray.find(x => x.név == body.név)) {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "Ilyen termék már létezik!"
            }
        ).status(400);
    }
    
    storageArray.push(body);

    fs.writeFileSync("./products.json", JSON.stringify(storageArray, null, 4));
    
    res.send("Upload finished");
    
});

app.delete("/products", (req, res) => {
    const body = req.body;

    if(!body || typeof body != "object") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "Az üzenetnek tartalmazni kell bodyt megfelelő formátumban."
            }
        ).status(400);
    }

    if(!body.név || typeof body.név != "string") {
        return res.json(
            {
                "error" : "Bad request", 
                "message" : "A bodynak tartalmazni kell 'név' tulajdonságot."
            }
        ).status(400);
    }

    const storageArray = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}));

    const object = storageArray.filter(x => x.név != body.név);
    
    fs.writeFileSync("./products.json", JSON.stringify(object, null, 4));
    
    res.send("Removed");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
