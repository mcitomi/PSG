import Express, { json } from "express";
import CP from "cookie-parser";
import CORS from "cors";
import argon from "argon2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = Express();

const SECRET = "titok:)";

app.use(json());
app.use(CORS());
app.use(CP());  // A cookie-parser modult is ugyan úgy meg kell hívni mint a CORS-t vagy a json-t.

async function argonTest() {
    let argonResults = await argon.verify(
        "$argon2i$v=19$m=16,t=2,p=1$Z2cxSzF1UFFqeUd0UXFITg$of5Lxr8cVaIX7PyRK9Mz7w", 
        "alma"
    )
    console.log(`Argon: ${argonResults}`);
}

async function bcryptTest() {   
    // nem mindegyik oldal működik, mert php-s bcrypt más mint a js
    // más a prefix, pl ez phps $2y$12$u1i5ezm4.CV9/KgxaYy90uRVHoHoC2SAZR96ZNtTBdiuYGxIsB846
    let bcryptResults = await bcrypt.compare(
        "alma", 
        "$2a$12$Zd9bTHU7LnKkSsO5AdH8WuW6WRtwWYMOaZ2JFy/4OvNOoLQa6AAia",
    );
    console.log(`Bcrypt: ${bcryptResults}`);
}

async function generateBcrypt() {
    console.log(await bcrypt.hash("alma", 12));
}

async function generateArgon() {
    console.log(await argon.hash("alma", {
        type: argon.argon2id,
        memoryCost: 16
    }));
}

argonTest();
bcryptTest();

app.get('/set-cookies', (req, res) => {
    // 1. Általános, kliensoldalon olvasható süti beállítása (pl. egy sötét téma beállításhoz)
    // Ez a süti elérhető a böngésző JavaScript kódjából (document.cookie).

    res.cookie('theme', 'dark', {
        maxAge: 900000, // Lejárat: 15 perc (milliszekundumban kell megadni)
        httpOnly: false // A kliensoldali JS hozzáfér
    });

    // 2. Biztonságos, 3600000httpOnly süti beállítása (pl. egy hitelesítési tokenhez)
    // EZ AZ AJÁNLOTT MÓDSZER BIZTONSÁGOS ADATOKHOZ (pl. JWT).
    // A httpOnly: true megakadályozza, hogy XSS-támadás során a token ellopásra kerüljön.
    res.cookie('auth_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.S6t8w...', {
        maxAge: 3600000, // Lejárat: 1 óra
        httpOnly: true,  // FONTOS: Csak HTTP kérésekkel érhető el, JS-ból nem olvasható.
        secure: false, // csak HTTPS kérés esetén lehet secure
        sameSite: 'strict' // Segít a CSRF támadások elleni védelemben
    });

    res.send('Sütik beállítva. Lekérhető a /read-cookies végponton');
});

app.get('/read-cookies', (req, res) => {
    // A cookie-parser middleware feltölti a req.cookies objektumot
    const allCookies = req.cookies;
    const theme = req.cookies.theme;    // Egy adott cookie így érhető el.
    const authToken = req.cookies.auth_token; // Bár httpOnly, a szerveroldal kiolvassa
    // PL: Böngésző js konzolból a 'document.cookie' paranncsal lekérhetjük a, de csak a nem httpOnly cookiekat

    const jwtToken = jwt.decode(authToken, SECRET);

    res.json({ allCookies, theme, authToken });
});

app.get('/clear-cookies', (req, res) => {
    // A süti törléséhez ugyanazzal a névvel, de lejárt dátummal kell beállítani.
    res.clearCookie('theme');
    res.clearCookie('auth_token');

    res.send('A sütik törölve.');
});

//-----------------------------------------------
// 2.rész: JWT, hitelesites

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // ellenőrzések
    // if(...)

    // 1. Ellenőrzés: Létezik-e már a felhasználó?
    // const existingUser = // db query
    // if (existingUser) {
    //     return res.status(409).json({ message: 'Ez az e-mail cím már regisztrálva van.' });
    // }

    try {
        // 2. Jelszó hashelése argon2-vel
        const hashedPassword = await argon.hash(password);

        // 3. Felhasználó létrehozása
        const newUser = {
            email,
            password: hashedPassword, // A hashelt jelszó tárolása
        };
        
        //db query - eltároljuk az új usert, az adatbázisba kerül a hash

        // 4. Válasz
        res.status(201).json({ 
            message: 'Sikeres regisztráció!'
        });

    } catch (error) {
        console.error('Regisztrációs hiba:', error);
        res.status(500).json({ message: 'Szerveroldali hiba a regisztráció során.' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    //if(...)

    // 2. Felhasználó keresése
    // const user = // db query
    // if (!user) {
    //     // Általános hibaüzenet a biztonság érdekében
    //     return res.status(401).json({ message: 'Hibás e-mail cím vagy jelszó.' });
    // }

    try {
        // 3. Jelszó hashek ellenőrzése
        const passwordMatch = await argon.verify(user.password, password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Hibás e-mail cím vagy jelszó.' });
        }

        // 4. JWT létrehozása
        const token = jwt.sign({id: user.id, role: "admin"}, SECRET);

        // 5. JWT elküldése HTTP-Only sütiben
        // EZ A BIZTONSÁGOS MÓDSZER
        res.cookie('auth_token', token, {
            maxAge: 3600000, // 1 óra (milliszekundumban)
            httpOnly: true,  // Megakadályozza a kliensoldali JS hozzáférést (XSS védelem)
            secure: false, // Csak HTTPS-en kellene True-nak lennie
            sameSite: 'lax' // Védi a CSRF ellen, 'Strict' is jó, de 'Lax' jobban kezeli a navigációt
        });

        // 6. Válasz
        res.json({ 
            message: 'Sikeres bejelentkezés!', 
            userId: user.id 
        });

    } catch (error) {
        console.error('Bejelentkezési hiba:', error);
        res.status(500).json({ message: 'Szerveroldali hiba a bejelentkezés során.' });
    }
});

app.listen(3030, () => {
    console.log("A szerver fut");
});