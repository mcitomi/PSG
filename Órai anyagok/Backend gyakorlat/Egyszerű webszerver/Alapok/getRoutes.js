// Futtatáshoz:
// 1. npm init -y
// 2. npm i express
// 3. illeszd be a src/mappába ezt a fájlt, index.js néven pl.
// 4. package.json-ban írd át a "main" mezőt arra, ahova ezt a fájlt tetted.
// 5. node .

// npm-ből behívott packageket (csomagokat) így tudjuk elérni
// a programjainkban.
const express = require('express');

const app = express();

// Végpontok megadásához az Express-en belül minden HTTP Method-ra
// van egy függvény, amit meg lehet hívni. Ezzel megadjuk, hogy
// ez a végpont milyen metódust használ, első paraméterben az elérési
// útvonalat, másodikban a függvényt, amely lefut ha küldenek ide
// egy kérést.
app.get('/health_check', (request, response) => {
    // JSON formátumban nagyon egyszerűen, a Response objektumon belül
    // található JSON-nek átadhatunk egy adatot, amit visszaküld a
    // kliensnek.
    response.json({
        status: "active"
    })
});

// Kb. ugyanaz, mint GET /health_check, csak itt egy tömb van benne.
app.get('/posts', (req, res) => {
    res.json({
        posts: [
            "Megnyílt a 2024/25-ös tanév",
            "Be kell szedni a telefonokat",
            "Nem tudunk semmit használni a rendszergazda miatt."
        ]
    });
});

// Szintén ugyanaz, mint az előző kettő kontroller.
app.get('/users', (req, res) => {
    res.json({
        username: "benedekkrisztian2309",
        email: "benedekkrisztian7331@gmail.com",
        password: "asd333"
    });
});

app.get('/cars', (req, res) => {    
    res.json({
        cars: [
            "BMW",
            "Ford",
            "Nissan"
        ]
    });
});

// A szerver futtatásának elindítása. Várja paraméterben a portot,
// ahol futni fog, és hallgatni az érkező kéréseket, második paraméterben
// pedig megadhatunk egy függvényt, amely lefut, ha elindult a szerver.
app.listen(3000, () => {
    console.log("A szerver fut localhost: 3000-en!");
})