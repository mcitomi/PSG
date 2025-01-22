import Express, { json } from "express";
import { createPool } from "mysql2/promise";

const app = Express();

app.use(json());

const pool = createPool({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'orders'
});

app.post("/orders", async (req, res) => {
    try {
        const body = req.body;
        
        if(Object.keys(body).length !== 2) {
            throw new Error(
                "Invalid body field count! (user_id, product_ids)"
            );
        }
        
        if(!body.user_id || typeof(body.user_id) != "number") {
            throw new Error(
                "Invalid user_id field"
            );
        }
        
        if(!body.product_ids || typeof(body.product_ids) != "object") {
            throw new Error(
                "Invalid product_ids field"
            );
        }
        
        const [queryResults, ] = await pool.query(
            "SELECT * FROM users WHERE id = ?",
            [body.user_id]
        );

        if(queryResults.length == 0) {
            throw new Error("Invalid user_id field, user not exists");
        }

        const currentDate = new Date();

        const connection = await pool.getConnection();

        connection.beginTransaction();    // ezzel megkezdünk egy tranzakciót
        // ez azt jelenti, hogy a sorban következő lekérdezések egy összefüggő lekérdezésnek számítanak
        // így pl ha egyikük is hibázik, akkor a tranzakció mhibásnak minősül

        for (const product_id in body.product_ids) {
            const [insertResults, ] = await pool.query(
                "INSERT INTO orders (user_id, product_id, date) VALUES (?, ?, ?)",
                [body.user_id, product_id, currentDate]
            );
        }

        connection.commit();  // a committal futtatjuk és véglegesítjük
        connection.end(); // majd lezárjuk a tranzakciót

        res.status(200).json({
            "message" : "Order places successfully"
        });

    } catch (error) {
        res.status(500).json({
            "message" : error.message
        })
    }
});

app.listen(3000, () => {
    console.log("App started");
});