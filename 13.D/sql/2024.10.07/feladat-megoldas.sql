-- 1.
CREATE DATABASE asd DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

--2. - 3.
CREATE TABLE nevek (id INT AUTO_INCREMENT NOT NULL, nev TEXT, lakhely TEXT, PRIMARY KEY(id));

-- 4. Töltsd fel 5 tetszőleges adattal, abból 2 lakhely ugyan az legyen, 1 kötelezően Aszód
INSERT INTO nevek (id, nev, lakhely) VALUES ('', 'István', 'Balmazújváros');
INSERT INTO nevek (id, nev, lakhely) VALUES ('', 'Édua', 'Aszód');
INSERT INTO nevek (id, nev, lakhely) VALUES ('', 'Norbert', 'Aszód');
INSERT INTO nevek (id, nev, lakhely) VALUES ('', 'Kriszta', 'Aszód');
INSERT INTO nevek (id, nev, lakhely) VALUES ('', 'Manó', 'Balmazújváros');

-- 5. Számold meg kik laknak ugyan abban a városban
SELECT COUNT(nevek.lakhely) as 'emberek', lakhely FROM nevek
GROUP BY lakhely;

-- 6.