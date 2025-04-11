import { Database } from "bun:sqlite";

export default (db: Database) => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            display_name TEXT,
            password TEXT
        )`
    );
    
    db.run(`
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INT,
            title TEXT,
            content TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`
    );
    
    db.run(`
        CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INT,
            post_id INT,
            UNIQUE (user_id, post_id),
            FOREIGN KEY (post_id) REFERENCES posts(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`
    );
}