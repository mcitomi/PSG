const express = require("express");
const app = express();

const { port } = require("../config.json");

app.use(express.json());

function errorHandler(res, error, message, code) {
    return res.status(code).json({
        "error" : error,
        "message" : message
    });
}

const videos = [
    {
        "id" :  Date.now(),
        "title" : "Videó 1",
        "desc" : "Leírás 1",
        "seconds" : 635
    }
];

// Lekérdezési paraméterek. pl: /videos?title=tutorial

app.get("/videos", (req, res) => {
    const title = req.query.title;

    if(!title) {
        return res.status(200).json(videos);
    }
   
    const results = [];
    videos.forEach(video => {
        if(video.title.includes(title)) {
            results.push(video);
        }
    });
    
    if(results.length) {
        res.status(200).json(results);
    } else {
        errorHandler(res, "404", "Video not found", 404);
    }
});

app.get("/videos/:id", (req, res) => {
    const result = videos.find(video => video.id == req.params.id);

    if(result) {
        res.status(200).json(result);
    } else {
        errorHandler(res, "404", "Video not found", 404);
    }
})

app.post("/videos", async (req, res) => {
    try {
        const body = await req.body;

        if(!body || typeof body != "object" || Object.keys(body).length == 0) { // üres body vizsglat
            return errorHandler(res, "Bad request", "Invalid body", 400);
        }

        if(!body.title || typeof body.title != "string") {
            return errorHandler(res, "Bad request", "Inavlid title", 400);
        }

        if(!body.desc || typeof body.desc != "string") {
            return errorHandler(res, "Bad request", "Inavlid desc", 400);
        }

        if(!body.seconds || typeof body.seconds != "number") {
            return errorHandler(res, "Bad request", "Inavlid seconds", 400);
        }

        const _id = Date.now();

        videos.push({
            "id" : _id,
            "title" : body.title,
            "desc" : body.desc,
            "seconds" : body.seconds
        });

        res.status(201).json({
            "message" : "Values successfully uploaded!",
            "id" : _id
        });
        
    } catch (e) {
        console.log(e);
        
        errorHandler(res, "Internal server error", "Something went wrong", 500);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});