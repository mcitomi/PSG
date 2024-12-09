CREATE DATABASE varosok DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

CREATE TABLE megye (
	id int PRIMARY KEY AUTO_INCREMENT,
    mnev VARCHAR(20)
)

CREATE TABLE varostipus (
	id int PRIMARY KEY AUTO_INCREMENT,
    vtip VARCHAR(40)
)

CREATE TABLE varos (
    id int PRIMARY KEY AUTO_INCREMENT,
    vnev VARCHAR(40),
    vtipid INT, 
    megyeid INT, 
    jaras VARCHAR(40),
    kisterseg VARCHAR(40),
    nepesseg INT,
    terulet REAL,
    FOREIGN KEY (vtipid) REFERENCES varostipus(id),
    FOREIGN KEY (megyeid) REFERENCES megye(id)
)

SELECT * FROM varos
WHERE varos.vnev LIKE "%vásár%";

SELECT varos.vnev, varos.nepesseg, varos.terulet FROM varos
WHERE varos.terulet > 400
ORDER BY varos.nepesseg DESC;

SELECT varos.vnev, varos.nepesseg FROM varos
INNER JOIN megye ON megye.id = varos.megyeid
WHERE megye.mnev = "Fejér" AND varos.nepesseg > 15000;

SELECT varostipus.vtip as "Város típusa", COUNT(varostipus.vtip) as "Városok száma", SUM(varos.nepesseg) as "Népesség" FROM varos
INNER JOIN varostipus ON varos.vtipid = varostipus.id
WHERE varostipus.vtip != "Főváros"
GROUP BY varostipus.vtip;

SELECT megye.mnev, COUNT(megye.mnev) as "db" FROM megye
INNER JOIN varos On varos.megyeid = megye.id
WHERE varos.kisterseg != varos.jaras
GROUP BY megye.mnev
HAVING db > 8
ORDER BY db DESC;