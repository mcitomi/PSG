// express, cors, jsonwebtoken, mysql2, bcryptjs/argon2 (jelszó hasheléshez)

import express, { json } from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";
import jwt from "jsonwebtoken";
import argon from "argon2";

const app = express();
const PORT = 3000;
const JWT_SECRET = 'nagyon_titkos_kulcs';

// MySQL2 adatbázis (most teszt adatok csak)
const usersDB = [
    { id: 1, username: 'admin', password: 'adminpass', role: 'admin' },
    { id: 2, username: 'user', password: 'userpass', role: 'guest' }
];

app.use(express.json());
app.use(cors());

// Globális middleware: PL cors, express.json
// Minden kérésen lefut, az egész alkalmazásra érvényes
function applicationLevelLogger(req, res, next) {
    console.log(`[ALKALMAZÁS LOG] Érkezett kérés: ${req.method} ${req.url} - ${new Date().toLocaleTimeString('hu-HU')}`);
    next();
}

app.use(applicationLevelLogger);


// Endpointnál meghívható middleware
function checkAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("[AUTH MW] Hiányzó 'Bearer' token.");

        // Ha hibát talál nem hívjuk meg a next() függvényt, csak válaszolunk a kérésre és return
        // Tehát megszakítjuk a kérést mieőtt az endpointhoz eljutna
        return res.status(401).json({ message: 'Hozzáférés megtagadva! Token szükséges.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Token ellenőrzése és dekódolása
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("[AUTH MW] Sikeres hitelesítés (JWT). User ID:", decoded.id);
        // Hozzáadjuk a dekódolt user adatokat a kéréshez
        // Így majd hivatkozhatunk a "req.user"-re a végpontban is
        req.user = decoded;
        next(); // ezzel lépünk tovább a middleware-ből
    } catch (error) {
        console.log(`[AUTH MW] Sikertelen hitelesítés: ${error.message}`);
        // next() nélkül lezárjuk a ciklust, ha hibát kaptunk valahol
        return res.status(401).json({ message: `Hozzáférés megtagadva! ${error.message}` });
    }
}

// Nyilvános végpont (nincs szükség hitelesítésre)
app.get('/', (req, res) => {
    res.json({ message: 'Üdvözlünk! Ez egy publikus felület.' });
});

// Login végpont: Csak akkor fut le ha a JWT sikeres volt
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Hiányzó felhasználónév vagy jelszó.' });
    }

    try {
        // const passHash = argon.hash(body.password, {
        //     type: argon2id,
        //     timeCost: 2,
        //     memoryCost: 18
        // });

        const [rows] = await db.query(
            'SELECT id, username, role, password FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó.' });
        }

        const user = rows[0];

        if (!argon.verify(user.password, body.password)) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó.' });
        }

        // JWT generálása
        const payload = { id: user.id, username: user.username, role: user.role };
        const token = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: "2d"});

        res.json({
            message: 'Sikeres bejelentkezés!',
            token: token,
            user: { id: user.id, username: user.username, role: user.role }
        });

    } catch (error) {
        console.error("Adatbázis/Bejelentkezési hiba:", error.message);
        // Továbbküldjük a hibát a hibakezelő middleware-nek
        next(error);
    }
});

// Védett végpont: a checkAuthMiddleware lefut a kontroller előtt
app.get('/admin', checkAuthMiddleware, (req, res) => {
    // Ha ide eljut a kérés, a JWT érvényes volt, és a user adatok elérhetők a req.user-ben.
    res.json({
        message: 'Admin Panel adatok betöltve.',
        userData: req.user,
        info: 'Csak érvényes tokennel érhető el.'
    });
});

// Végpont, ami hibát generál (a hibakezelő middleware-t aktiválja)
app.get('/data', (req, res, next) => {
    throw new Error("Valami hiba");
});

// Ez akkor fut le, ha a kérés nem illeszkedett egyetlen fenti útvonalra sem.
app.use((req, res, next) => {
    console.log(`[404 NOT FOUND] Nem található útvonal: ${req.method} ${req.url}`);
    res.status(404).json({
        error: {
            message: 'A kért erőforrás/végpont nem található.',
            statusCode: 404
        }
    });
    // Itt nem hívunk next()-et, mert lezárjuk a kérés-válasz ciklust.
    // Pont ezért működik ez a middleware, ha már fentebb egy végpont válaszol egy kérésre,
    // azzal megszakítja a kérés-válasz ciklust
});

// Hibakezelő middleware
// Ezt utolsónak kell regisztrálni, mert így tud minden kérés után futni
app.use((err, req, res, next) => {
    console.error(`\n--- HIBA ---`);
    console.error(`Típus: ${err.name} | Üzenet: ${err.message}`);

    const statusCode = err.status || 500;

    res.status(statusCode).json({
        error: {
            message: (statusCode === 500) ? "Belső szerverhiba." : err.message,
            statusCode: statusCode,
            details: 'A kérés feldolgozása hiba miatt meghiúsult.'
        }
    });
});


app.listen(PORT, () => {
    console.log(`\nSzerver elindult ezen a címen: http://localhost:${PORT}`);
});

// https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fi%2F73eusy0bc095c9w8tstw.png
