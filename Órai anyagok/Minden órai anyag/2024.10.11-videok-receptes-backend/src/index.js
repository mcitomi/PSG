const express = require("express");
const app = express();

const cors = require("cors");

const { port } = require("../config.json");

app.use(express.json());
app.use(cors());

function errorHandler(res, error, message, code) {
    return res.status(code).json({
        error: error,
        message: message,
    });
}

const recipes = [
    {
        "id": 1,
        "title": "A tökéletes croissant elkészítése",
        "desc": "Lépésről lépésre bemutatjuk a vajas croissant elkészítését.",
        "seconds": 420
    },
    {
        "id": 2,
        "title": "Csokoládé ganache recept",
        "desc": "Hogyan készítsünk sima és gazdag csokoládé ganache-t.",
        "seconds": 210
    },
    {
        "id": 3,
        "title": "Esküvői torta díszítése",
        "desc": "Tippek és trükkök egy lenyűgöző esküvői torta elkészítéséhez.",
        "seconds": 540
    },
    {
        "id": 4,
        "title": "Francia macaron készítése",
        "desc": "Az autentikus francia macaronok titkai.",
        "seconds": 300
    },
    {
        "id": 5,
        "title": "Habcsók készítése",
        "desc": "Tökéletes habcsók recept, amely mindig sikerül.",
        "seconds": 180
    },
    {
        "id": 6,
        "title": "Tiramisu elkészítése",
        "desc": "Egy klasszikus olasz desszert, ami garantáltan elkápráztat.",
        "seconds": 600
    },
    {
        "id": 7,
        "title": "Fondant bevonás technikák",
        "desc": "Sima fondant bevonás a tortákhoz lépésről lépésre.",
        "seconds": 360
    },
    {
        "id": 8,
        "title": "Piskótatészta alaprecept",
        "desc": "Egyszerű, mégis tökéletes piskóta készítése.",
        "seconds": 240
    },
    {
        "id": 9,
        "title": "Profiterol készítése",
        "desc": "Egy klasszikus francia desszert könnyen elkészíthető változata.",
        "seconds": 450
    },
    {
        "id": 10,
        "title": "Citromos tart recept",
        "desc": "Friss és savanykás citromtart recept.",
        "seconds": 400
    },
    {
        "id": 11,
        "title": "Eclair fánk készítése",
        "desc": "Hogyan készítsünk eclair fánkot csokoládés krémmel.",
        "seconds": 510
    },
    {
        "id": 12,
        "title": "Sütemények díszítése málnával",
        "desc": "Kreatív módon használjuk a málnát sütemények díszítésére.",
        "seconds": 220
    },
    {
        "id": 13,
        "title": "Zselatin használata desszertekhez",
        "desc": "Zselatin megfelelő használata a tökéletes textúrához.",
        "seconds": 340
    },
    {
        "id": 14,
        "title": "Torta rétegezési technikák",
        "desc": "Torta rétegek összeállítása és stabilizálása.",
        "seconds": 460
    },
    {
        "id": 15,
        "title": "Gyümölcstorta elkészítése",
        "desc": "Friss gyümölcsökkel készített klasszikus gyümölcstorta.",
        "seconds": 390
    },
    {
        "id": 16,
        "title": "Karamell készítése",
        "desc": "Hogyan készítsünk tökéletes karamellt?",
        "seconds": 300
    },
    {
        "id": 17,
        "title": "Muffin sütése alaprecept",
        "desc": "Könnyű és egyszerű muffin alaprecept.",
        "seconds": 280
    },
    {
        "id": 18,
        "title": "Csokoládé szuflé készítése",
        "desc": "Lágy és gazdag csokoládé szuflé.",
        "seconds": 350
    },
    {
        "id": 19,
        "title": "Epres cheesecake recept",
        "desc": "Sütés nélküli epres cheesecake könnyedén.",
        "seconds": 480
    },
    {
        "id": 20,
        "title": "Keksztekercs készítése",
        "desc": "Gyors és egyszerű keksztekercs recept.",
        "seconds": 290
    },
    {
        "id": 21,
        "title": "Gluténmentes piskóta recept",
        "desc": "Finom és puha gluténmentes piskóta.",
        "seconds": 270
    },
    {
        "id": 22,
        "title": "Sacher torta készítése",
        "desc": "Az eredeti osztrák Sacher torta receptje.",
        "seconds": 520
    },
    {
        "id": 23,
        "title": "Diós zserbó elkészítése",
        "desc": "Hagyományos magyar diós zserbó recept.",
        "seconds": 600
    },
    {
        "id": 24,
        "title": "Szivárvány torta díszítése",
        "desc": "Színes rétegekkel készült torta díszítési tippek.",
        "seconds": 330
    },
    {
        "id": 25,
        "title": "Mille-feuille készítése",
        "desc": "Réteges francia desszert elkészítése otthon.",
        "seconds": 410
    },
    {
        "id": 26,
        "title": "Marcipán figura készítés",
        "desc": "Egyszerű marcipán figurák készítése tortadíszítéshez.",
        "seconds": 360
    },
    {
        "id": 27,
        "title": "Vegán csokis süti recept",
        "desc": "Ízletes és egészséges vegán csokoládés süti.",
        "seconds": 290
    },
    {
        "id": 28,
        "title": "Fondant virágok készítése",
        "desc": "Gyönyörű fondant virágok készítése tortadíszítéshez.",
        "seconds": 240
    },
    {
        "id": 29,
        "title": "Francia vajkrém recept",
        "desc": "Klasszikus francia vajkrém tortákhoz és sütikhez.",
        "seconds": 320
    },
    {
        "id": 30,
        "title": "Csokoládé temperálás otthon",
        "desc": "Hogyan temperáljunk csokoládét egyszerűen.",
        "seconds": 340
    }
];


// Lekérdezési paraméterek. pl: /videos?title=tutorial

app.get("/recipes", (req, res) => {
    const title = req.query.title;

    if (!title) {
        return res.status(200).json(recipes);
    }

    const results = [];
    recipes.forEach((video) => {
        if (video.title.toLowerCase().includes(title.toLowerCase())) {
            results.push(video);
        }
    });

    if (results.length) {
        res.status(200).json(results);
    } else {
        errorHandler(res, "404", "Video not found", 404);
    }
});

app.get("/recipes/:id", (req, res) => {
    const result = recipes.find((video) => video.id == req.params.id);

    if (result) {
        res.status(200).json(result);
    } else {
        errorHandler(res, "404", "Video not found", 404);
    }
});

app.post("/recipes", async (req, res) => {
    try {
        const body = await req.body;

        if (!body || typeof body != "object" || Object.keys(body).length == 0) {
            // üres body vizsglat
            return errorHandler(res, "Bad request", "Invalid body", 400);
        }

        if (!body.title || typeof body.title != "string") {
            return errorHandler(res, "Bad request", "Hibás cím!", 400);
        }

        if (!body.desc || typeof body.desc != "string") {
            return errorHandler(res, "Bad request", "Hibás leírás!", 400);
        }

        if (!body.seconds || typeof body.seconds != "number") {
            return errorHandler(res, "Bad request", "Hibás időtartam!", 400);
        }

        const _id = recipes[recipes.length - 1].id + 1;

        recipes.push({
            id: _id,
            title: body.title,
            desc: body.desc,
            seconds: body.seconds,
        });

        res.status(201).json({
            message: "Values successfully uploaded!",
            id: _id,
        });
    } catch (e) {
        console.log(e);

        errorHandler(res, "Internal server error", "Something went wrong", 500);
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
