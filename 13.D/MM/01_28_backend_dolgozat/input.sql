drop table if exists movies;

create table movies (
    id int primary key auto_increment,
    title varchar(255) not null,
    director varchar(255) not null,
    release_year int not null,
    views int default 0
);

insert into movies (title, director, release_year, views) values
    ('the matrix', 'lana wachowski', 1999, 15000000),
    ('inception', 'christopher nolan', 2010, 23000000),
    ('parasite', 'bong joon-ho', 2019, 18000000),
    ('interstellar', 'christopher nolan', 2014, 27500000),
    ('pulp fiction', 'quentin tarantino', 1994, 32000000);
