-- A feladatok megoldására elkészített SQL parancsokat illessze be a feladat sorszáma után!


-- 10. feladat:
CREATE DATABASE halozat
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

-- 12. feladat:
INSERT INTO megallok (id, nev) VALUES (198, "Kőbányai garázs");

-- 13. feladat:
UPDATE jaratok SET elsoajtos = 0 WHERE id = 20

-- 14. feladat:
SELECT jaratSzam FROM jaratok
WHERE elsoAjtos = 1

-- 15. feladat:
SELECT nev FROM megallok
WHERE nev LIKE '%sétány'
ORDER BY nev ASC;   -- oda kell írni h ASC mert úgy van meg a pont de am alapbol ugy rendezi

-- 16. feladat:
SELECT halozat.sorszam, megallok.nev AS 'megallo'
FROM jaratok 
INNER JOIN halozat ON jaratok.id = halozat.jarat
INNER JOIN megallok ON megallok.id = halozat.megallo
WHERE jaratok.jaratSzam = 'CITY' AND halozat.irany = 'A'
ORDER BY halozat.sorszam ASC;


-- 17. feladat:
DELETE FROM megallok WHERE megallok.id = 198; -- egy elem torlese
DROP TABLE megallok; -- egesz tablat torli
ALTER TABLE halozat ADD nevek varchar(16); -- oszlop hozzáaddása egy tablához

