-- 1. feladat:
CREATE DATABASE autok DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

-- 2. feladat:
-- import ✅

-- 3. feladat:
SELECT tulajok.nev, tulajdonos_tulajdonsagok.lakhely, tulajdonos_tulajdonsagok.eletkor 
FROM tulajok
INNER JOIN tulajdonos_tulajdonsagok ON tulajdonos_tulajdonsagok.tulaj_id = tulajok.id
ORDER BY tulajdonos_tulajdonsagok.eletkor ASC;

-- 4. feladat:
SELECT tulajok.nev, autok.marka 
FROM tulajok
INNER JOIN autok ON autok.tulaj_id = tulajok.id
ORDER BY autok.marka ASC;

-- 5. feladat:
SELECT tulajdonos_tulajdonsagok.lakhely as "Városok", COUNT(tulajdonos_tulajdonsagok.lakhely) as "Városok száma" 
FROM tulajdonos_tulajdonsagok
GROUP BY tulajdonos_tulajdonsagok.lakhely;

-- 6. feladat:
SELECT tulajok.nev as "BMW tulajok" 
FROM tulajok
INNER JOIN autok ON autok.tulaj_id = tulajok.id
WHERE autok.marka = "BMW";

-- 7. feladat:
SELECT COUNT(tulajdonos_tulajdonsagok.lakhely) as "Benzines autósok", tulajdonos_tulajdonsagok.lakhely 
FROM tulajok
INNER JOIN autok ON autok.tulaj_id = tulajok.id
INNER JOIN tulajdonos_tulajdonsagok ON tulajdonos_tulajdonsagok.tulaj_id = tulajok.id
WHERE autok.uzemanyag_tipus = "benzin"
GROUP BY tulajdonos_tulajdonsagok.lakhely;

-- 8. feladat:
SELECT tulajok.nev, autok.evjarat, autok.marka 
FROM tulajok
INNER JOIN autok ON autok.tulaj_id = tulajok.id
ORDER BY autok.evjarat DESC
LIMIT 1;

-- 9. feladat:
SELECT tulajdonos_tulajdonsagok.lakhely as "Város", COUNT(tulajdonos_tulajdonsagok.lakhely) as "Emberek száma" 
FROM tulajdonos_tulajdonsagok
GROUP BY tulajdonos_tulajdonsagok.lakhely
HAVING COUNT(tulajdonos_tulajdonsagok.lakhely) > 1;

-- 10. feladat:
INSERT INTO tulajok (nev) VALUES ("Gábor");
INSERT INTO tulajdonos_tulajdonsagok (tulaj_id, lakhely, eletkor) VALUES (6, "Pécs", 25);
INSERT INTO autok (tulaj_id, evjarat, marka, tipusa, uzemanyag_tipus) VALUES (6, 2019, "Toyota", "Corolla", "benzin");

-- 11. feladat:
UPDATE autok SET evjarat = 2018, marka = "Ford", tipusa = "Focus" WHERE id = 6;
UPDATE tulajdonos_tulajdonsagok SET lakhely = "Székesfehérvár", eletkor = 28 WHERE id = 6;
UPDATE tulajok SET nev = "András" WHERE id = 6;