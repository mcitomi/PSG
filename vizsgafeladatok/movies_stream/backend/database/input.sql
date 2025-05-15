CREATE DATABASE movies DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

use movies;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    director VARCHAR(255),
    title VARCHAR(255),
    price INT
);

CREATE TABLE fav (
    id INT PRIMARY KEY AUTO_INCREMENT,
   	user_id INT,
    movies_id INT
);

ALTER TABLE fav ADD FOREIGN KEY(user_id) REFERENCES users(id);
ALTER TABLE fav ADD FOREIGN KEY(movies_id) REFERENCES movies(id);

INSERT INTO users (username, email, password) VALUES ("admin", "admin@admin.hu", "$2a$12$UeU/BeHo4/X.27fFnXpvWu27xU5FJe.wVYH1OutLl5PhG5X84KRuK");
INSERT INTO users (username, email, password) VALUES ("máté", "máté@admin.hu", "$2a$12$8k9nQs71HcBhb4m9vw0C1O45WfTHE7KOugfp6lBAAwRVcr7K8VeAm");
INSERT INTO users (username, email, password) VALUES ("robin", "robin@admin.hu", "$2a$12$qzofbYzBEYJ6tc.MfVMZJOYgxJ8TOfnl54BTA5j7K0rA4P3jgbYBK");

INSERT INTO movies (director, title, price) VALUES ("Kabay Barna", "Jób lázadása", 1500);
INSERT INTO movies (director, title, price) VALUES ("Dargay Attila", "Vuk", 3500);
INSERT INTO movies (director, title, price) VALUES ("Jankovics Marcell", "Toldi", 1500);

INSERT INTO fav (user_id, movies_id) VALUES (2, 3);

