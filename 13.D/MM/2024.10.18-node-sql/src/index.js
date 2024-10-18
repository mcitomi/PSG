import { createPool } from "mysql2/promise";  // module módszer -> package.json-ben type: module

// const mysql2 = require("mysql2");    // commandjs modszer

// connection.query("SELECT * FROM autok;", (err, res) => {     // callback-es módszer
//     if(err) {
//         return console.error(err);
//     } 

//     console.log(res);
// });

async function main() {     // async modulejs adatbazis keres
    const connection = createPool({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "autok"
    });

    try {
        // visszatér az értékekkel és a mező tulajdonságokkal, de itt a tulj.kat eldobjuk (nem tároljuk valtozoba)
        const [results, ] = await connection.query("SELECT * FROM autok WHERE marka = ?;", ["BMW"]);

        console.log(results);
    } catch (error) {
        console.error("Lekérdezési hiba");
    }
}

main();
