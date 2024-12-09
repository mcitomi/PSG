-- A feladatok megoldására elkészített SQL parancsokat illessze be a feladat sorszáma után!


-- 1. feladat:
CREATE DATABASE euroskills DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

-- 3. feladat:
SELECT COUNT(id) as 'ermek' FROM versenyzo
WHERE pont >= 700;

-- 4. feladat:
SELECT orszagNev FROM orszag
INNER JOIN versenyzo ON versenyzo.orszagId = orszag.id
GROUP BY orszagNev
ORDER BY orszagNev ASC;

-- 5. feladat:
SELECT szakmaNev, COUNT(szakmaNev) as 'versenyzok szama' FROM szakma
INNER JOIN versenyzo ON versenyzo.szakmaId = szakma.id
GROUP BY szakmaNev
ORDER BY COUNT(szakmaNev) DESC;

-- 6. feladat:
SELECT versenyzo.nev, orszag.orszagNev, szakma.szakmaNev, versenyzo.pont FROM versenyzo
INNER JOIN orszag ON orszag.id = versenyzo.orszagId
INNER JOIN szakma ON szakma.id = versenyzo.szakmaId
ORDER BY versenyzo.pont DESC, versenyzo.nev ASC
LIMIT 25;

-- ország aki keves versenyzőt indított

SELECT orszag.orszagNev AS 'ország aki a legkevesebb versenyzőt inditotta' FROM versenyzo 
INNER JOIN orszag ON versenyzo.orszagId = orszag.id
GROUP BY orszag.id
ORDER BY COUNT(orszagId) 
LIMIT 1

-- legtöbbet 

SELECT orszag.orszagNev, COUNT(orszag.id) AS 'ország aki a legtobb versenyzőt inditotta' FROM versenyzo 
INNER JOIN orszag ON versenyzo.orszagId = orszag.id
GROUP BY orszag.id
ORDER BY COUNT(orszagId) DESC
LIMIT 1;

-- egy szakmaba hany ember dolgozik

SELECT szakma.szakmaNev, COUNT(szakmaId) as 'emberek szama a szakmbában' FROM versenyzo
INNER JOIN szakma ON versenyzo.szakmaId = szakma.id
GROUP BY szakmaId
ORDER BY COUNT(szakmaId) DESC;

-- szakmák amik nevében van "tő"
SELECT szakma.szakmaNev AS 'szakmák amik nevében van "tő"' FROM versenyzo
INNER JOIN szakma ON szakma.id = versenyzo.szakmaId
GROUP BY szakma.szakmaNev
HAVING szakma.szakmaNev LIKE "%tő%";