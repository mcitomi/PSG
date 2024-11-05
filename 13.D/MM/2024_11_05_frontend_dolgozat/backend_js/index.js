import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

let albums = [
    {
        artist: "Kendrick Lamar",
        title: "To Pimp a Butterfly",
    },
    {
        artist: "Radiohead",
        title: "OK Computer",
    },
    {
        artist: "Radiohead",
        title: "In Rainbows",
    },
];

app.get("/albums", (req, res) => {
    try {
        let title = req.query.title;

        let results = [];
        if (title && typeof title !== "string") {
            throw new Error("Parameter 'title' must be a string.");
        } else if (title) {
            for (const album of albums) {
                if (album.title.toLowerCase().includes(title.toLowerCase())) {
                    results.push(album);
                }
            }
        } else {
            results = albums;
        }

        res.json(results);
    } catch (err) {
        if (err.message.includes("Parameter 'title'")) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }

        console.error(err);
        res.status(500).json({
            error: "Something went wrong.",
        });
    }
});

app.get("/albums/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Parameter 'id' must be a valid integer.");
        }

        if (id < 0) {
            throw new Error("Parameter 'id' must be greater than 0.");
        }

        res.json(albums[id]);
    } catch (err) {
        if (err.message.includes("Parameter 'id'")) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }

        res.status(500).json({
            error: "Coudln't query teachers.",
        });
    }
});

app.post("/albums", (req, res) => {
    try {
        const body = req.body;

        if (
            !body ||
            typeof body !== "object" ||
            Object.keys(body).length !== 2
        ) {
            throw new Error("Invalid request body.");
        }

        if (!body.artist || typeof body.artist !== "string") {
            throw new Error(
                "Invalid 'artist' field, must be given and must be a string.",
            );
        }

        if (!body.title || typeof body.title !== "string") {
            throw new Error(
                "Invalid 'title' field, must be given and must be a string.",
            );
        }

        let album = {
            artist: body.artist,
            title: body.title,
        };

        albums.push(album);

        res.status(201).json(album);
    } catch (err) {
        if (err.message.includes("Invalid")) {
            res.status(400).json({
                error: err.message,
            });
            return;
        }

        res.status(500).json({
            error: "Couldn't insert teacher.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
