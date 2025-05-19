CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    pass TEXT
);

CREATE TABLE movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    director TEXT,
    price INTEGER
);

CREATE TABLE favourites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    movieId INTEGER,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(movieId) REFERENCES movies(id)
);

INSERT INTO users (username, email, pass) VALUES ("admin", "admin@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$cFdsclZ3cExmVDVZbDRyWA$jXDhahreQjhSX6VGS1Rvvw");
INSERT INTO users (username, email, pass) VALUES ("máré", "máré@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$cFdsclZ3cExmVDVZbDRyWA$tpfXi+xSLHa4KnbiatW+RQ");

INSERT INTO movies (title, director, price) VALUES ("Legjobb film!!", "Sartner B", 2500);
INSERT INTO movies (title, director, price) VALUES ("UWU kislanyok", "Berdó T", 9500);
INSERT INTO movies (title, director, price) VALUES ("Kaszino online", "Decsi01", 11599);