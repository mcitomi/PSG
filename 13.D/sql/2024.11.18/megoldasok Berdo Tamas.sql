-- A feladatok megoldására elkészített SQL parancsokat illessze be a feladat sorszáma után!

-- 9. feladat:
CREATE DATABASE tdhongrie DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

-- 11. feladat:
DELETE FROM csapat WHERE csapat.id = 21;

-- 12. feladat:
SELECT versenyzo.nev FROM versenyzo
WHERE versenyzo.nemzetiseg = "HUN"
ORDER BY versenyzo.nev ASC;

-- 13. feladat:
SELECT versenyzo.nemzetiseg, COUNT(versenyzo.nemzetiseg) AS "indulokSzama" 
FROM versenyzo
GROUP BY (versenyzo.nemzetiseg)  
ORDER BY indulokSzama DESC;

-- 14. feladat:
SELECT eredmeny.szakasz, eredmeny.ido FROM eredmeny
INNER JOIN versenyzo ON eredmeny.versenyzoId = versenyzo.id
WHERE versenyzo.nev = "Valter Attila"
ORDER BY eredmeny.szakasz ASC;
 
-- 15. feladat:
SELECT csapat.csapatNev, COUNT(csapat.csapatNev) as "magyarokSzama"
FROM csapat
INNER JOIN versenyzo ON versenyzo.csapatId = csapat.id
WHERE versenyzo.nemzetiseg = "HUN"
GROUP BY csapat.csapatNev
HAVING magyarokSzama > 1;



CREATE DATABASE kulcsok
DEFAULT CHARACTER SET utf8
COLLATE utf8_hungarian_ci;

CREATE TABLE szemelyek(
    id int PRIMARY KEY AUTO_INCREMENT,
    nev varchar(40)


CREATE TABLE tulajdonsagok(
    tuls_id int not null PRIMARY KEY AUTO_INCREMENT,
    lakhely varchar(30),
    szemelyek_id int,
    FOREIGN KEY (szemelyek_id) REFERENCES szemelyek(id)
);

INSERT INTO szemelyek (id, szemelyek.nev) VALUES ('', "Balázs");
INSERT INTO szemelyek (id, szemelyek.nev) VALUES ('', "Károly");

INSERT INTO tulajdonsagok (tulajdonsagok.tuls_id, tulajdonsagok.lakhely, tulajdonsagok.szemelyek_id) VALUES ('', "Aszód", 1);
INSERT INTO tulajdonsagok (tulajdonsagok.tuls_id, tulajdonsagok.lakhely, tulajdonsagok.szemelyek_id) VALUES ('', "Kartal", 2);

CREATE TABLE eletkor (
    eletkor_id int not null,
    kor int not null,
    szemely_id int not null
);

ALTER TABLE eletkor ADD PRIMARY KEY(eletkor_id);

ALTER TABLE eletkor 
ADD FOREIGN KEY (szemely_id) REFERENCES szemelyek(id)

INSERT INTO eletkor(eletkor.szemely_id, eletkor.kor, eletkor.eletkor_id) VALUES (1, 18, 1);
INSERT INTO eletkor(eletkor.szemely_id, eletkor.kor, eletkor.eletkor_id) VALUES (2, 32, 2);

SELECT * FROM eletkor
INNER JOIN szemelyek ON szemelyek.id = eletkor.szemely_id
INNER JOIN tulajdonsagok ON tulajdonsagok.szemelyek_id = szemelyek.id

barmi adatbazis ket tabla osszekotesek

CREATE DATABASE autos DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;

CREATE TABLE tulajok (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    nev varchar(40)
);

CREATE TABLE autok (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    marka varchar(15),
    tulaj_id int not null,
    FOREIGN KEY (tulaj_id) REFERENCES tulajok(id)
);

CREATE TABLE forgalmi (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    ervenyesseg_kezdete int not null,
    ervenyesseg_vege int not null,
    auto_id int not null,
    FOREIGN KEY (auto_id) REFERENCES autok(id)
);

INSERT INTO tulajok (nev) VALUES ("Béla");
INSERT INTO tulajok (nev) VALUES ("Ottó");

INSERT INTO autok (marka, tulaj_id) VALUES ("Opel", 1);
INSERT INTO autok (marka, tulaj_id) VALUES ("Peugeot", 2);

INSERT INTO forgalmi (ervenyesseg_kezdete, ervenyesseg_vege, auto_id) VALUES (2022, 2026, 1);
INSERT INTO forgalmi (ervenyesseg_kezdete, ervenyesseg_vege, auto_id) VALUES (2021, 2025, 2);