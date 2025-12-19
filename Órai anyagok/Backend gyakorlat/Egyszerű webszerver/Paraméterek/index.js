const express = require("express");

const app = express();

app.use(express.json());

let videos = [
    {
        "title": "C# tutorial",
        "description": "PayPal link: ...",
        "minutes": 60
    },
    {
        "title": "JavaScript tutorial",
        "description": "PayPal link: ...",
        "minutes": 90
    },
    {
        "title": "péhápé tutorial",
        "description": "PayPal link: ...",
        "minutes": 110
    }
];

// lekérdezési paraméterek: /videos?title=PHP

app.get("/videos", (req, res) => {
    let param = req.query.title;

    if (!param) {
        return res.json(videos);
    }

    let results = [];
    for (elem of videos) {
        // tartalmazza-e a tömb jelenlegi elemének "title" mezője
        // a paraméterben megkapott title-t
        if (elem.title.includes(param)) {
            // res.json(elem); <- csak az első találalatot adja vissza
            results.push(elem);
        }
    }
    res.json(results);
});

app.get("/videos/:id", (req, res) => {
    let id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            "Error": "Can't parse path param into number."
        });
    }

    if (id > videos.length || id < 0) {
        return res.status(400).json({
            "Error": "Index out of range."
        });
    }

    res.json(videos[id]);
});

app.post("/videos", (req, res) => {
    const video = req.body;

    if (video.length == 0) {
        return res.status(400).json({
            "Error": "Cannot POST /videos without a body."
        });
    }

    if (video.length > 3) {
        return res.status(400).json({
            "Error": "Body has too many fields."
        });
    }

    if (!video.title || typeof(video.title) !== "string") {
        return res.status(400).json({
            "Error": "Video title must be a string."
        });
    }

    if (!video.description || typeof(video.description) !== "string") {
        return res.status(400).json({
            "Error": "Video description must be a string."
        });
    }

    if (!video.minutes || typeof(video.minutes) !== "number") {
        return res.status(400).json({
            "Error": "Video minutes must be a number."
        });
    }

    videos.push(video);
    res.status(201).json(videos);
});

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver elindult localhost:${port}-on.`);
});