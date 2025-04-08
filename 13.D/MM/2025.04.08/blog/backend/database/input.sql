create database blog;

use blog;

create table users(
    id int auto_increment primary key,
    username varchar(255) unique,
    display_name varchar(255),
    password varchar(255)
);

create table posts(
	id int auto_increment primary key,
    user_id int,
    title varchar(255),
    content varchar(255),
    foreign key (user_id) references users(id)
);

create table likes(
	id int auto_increment primary key,
    user_id int,
    post_id int,
    foreign key (user_id) references users(id),
    foreign key (post_id) references posts(id)
);

insert into users (username, display_name, password) values
("mmate4", "Molnár Máté", "$2a$12$bPXCO3TrtC3WD86DunFGheyReWviQ1pNj1gHCIET4mvEQU72n6/de"),
("rob00", "Mizere Robin", "$2a$12$X1p4yr5KaUI25Ufm.XA2w..zUtvVKXdQMOy5h6UhijfQPXhXPQqlW");

insert into posts (user_id, title, content) values
(1, "Próbavizsga időpontja", "Nem tudom."),
(2, "Pálinkáról vélémenyem", "A pálinka finom."),
(1, "Pálinkáról véleményem", "A pálinka szerintem is finom.");