create database if not exists auth;

use auth;

create table if not exists users(
    id int primary key auto_increment,
    username varchar(255),
    password varchar(255)
);
