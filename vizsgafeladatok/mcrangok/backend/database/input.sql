CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT
);

CREATE TABLE rangok (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INT,
    color TEXT,
    price TEXT,
    name TEXT,
    FOREIGN KEY(userId) REFERENCES users(id)
);

INSERT INTO users (username, email, password) VALUES
("admin", "admin@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$t3csHvmY1IV2d6vrruqq/Q"),
("xxxpvppro", "xxxpvppro@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$22zoBRR/2WDOM/QAsvzcdA"),
("kissa", "kissa@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$Er4I4JhyyuwZ+Emi0XDhmg"),
("mateka2011", "mateka2011@admin.hu", "$argon2id$v=19$m=16,t=2,p=1$RnZrRTYwU0tRV3owMEs5TA$YSGknPHLcUxYePPJ1j9oaw");

INSERT INTO rangok (userId, color, name, price) VALUES
(2, "piros", "zsírkirály", 12000),
(3, "narancs", "mindenható", 7000),
(1, "kék", "funfunfun", 9999999);
