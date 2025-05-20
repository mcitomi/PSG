CREATE DATABASE autokereskedes;

USE autokereskedes;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE cars (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    owner INTEGER,
    model VARCHAR(255),
    manufacturer VARCHAR(255),
    price INTEGER,
    FOREIGN KEY(owner) REFERENCES users(id)
);

INSERT INTO users (username, email, password) VALUES ("admin", "admin@admin.hu", "$2a$12$CO8IUKY0Km.aEiRBCSs5CO5MomtvM2osTNaE2D71N46UkW36FwVqa");
INSERT INTO users (username, email, password) VALUES ("dominik", "dominik@admin.hu", "$2a$12$TlwMk/iuNyQ5/V5sWjlhA.QhaN9VrES8CUqSjPVe4pIXLALBHArRG");
INSERT INTO users (username, email, password) VALUES ("tomi", "tomi@admin.hu", "$2a$12$oUBl0knLKG37z3Go0jmqaetBRa7VQSy2.5Y5lc1tj4hiRgc7L/J22");

INSERT INTO cars (owner, model, manufacturer, price) VALUES (1, "Astra", "Opel", 450000);
INSERT INTO cars (owner, model, manufacturer, price) VALUES (2, "Thalia", "Renault", 300000);
INSERT INTO cars (owner, model, manufacturer, price) VALUES (1, "Niva", "Lada", 1250000);
