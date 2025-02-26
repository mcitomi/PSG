CREATE DATABASE cukraszda DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

SELECT COUNT(termek.id) as "Hiányzó kalória érték" FROM termek 
WHERE termek.kaloria IS NULL;

SELECT termek.nev, kiszereles.mennyiseg FROM kiszereles
INNER JOIN termek ON termek.kiszerelesId = kiszereles.id
WHERE kiszereles.mennyiseg LIKE "%g";

UPDATE termek SET termek.ar = 1350 WHERE termek.nev = "Eklerfánk";

SELECT allergen.nev, COUNT(allergeninfo.termekId) as "termék szám" FROM allergen
INNER JOIN allergeninfo ON allergeninfo.allergenId = allergen.id
GROUP BY allergen.nev
ORDER BY COUNT(allergeninfo.termekId) DESC
LIMIT 3;

SELECT nev, ar FROM termek
LEFT JOIN allergeninfo ON allergeninfo.termekId = termek.id
WHERE allergeninfo.allergenId IS NULL AND laktozmentes = 1 AND tejmentes = 1 AND tojasmentes = 1;

SELECT CONCAT(nev, " " ,"torta") AS "torta neve", 
(ar-100)*12 AS "fizetendő ár" 
FROM termek
WHERE termek.nev LIKE "paleo%";

-- berdó tamas 