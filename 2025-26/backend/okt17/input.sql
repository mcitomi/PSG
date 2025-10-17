create database if not exists teaching_site;

use teaching_site;

create table if not exists teachers (
    id int auto_increment primary key,
    name varchar(100) not null,
    age int
);

create table if not exists courses (
    id int auto_increment primary key,
    name varchar(100) not null,
    description text,
    length int,
    teacher_id int,
    foreign key (teacher_id) references teachers(id) on delete cascade
);

insert into teachers (name, age)
values 
    ('Molnár Máté', 21), 
    ('Mizere Robin', 21), 
    ('Denkinger Ákos', 21), 
    ('Komáromi Bálint', 21);

insert into courses (name, description, length, teacher_id)
values
    ('Frontend programozás', 'Egy kurzus modern eszközökről felhasználói felületek készítésére.', 30, 4),
    ('Backend programozás', 'Egy kurzus a mai napokban használt architektúrákról webszerverek fejlesztésében.', 45, 1),
    ('Mobilprogramozás', 'Bevezetés az Android készülékeken futó alkalmazásokra való fejlesztésbe.', 20, 2),
    ('Adatbáziskezelés', 'Minden a manapság használt adatbáziskezelőkről.', 25, 3),
    ('Asztali alkalmazások fejlesztése', 'Objektum-orientált programozás asztali alkalmazások fejlesztésén keresztül.', 45, 1),
    ('Informatika és távközlés', 'Bevezetés az informatikába, szoftver és hardveres alapokon szintén.', 15, 4),
    ('Webprogramozás alapok', 'HTML, CSS és JavaScript kurzus a webprogramozás alapjairól.', 50, 2),
    ('Játékfejlesztés kezdőknek', 'Unity játékmotoron keresztül való bevezetés a játékfejlesztésbe.', 60, 1),
    ('Robotika alapok', 'Bevezetés a mikrokontrollerek kezelésébe.', 30, 2),
    ('Hálozat', 'Minden a hálózati programozásról', 30, 4),
    ('Gépi tanulás', 'Bevezetés a mesterséges intelligenciába gépi tanuláson keresztül', 60, 1),
    ('Etikus hackelés', 'Hogyan használjuk jóra tudásunkat?', 40, 4);
