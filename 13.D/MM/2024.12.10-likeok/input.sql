create database if not exists social_media;

use social_media;

create table if not exists posts(
    id int primary key auto_increment,
    user_id int,
    content varchar(255),
    likes int,
    dislikes int
);

create table if not exists users(
    id int primary key auto_increment,
    name varchar(255),
    password varchar(255)
);

insert into posts (user_id, content, likes, dislikes) values
    (3, 'Miért nem tud a könyv titkot tartani? Mert mindig kinyílik!', 0, 0),
    (1, 'Hova ül a tehén a buszon? Legelőre.', 0, 0),
    (2, 'Mivel nyitja ki a kanibál az ajtót? Kulcscsontal!', 0, 0),
    (4, 'Tudtad, hogy mi a közös a tanárok és a drogdílerek között? Mindig csak az anyagra gondolnak.', 0, 0),
    (2, 'Mit számol a vonuló seregben a katapultoknál az ostrommérnök? A kővetési távolságot.', 0, 0);

insert into users (name, password) values
    ('mate', 'mate'),
    ('ridegne', '5gautizmus'),
    ('ricsi', 'nem_koltok_jatekokra'),
    ('todor', 'toldi');