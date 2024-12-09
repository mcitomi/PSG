-- A feladatok megoldására elkészített SQL parancsokat illessze be a feladat sorszáma után!


-- 8. feladat:
CREATE DATABASE konyvtarak
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

-- 10. feladat:
UPDATE megyek SET megyeNev = "Budapest" WHERE megyeNev = "BP";

-- 11. feladat:
SELECT konyvtarNev, irsz FROM konyvtarak
WHERE konyvtarNev LIKE "%Szakkönyvtár%";

-- 12. feladat:
SELECT konyvtarNev, irsz, cim FROM konyvtarak
WHERE irsz LIKE "1%"
ORDER BY irsz ASC;

-- 13. feladat:
SELECT telepulesek.telepNev, COUNT(konyvtarak.irsz) AS konyvtarDarab FROM konyvtarak
INNER JOIN telepulesek ON telepulesek.irsz = konyvtarak.irsz
GROUP BY telepulesek.telepNev
HAVING COUNT(konyvtarak.irsz) > 6;

-- 14. feladat:
SELECT megyek.megyeNev, COUNT(telepulesek.telepNev) FROM megyek
INNER JOIN telepulesek ON telepulesek.megyeId = megyek.id
WHERE megyeNev != "Budapest"

-- ez még nagyon nincs kész 