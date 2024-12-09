CREATE TABLE valami (id int AUTO_INCREMENT NOT NULL, nevek varchar(16), PRIMARY KEY(id));

INSERT INTO valami (id, nevek) VALUES ('', 'Lajos');
INSERT INTO valami (id, nevek) VALUES ('', 'Károly'); -- az '' helyen id nevű mező primary kulcsa van, így kapnak egyedi id-t ami mindig egyel nő

UPDATE valami SET valami.nevek = "Adam" WHERE valami.nevek = "Károly";

SELECT * FROM valami    -- vissza adja a legelső nevet abc szerint
ORDER BY nevek ASC
LIMIT 1;

SELECT COUNT(id) as "emberek", people.lakhely   -- lekérjük hány ember lakik és melyik városba
FROM people
GROUP BY lakhely;

SELECT COUNT(people.lakhely) as "emberek", people.lakhely FROM people
GROUP BY lakhely
HAVING COUNT(people.lakhely) > 1
ORDER BY lakhely ASC;

DROP TABLE valami;