CREATE TABLE irok (
	iro_id INT PRIMARY KEY AUTO_INCREMENT,
    neve VARCHAR(30)
)

CREATE TABLE konyvek (
    konyv_id INT PRIMARY KEY AUTO_INCREMENT,
    cim VARCHAR(200)
)

CREATE TABLE konyv_iro (
    iro_id INT,
    konyv_id INT 
)

-- 2.
ALTER TABLE konyv_iro
ADD FOREIGN KEY (iro_id)
REFERENCES irok(iro_id);

ALTER TABLE konyv_iro
ADD FOREIGN KEY (konyv_id)
REFERENCES konyvek(konyv_id);

-- 3.
INSERT INTO irok (neve) VALUES ("J.K. Rowling");
INSERT INTO irok (neve) VALUES ("George Orwell");
INSERT INTO irok (neve) VALUES ("J.R.R. Tolkien");

INSERT INTO konyvek (cim) VALUES ("Harry Potter and the Philosopher\'s Stone");
INSERT INTO konyvek (cim) VALUES ("1984");
INSERT INTO konyvek (cim) VALUES ("The Hobbit");

-- 4.
INSERT INTO konyv_iro (iro_id, konyv_id) VALUES (1,1);
INSERT INTO konyv_iro (iro_id, konyv_id) VALUES (2,2);
INSERT INTO konyv_iro (iro_id, konyv_id) VALUES (3,3);

-- 5.
SELECT irok.neve, konyvek.cim FROM konyv_iro
INNER JOIN konyvek ON konyvek.konyv_id = konyv_iro.konyv_id
INNER JOIN irok ON irok.iro_id = konyv_iro.iro_id;

-- 6.
SELECT irok.neve FROM konyv_iro
INNER JOIN konyvek ON konyvek.konyv_id = konyv_iro.konyv_id
INNER JOIN irok ON irok.iro_id = konyv_iro.iro_id
WHERE konyvek.cim = "1984";

-- 7.
SELECT konyvek.cim FROM konyv_iro
INNER JOIN konyvek ON konyvek.konyv_id = konyv_iro.konyv_id
INNER JOIN irok ON irok.iro_id = konyv_iro.iro_id
WHERE irok.neve = "J.K. Rowling";

-- Berdó Tamás ~ mcitomi ~ meowmeow ~ https://mcitomi.hu/ ~ @mcitomi ~ instagram: btamas005 
