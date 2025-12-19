CREATE DATABASE games;

USE games;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE games (
    id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT,
    developer VARCHAR(255),
    name VARCHAR(255),
    price INT
);

ALTER TABLE games ADD FOREIGN KEY (owner_id) REFERENCES users(id);

INSERT INTO users (username, email, password) VALUES
("admin", "admin@admin.hu", "$2a$12$ceWSszmlVZ5eJ1fKDBI5be7cJr4xsF49Gu/A5EFdee8.fZl9lPGJi"),
("dominik", "dominik@gmail.com", "$2a$12$cCDmcW0zBzkSaRUGrepT7.ozHczXgmOLygzAM0yKgQof6i.aXvPmC"),
("krisz", "krisz@gmail.com", "$2a$12$cCDmcW0zBzkSaRUGrepT7.ozHczXgmOLygzAM0yKgQof6i.aXvPmC");

INSERT INTO games (owner_id, developer, name, price) VALUES
(1, "Epic Games", "Fortnite", 0),
(1, "Rockstar Games", "GTA V", 5000),
(1, "EA Sports", "EAFC", 15000);