const express = require("express");
const app = express();

const cors = require("cors");

const port = 3001;

app.use(express.json());
app.use(cors());

const books = [
    {
        "title" : "Miért használj Rust nyelvet?!",
        "author" : "Molnár Máté Norbert",
        "pages" : 420
    },
    {
        "title" : "Hogyan csinál Tiktok haul videót tutorial kezdőknek 2024",
        "author" : "Sartner Bettina",
        "pages" : 69
    },
    {
        "title" : "Discord sniper írás kezdőknek (teljesen legális)",
        "author" : "Berdó Tamás",
        "pages" : 1337
    },
    {
        "title" : "Discord sniper írás (senkinek nem ajánlott) (teljesen legális) 2",
        "author" : "Berdó Tamás",
        "pages" : 1337
    },
    {
        "title" : "Memóriakezelés VI. fejezet",
        "author" : "Molnár Máté Norbert",
        "pages" : 69420
    }
];

app.get("/books", (req, res) => {
    const title = req.query.title;

    if(title) {
        const book = books.find(book => book.title.toLowerCase().includes(title.toLowerCase()));

        if(book) {
            res.json(book);
        } else {
            res.status(404).json({
                "error" : "Not found!",
                "message" : "This book !exists"
            });
        }
    } else {
        res.json(books);
    }
});

app.get("/books/:index", (req, res) => {
    const book = books[req.params.index];

    if(book) {
        res.json(book);
    } else {
        res.status(404).json({
            "error" : "Not found!",
            "message" : "This book !exists"
        });
    }
});

app.post("/books", (req, res) => {
    const body = req.body;

    if(!body || typeof body != "object" || Object.keys(body).length == 0) {
        res.status(400).json({
            "error" : "Bad request",
            "message" : "Inavlid body"
        });
        return;
    }

    if(!body.title || typeof body.title != "string") {
        res.status(400).json({
            "error" : "Bad request",
            "message" : "Inavlid title"
        });
        return;
    }

    if(!body.author || typeof body.author != "string") {
        res.status(400).json({
            "error" : "Bad request",
            "message" : "Inavlid author"
        });
        return;
    }

    if(!body.pages || typeof body.pages != "number") {
        res.status(400).json({
            "error" : "Bad request",
            "message" : "Inavlid page number"
        });
        return;
    }

    books.push({
        "title" : body.title,
        "author" : body.author,
        "pages" : body.pages
    });

    res.status(201).json(books);
});

app.get("/authors", (req, res) => {
    const authors = [];

    for (const book of books) {
        if(!authors.includes(book.author)) {
            authors.push(book.author);
        }
    }

    res.json(authors);
});

app.listen(port, () => {
    console.info(`Server started on port ${port}!`);
});