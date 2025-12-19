import mysql from 'mysql2/promise';

async function main() {
    const connection = mysql.createPool({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "autok"
    });

    try {
        let [result, ] = await connection.query(
            "SELECT * FROM auto;"
        );
        
        console.log("Az autók lekérdezése adatbázisból...");
        console.log("Az eredmény: ");
        console.log(result);
    } catch {
        console.log("Nem sikerült lekérdezni az adatbázisból.")
    }


    let [result2, ] = await connection.query(
        "SELECT * FROM autok WHERE marka LIKE ?;",
        ["BMW"]
    );

    console.log("Az autók BMW márkával:");
    console.log(result2);
}

main();