CREATE DATABASE varosok DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

-- Táblák:
CREATE TABLE megye (
    id INT AUTO_INCREMENT,
    mnev VARCHAR(45),
    PRIMARY KEY(id)
);

CREATE TABLE varostipus (
    id INT AUTO_INCREMENT,
    vtip VARCHAR(45),
	PRIMARY KEY(id)
);

CREATE TABLE varos (
    id INT AUTO_INCREMENT,
    vnev VARCHAR(45),
    vtipid INT, 
    megyeid INT, 
    jaras VARCHAR(45),
    kisterseg VARCHAR(45),
    nepesseg INT,
    terulet REAL,
    PRIMARY KEY (id),
    FOREIGN KEY(vtipid) REFERENCES varostipus(id),
	FOREIGN KEY (megyeid) REFERENCES megye(id)
);

-- Feladatok:

SELECT varos.vnev FROM varos
WHERE varos.vnev LIKE "%vásár%";

SELECT varos.vnev, varos.nepesseg, varos.terulet FROM varos
WHERE varos.terulet > 400
ORDER BY varos.nepesseg DESC;

SELECT varos.vnev, varos.nepesseg FROM varos
INNER JOIN megye ON megye.id = varos.megyeid
WHERE megye.mnev = "Fejér" AND varos.nepesseg > 15000;

SELECT varostipus.vtip as "Város típusa", COUNT(varostipus.vtip) as "Városok száma", SUM(varos.nepesseg) as "Népesség" FROM varos
INNER JOIN varostipus ON varostipus.id = varos.vtipid
WHERE varostipus.vtip != "főváros"
GROUP BY varostipus.vtip;

SELECT megye.mnev, COUNT(megye.mnev) as "db" FROM varos
INNER JOIN megye ON megye.id = varos.megyeid
WHERE varos.kisterseg != varos.jaras
GROUP BY megye.mnev
HAVING db > 8
ORDER BY db DESC;