-- 10. feladat:
CREATE DATABASE gitarmuveszek DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

-- 12. feladat:
DELETE FROM stilus WHERE stilus.stilusNev = "swing";

-- 13. feladat:
SELECT COUNT(zenekar.id) as "darab" FROM `zenekar`;

-- 14. feladat:
SELECT muvesz.nemzetiseg FROM muvesz
WHERE muvesz.nemzetiseg IS NOT NULL
GROUP BY muvesz.nemzetiseg;

-- 15. feladat:
SELECT stilus.stilusNev as "stilus", COUNT(stilus.stilusNev) as "muveszekSzama" FROM muvesz
INNER JOIN stilus ON stilus.id = muvesz.stilusID
GROUP BY stilus.stilusNev
ORDER BY muveszekSzama DESC;

-- 16. feladat:
SELECT zenekar.zenekarNev, muvesz.muveszNev FROM zenekar
INNER JOIN kapcsolo ON kapcsolo.zenekarID = zenekar.id
INNER JOIN muvesz ON muvesz.id = kapcsolo.muveszID
WHERE zenekar.zenekarNev LIKE "% % %";
