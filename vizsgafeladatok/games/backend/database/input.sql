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
    owner INT,
    developer VARCHAR(255),
    name VARCHAR(255),
    price INT
);

ALTER TABLE games ADD FOREIGN KEY(owner) REFERENCES users(id);

INSERT INTO users (username, email, password) VALUES 
("admin", "admin@admin.hu", "$2a$12$3hA3ZIpERFNT.kLsXFBUfuE4e2r4l3xTCHuNF3.Batbo1G9rwaxJC"),
("dominik", "dominik@admin.hu", "$2a$12$XX6i5hqpqYCsH0MZ4m9VwOEs9sv5.4ls.flHS.B8p3EVcYdaLA.3m"),
("asd", "asd@admin.hu", "$2a$12$McJcS7aqT9GyIefIo.BU4.O8M5ObRQO2IMpG.R3IMsTw1EzrBP.NG");

INSERT INTO games (owner, developer, name, price) VALUES
(1, "Epic Games", "Fortinte", 0),
(1, "Rackstar", "GTA V", 5000),
(1, "Minecraft", "Notch", 3000);