const express = require("express");
const { port } = require("../config.json");
const fs = require("fs");

const app = express();
app.use(express.json());

app.get("/health_check", (req, res) => {
    res.json({
        "status" : "active"
    });
});

app.get("/products", (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"})));
});

app.post("/products", (req, res) => {

    const body = req.body;

    if(!body || typeof body != "object") {
        return res.send("Hiányzik a body!");
    }

    if(!body.név || typeof body.név != "string" || body.név.length < 3) {
        return res.send("Hibás body! Tartalmani kell név tulajdonságot ami minumum 3 karatker hossz");
    }

    const storageArray = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}));

    if(storageArray.find(x => x.név == body.név)) {
        return res.send("Ilyen termék már létezik!");
    }
    
    storageArray.push(body);

    fs.writeFileSync("./products.json", JSON.stringify(storageArray, null, 4));
    
    res.send("Upload finished");
    
});

app.delete("/products", (req, res) => {
    const body = req.body;

    if(!body || typeof body != "object") {
        return res.send("Hiányzik a body!");
    }

    if(!body.név || typeof body.név != "string" || body.név.length < 3) {
        return res.send("Hibás body! Tartalmani kell név tulajdonságot ami minumum 3 karatker hossz");
    }

    const storageArray = JSON.parse(fs.readFileSync("./products.json", {encoding: "utf-8"}));

    const object = storageArray.filter(x => x.név != body.név);
    
    fs.writeFileSync("./products.json", JSON.stringify(object, null, 4));
    
    res.send("Removed");
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
