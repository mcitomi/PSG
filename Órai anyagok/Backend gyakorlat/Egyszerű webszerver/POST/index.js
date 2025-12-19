// using System.IO;
const express = require("express");

const app = express();

app.use(express.json());

app.get("/health_check", (request, response) => {
    // KONYHA
    response.json({
        "status": "active"
    });
});

// név, autó, ár, állapot
let products = [
    {
        "name": "Katalizátor",
        "car": "Chevrolet Lacetti",
        "price": 10000,
        "condition": 5
    },
    {
        "name": "Katalizátor",
        "car": "Suzuki Swift",
        "price": 5000,
        "condition": 3
    },
    {
        "name": "Katalizátor",
        "car": "Opel Astra",
        "price": 7000,
        "condition": 8
    }
];

app.get("/products", (request, response) => {
    response.json(products);
});

app.post("/products", (request, response) => {
    const body = request.body;

    if (!body) {
        return response.status(400).json({
            "error": "Bad Request",
            "message": "A kérésnek tartalmaznia kell egy törzset."
        });
    }

    if (!body.name || typeof(body.name) !== "string") {
        return response.status(400).json({
            "error": "Bad Request",
            "message": "A kérésnek tartalmaznia kell egy 'name' mezőt, amelynek szövegnek kell lennie."
        });
    }

    if (!body.car || typeof(body.car) !== "string") {
        return response.status(400).json({
            "error": "Bad Request",
            "message": "A kérésnek tartalmaznia kell egy 'auto' mezőt, amelynek szövegnek kell lennie."
        });
    }

    if (!body.price || typeof(body.price) !== "number") {
        return response.status(400).json({
            "error": "Bad Request",
            "message": "A kérésnek tartalmaznia kell egy 'price' mezőt, amelynek számnak kell lennie."
        });
    }

    if (!body.condition || typeof(body.condition) !== "number") {
        return response.status(400).json({
            "error": "Bad Request",
            "message": "A kérésnek tartalmaznia kell egy 'condition' mezőt, amelynek számnak kell lennie."
        });
    }

    products.push(body);
    response.status(201).json(products);
});

const port = 3000;
app.listen(port, () => {
    console.log(`A szerver fut localhost:${port} porton.`);
});