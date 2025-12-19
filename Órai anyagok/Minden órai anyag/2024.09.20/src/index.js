const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        "name" : "router-gyak",
        "ver" : "1.0"
    });
});

app.get("/status", (req, res) => {
    res.json({
        "status" : "meow"
    });
});

let viccek = [
    "Mire használja az etióp a szívószálat? Hálózsáknak.",
    "Hogy köszönnek az etiópnak? Mi szél hozott?",
    "Mi a különbség az etióp és a pingponglabda között? Pár gramm."
];

app.get("/viccek", (req, res) => {
    res.json({
        "viccek" : viccek
    });
});

app.post("/vicc", (req, res) => {
    if(typeof req.body?.vicc != "string" || !req.body?.vicc) {
        return res.json({
            "status" : "error"
        }).status(400);
    }

    viccek.push(req.body?.vicc);

    res.json({
        "status" : "done"
    });
});

app.listen(port, () => {
    console.log(`Express app started on port ${port}`);
});
