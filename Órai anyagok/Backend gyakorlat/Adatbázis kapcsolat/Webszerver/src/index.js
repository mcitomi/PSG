// Mivel mostmár ESModule-okat használunk, használhatjuk a modernebb, tisztább
// importálásokat. u.a. mintha úgy importálnánk, hogy
// const express = require("express");
// csak ez átláthatóbb, jobban látszik már rögtön amint ránézünk a sorra, hogy
// itt importálunk valamit valahonnan.
//
// A mysql2 packagen belül több fajta megoldás van, az, ami leginkább ahhoz
// hasonló, amit mi tanulunk az a promise. Ezen belül van egy mysql objektum,
// amin vannak létrehozva a createConnection, createPool, stb függvények. Ahhoz,
// hogy mi ezeket használjuk, be kell hívni a mysql objektumot, a mysql2/promise
// packageből.
import mysql from "mysql2/promise";
import express from "express";

const app = express();
const PORT = 3000;

// A Connection Pool több kapcsolatot tart egyszerre az adatbázissal, ezzel
// optimálisabban tudjuk kezelni a kéréseket, és akár ha több jön, nem kell
// várnia az egyiknek, amíg a másik befejezi az adatbázissal való
// kommunikációját.
const pool = mysql.createPool({
    host: "localhost",
    user: "testing",
    password: "testing",
    database: "teaching_site",
});

app.use(express.json());

// Ha szeretnénk egy async függvényt csinálni név nélkül, csak megadhatjuk a
// nyílfüggvény (() => {}) elé, hogy async, és használhatjuk benne az await
// kulcsszót onnantól. Ez u.a., mintha async függvényt létrehoznánk, és azt
// adnánk át ide.
app.get("/teachers", async (req, res) => {
    try {
        let name = req.query.name;

        let results;
        if (name && typeof name !== "string") {
            // Mostmár a hibákat itt is try-catch módon kezeljük, ahelyett,
            // hogy itt visszaadnánk a kérést rögtön, dobjunk hibát.
            // Ok: lásd a catch blokkban.
            throw new Error("Parameter 'title' must be a string.");
        } else if (name) {
            // [results]: destruktúrálás. ha pl. van egy tömböm: [1, 2, 3]
            // akkor azt megtehetném, hogy
            // let [a, b, c] = [1, 2, 3];
            // így az a = 1, b = 2, c = 3.
            // Ezt használjuk itt is, mivel a pool.query() függvény egy tömböt
            // ad vissza, amelynek első értéke az SQL lekérdezés, második pedig
            // a mezők nevei (pl. itt id, name, age).
            // Ha nem adjuk meg az összes értéket, a kimaradókat "eldobja",
            // úgy, mintha vissza sem adta volna.
            //
            // Ha szeretnénk átadni plusz értékeket az adatbázisnak, ?
            // karakterrel jelöljük, hogy hova kerüljenek ezek be, és a
            // függvénynek átadunk második paraméterként egy tömböt, amely
            // tartalmazza azokat, amiket behelyettesít a ?-ek helyére.
            // Nyílván fontos, hogy a tömb hossza megegyezzen a ?-ek számával,
            // és típusuk megfelelő legyen.
            //
            // SQL Injection miatt adjuk át így.
            //
            // Azért `%${name}%`, mivel azt szeretnénk, hogy a like kifejezés
            // után úgy adja át hogy pl. %Máté%, hogy ne csak teljes egyezés
            // esetén adja vissza az értékeket.
            [results] = await pool.query(
                "select * from teachers where name like ?;",
                [`%${name}%`],
            );
        } else {
            // Ismét destruktúrálás, viszont itt már nem adunk át több dolgot
            // az adatbázisnak, hiszen így már mindent szeretnénk, hogy
            // visszaadjon és továbbküldjük a kliensnek.
            [results] = await pool.query("select * from teachers;");
        }

        // Innentől már a results változóban benne lesz a tömb, amit az
        // adatbázis visszaadott, így kezelhetjük ugyanúgy, mintha csak
        // egy sima tömb lenne (mivel az is).
        res.json(results);
    } catch (err) {
        // Try-catch blokkban kezeljük a hibákat, hiszen így jobban elkülünöl,
        // hogy melyik ág a "normális", hibátlan, és melyik ág az, ahol a hibák
        // vannak. (Try: hibátlan, catch: hibák.)
        //
        // Ha a hibának az üzenete (err.message) tartalmazza azt a szöveget,
        // amit mi fent megadtunk, akkor már küldhetjük tovább a kliensnek,
        // hiszen már egyszer mi formáztuk ezt a szöveget megfelelően.
        if (err.message.includes("Parameter 'title'")) {
            // Az objektum kulcsa "error", az értéke pedig az err változón
            // belül található message mező, ami tartalmazza azt a szöveget,
            // amit a throw utasításnál megadtunk neki.
            // Így nem kell ismételni magunkat, ugyanazt a hibaüzenetet
            // többször leírni, csak egyszer leírjuk, ellenőrizzük, hogy az-e
            // később, ha igen, akkor pedig csak szimplán továbbküljük a
            // kliensnek.
            res.status(400).json({
                error: err.message,
            });
            // Ne fusson tovább ezután a függvény, hiszen már küldtünk választ
            // a kliensnek.
            return;
        }

        // Ha ide eljütünk, az azt jelenti, hogy nem olyan hibát kaptunk el,
        // amit mi dobtunk.
        // Más hibalehetőség ilyenkor nincsen, csak az, hogy az adatbázisból
        // való lekérdezés dobott valamilyen hibát.
        // Ezt lehetne jobban, bővebben lekezelni, de egyelőre elég annyi,
        // hogy visszaaduk a kliensnek, hogy "nálunk volt valami baj.".
        // Ezt az 500 státuszkóddal tehetjük meg, mely Internal Server Errort
        // jelent.
        res.status(500).json({
            error: "Couldn't query teachers.",
        });
    }
});

// u.a. mint az előző, csak lekérdezési paraméter helyett útvonal paramétert
// használ, és ha nincs megadva, nem ad vissza mindent, hanem hibát dob.
app.get("/teachers/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);

        if (isNaN(id)) {
            throw new Error("Parameter 'id' must be a valid integer.");
        }

        if (id < 0) {
            throw new Error("Parameter 'id' must be greater than 0.");
        }

        let [results] = await pool.query(
            "select * from teachers where id = ?;",
            [id],
        );

        res.json(results);
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

app.post("/teachers", async (req, res) => {
    try {
        const body = req.body;

        // Mostmár ellenőrizzük jobban azt, hogy mit ad meg a felhasználó.
        //  !body: nem adott meg törzset.
        //  typeof body !== "object": nem objektumot adott meg törzsként
        //      (hanem pl. szöveget)
        //  Object.keys(body).length == 0: objektumot adott meg, viszont annak a
        //      hossza nem 2. Object.keys(...).length segítségével megnézhetjük,
        //      hogy a megadott objektumnak hány kulcsa van. (kulcs: a
        //      kettőspont előtti rész. pl. {name: "Máté"} esetén name a kulcs.)
        if (
            !body ||
            typeof body !== "object" ||
            Object.keys(body).length !== 2
        ) {
            throw new Error("Invalid request body.");
        }

        if (!body.name || typeof body.name !== "string") {
            throw new Error(
                "Invalid 'name' field, must be given and must be a string.",
            );
        }

        if (!body.age || typeof body.age !== "number") {
            throw new Error(
                "Invalid 'age' field, must be given and must be a number.",
            );
        }

        // Extra ellenőrzés, tanárnak kora ne legyen kevesebb mint 18, vagy
        // több mint 75.
        if (body.age < 18 || body.age > 75) {
            throw new Error("Invalid 'age' field, must be between 18 and 75.");
        }

        // Most az adatbázisnak több adatot is átadunk, az újonnan hozzáadott
        // tanár nevét, és korát. Ezt megtesszük kettő ? segítségével, és a
        // tömbbe kettő értéket adunk, első a név, második a kor.
        //
        // SQL lekérdezés végén lévő "returning *" azt mondja meg az
        // adatbázisnak, hogy adjon vissza minden értéket, amit a mostani
        // utasítás behelyezett a táblába. Igazából ugyanazt fogjuk visszakapni,
        // mint ami a body.name, és a body.age, viszont mellé megkapjuk az id-t
        // is, hiszen az adatbáziskezelő automatikusan adott ezt is a tanárnak.
        // Így nem kell egy külön utasítással lekérdezni azt is, hanem egyben
        // megtehetjük a kettőt (gyorsabb is, hiszen kettő lekérdezés logikusan
        // kétszer annyi idő, mint egy :))
        // let [result] = await pool.query(
        //     "insert into teachers (name, age) values (?, ?) returning *;",
        //     [body.name, body.age],
        // );
        //
        // // 201 Created státuszkóddal adjuk vissza az újonnan létrehozott tanárt.
        // res.status(201).json(result);
        

        // let [result, ] = await pool.query(
        //     "insert into teachers (name, age) values (?, ?) returning *;",
        //     [body.name, body.age],
        // );
        //
        // res.status(201).json(result);
        

        await pool.query(
            "insert into teachers (name, age) values (?, ?);",
            [body.name, body.age],
        );

        let [result, ] = await pool.query(
            "select * from teachers;"
        );

        res.status(201).json(result);
    } catch (err) {
        // Az összes olyan hiba, amelyet mi dobtunk, úgy kezdődik, hogy
        // "Invalid", tehát elég azt ellenőriznünk, hogy tartalmazza-e ezt
        // a szöveget a hibának az üzenete, ha igen, akkor olyan hibát kaptunk
        // el, amit mi hoztunk létre.
        if (err.message.includes("Invalid")) {
            // Ebben az esetben megint elég visszaküldeni az általunk már
            // egyszer leírt hibaüzenetet.
            res.status(400).json({
                error: err.message,
            });
            return;
        }

        // És megint, ha nem olyan hiba van, akkor biztosan az adatbázistól
        // kaptunk valamilyen hibát. Ebben az esetben megint 500 Internal
        // Server Error státuszkóddal válaszoljunk a kliensnek, hogy jelezzük
        // neki, hogy "nálunk van a hiba, nem nálad."
        res.status(500).json({
            error: "Couldn't insert teacher.",
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}.`);
});
