const express = require('express');

const app = express();

// JSON validálásra szolgáló "middleware" (később...), annyi a
// lényeg most, hogy az érkező HTTP kérésnek törzsét JSON-ként
// értelmezi, és feldolgozza.
app.use(express.json())

app.get('/health_check', (request, response) => {
    response.json({
        status: "active"
    })
});


// Elmentjük külön változóba a tömböt, hogy szimuláljuk egy
// adatbázis működését. Ebbe fogunk feltölteni, törölni, stb.
let messages = [
    "Megnyilt a 2024/25 tanév",
    "Be szedték a telefont",
    "Nem tudunk semmit használni rendszergazda miatt"
]

// Mivel a tömb el van mentve külön változóba, ezért csak
// azt adjuk vissza innentől kezdve.
app.get('/posts', (req, res) => {
    res.json({
        posts: messages
    });
});

app.post('/posts', (req, res) => {
    // Ellenőrizzük a beérkező kérés törzsét. Az már biztos, a föntebb
    // beírt sor miatt, hogy hibátlan JSON, viszont lehetséges,
    // hogy annak felépítése nem megfelelő, pl. hiányzik a message
    // mező. Ebben az esetben 400-as státuszkódot adunk vissza.
    // ez a sor == !req.body.message
    if (req.body.message === undefined || req.body.message == null
        || typeof req.body.message !== "string") {
        // Státuszkódot nagyon egyszerűen, a .status() függvénnyel tudunk
        // megadni.
        res.status(400).json({
            error: "Bad Request"
        });
        return;
    }
    // Elmentjük a tömbbe a megkapott üzenetet, ilyenkor már biztos, hogy 
    // jó formátumban, illetve jó mezőkkel lesz a törzs, tehát
    // nem kell már több ellenőrzést végezni.
    messages.push(req.body.message);

    // Szokás, hogy ha sikerült valamit feltölteni, akkor azt visszaadjuk,
    // így látja a kliens, hogy mit sikerült mégis, és akár leellenőrizheti
    // magát. (Itt kihagytunk még valamit, de majd később).
    res.json({
        post: messages
    });
});

app.get('/user', (req, res) => {
    res.json({
        username: "oliver",
        email: "admin@gmail.com"
    })
});

app.listen(3000, () => {
    console.log("A server fut localhost:3000-en.");
});


