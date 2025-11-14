import Express, { json } from "express";
import cors from "cors";
import { createPool } from "mysql2/promise";

const app = Express();

app.use(json());
app.use(cors());

const pool = createPool({
    database: "hardver",
    password: "",
    user: "root",
    host: "localhost",
    connectionLimit: 10
});

app.get("/hardvers/:table", async (req, res) => {
    try {
        const table = req.params.table;

        let result;

        switch (table) {
            case "cpu":
                [result,] = await pool.query("SELECT * FROM cpus;");
                break;

            case "gpu":
                [result,] = await pool.query("SELECT * FROM gpus;");
                break;
        
            default:
                break;
        }

        return res.status(200).json({ message: "ok", result });
    } catch (error) {
        console.log(error);
        
        if (error.message.includes("Invalid")) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: "Server error" });
    }
});

app.post("/hardvers/add/:table", async (req, res) => {
    try {
        const body = req.body;

        const table = req.params.table;

        switch (table) {
            case "cpu":
                if (Object.keys(body).length != 4) {
                    throw new Error("Invalid body");
                }
        
                if (!body.brand || typeof (body.brand) != "string") {
                    throw new Error("Invalid brand");
                }
        
                if (!body.type || typeof (body.type) != "string") {
                    throw new Error("Invalid type");
                }
        
                if (!body.cores || typeof (body.cores) != "number") {
                    throw new Error("Invalid cores");
                }
        
                if (!body.price || typeof (body.price) != "number") {
                    throw new Error("Invalid price");
                }
        
                const [insertResult] = await pool.query("INSERT INTO cpus (brand, type, cores, price) VALUES (?,?,?,?);",
                    [body.brand, body.type, body.cores, body.price]
                );
        
                if (insertResult.affectedRows !== 1) {
                    throw new Error("Database error");
                }
                break;

            case "gpu":
                if(Object.keys(body).length !== 4) {
                    throw new Error("Invalid body");
                }
                if(!body.type || typeof(body.type) !== "string") {
                    throw new Error("Invalid type");
                }
                if(!body.vram || typeof(body.vram) !== "number") {
                    throw new Error("Invalid vram");
                }
                if(!body.price || typeof(body.price) !== "number") {
                    throw new Error("Invalid price");
                }

                const conn = await  pool.getConnection();

                const [results, ] = await conn.query("SELECT * FROM gpus WHERE type = ?", [body.type]);

                if(results.length > 0) {
                    throw new Error("Invalid gpu: its already exists");
                }

                const [gpuInsertResult, ] = await conn.query(`
                    INSERT INTO gpus (brand, type, vram, price)
                    VALUES (?,?,?,?)
                    `, [body.brand, body.type, body.vram, body.price]
                );

                pool.releaseConnection(conn);

                if(gpuInsertResult.affectedRows !== 1) {
                    throw new Error("Failed to add a new gpu");
                }
                break;
        
            default:
                throw new Error("Invalid table");
        }        

        return res.status(200).json({ message: "ok" });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
});

app.delete("/hardvers/remove", async (req, res) => {
    try {
        const type = req.query.type;
        const price = parseInt(req.query.price);

        console.log(type, price);

        if (!type) {
            throw new Error("Invalid type");
        }

        if (!price || isNaN(price)) {
            throw new Error("Invalid price");
        }

        const conn = await pool.getConnection();

        const [queryResult, ] = await conn.query(`
            SELECT * FROM cpus
            WHERE price = ? AND type = ?;
            `, [price, type]
        );

        if(queryResult.length < 1) {
            throw new Error("Not found");
        }

        const [deleteResult] = await conn.query(`
            DELETE FROM cpus
            WHERE type = ? AND price = ?;
            `, [type, price]
        );

        pool.releaseConnection(conn);

        if (deleteResult.affectedRows == 0) {
            throw new Error("Database error");
        }

        return res.status(200).json({ message: "Deleted" });

    } catch (error) {
        if (error.message.includes("Invalid")) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message.includes("Not found")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
});

app.patch("/hardvers/update/:table", async (req, res) => {
    try {
        const body = req.body;
        const tableKey = req.params.table;

        if(Object.keys(body).length !== 2) {
            throw new Error("Invalid body");
        }
        if(!body.price || typeof(body.price) != "number") {
            throw new Error("Invalid price");
        }
        if(!body.type || typeof(body.type) != "string") {
            throw new Error("Invalid type");
        }

        let table;

        switch (tableKey) {
            case "gpu":
                table = "gpus";
                break;

            case "cpu":
                table = "cpus";
                break;
        
            default:
                throw new Error("Invalid table name");
        }

        const conn = await pool.getConnection();

        const [gpuQueryResult2] = await conn.query(`SELECT * FROM ${table} WHERE type = ?;`, [body.type]); 

        if(gpuQueryResult2.length < 1) {
            throw new Error("Not found");
        }

        const [updateResult] = await conn.query(`UPDATE ${table} SET price = ? WHERE type = ?;`, [body.price, body.type]);

        if(updateResult.affectedRows !== 1) {
            throw new Error("Failed to update price");
        }

        return res.status(200).json({message: "updated"});

    } catch (error) {
        console.log(error);
        
        if (error.message.includes("Invalid")) {
            return res.status(400).json({ message: error.message });
        }
        if (error.message.includes("Not found")) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log(`Server runnin at port 3000`);
});
