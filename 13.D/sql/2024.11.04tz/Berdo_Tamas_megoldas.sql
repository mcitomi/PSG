-- 8.feladat
CREATE DATABASE paralimpia DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

-- 10.feladat
INSERT INTO jatekok (sorszam, evszam, varos, orszag) VALUES ("XVII", 2024, "Párizs", "Franciaország");

-- 11.feladat
UPDATE versenyszamok SET versenyszamok.versenyszam = "vegyespáros" WHERE versenyszamok.id = 9;

-- 12.feladat
DELETE FROM sportagak WHERE sportagak.sportag = "Lovaglás";

-- 13.feladat
SELECT jatekok.evszam, jatekok.varos FROM jatekok
WHERE jatekok.evszam < 2021
ORDER BY jatekok.evszam DESC
LIMIT 5;

-- 14.feladat
SELECT sportagak.sportag, COUNT(sportagak.id) as "versenyszamok" FROM sportagak
INNER JOIN versenyszamok ON versenyszamok.sportagId = sportagak.id
GROUP BY sportagak.id;

-- 15.feladat
SELECT eredmenyek.jatekId as "jatek", eredmenyek.helyezes as "hely", sportagak.sportag, olimpikonok.nev as "bajnokok" FROM eredmenyek
INNER JOIN olimpikonok ON olimpikonok.id = eredmenyek.olimpikonId
INNER JOIN versenyszamok ON versenyszamok.id = eredmenyek.versenyszamId
INNER JOIN sportagak ON sportagak.id = versenyszamok.sportagId
WHERE eredmenyek.helyezes <= 3 AND olimpikonok.nev LIKE "%,%"
ORDER BY eredmenyek.helyezes ASC, sportagak.sportag ASC;
