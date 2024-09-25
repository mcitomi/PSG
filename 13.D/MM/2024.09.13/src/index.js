const express = require("express");
const app = express();

app.use(express.json());

app.get("/health_check", (req, res) => {
    res.json({
        "status" : "active"
    }).status(200);
});

const messages = [ 
    "Megnyílt a 2024-25-ös tanév",
    "Be kell szedni a telefonokat",
    "Nem tudunk semmit használni a rendszergazda miatt"
];

app.get("/posts", (req, res) => {
    res.json({
        "posts" : messages
    });
});

app.post("/posts", (req, res) => {
    if(typeof req.body?.message != "string" || !req.body?.message) {
        return res.status(400).json({
            "error" : "Bad request"
        });
    }
    
    messages.push(req.body?.message);
    res.json({
        "posts" : messages
    });
});

app.get("/user", (req, res) => {
    res.json({
        "username" : "mate",
        "email" : "molnarmatenorbert@gmail.com"
    });
});

app.listen(3000, () => {
    console.log("Express server started on port 3000");
});