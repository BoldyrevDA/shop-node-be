-- SQL script to create and fill tables with test examples

create extension if not exists "uuid-ossp";


-- DDL scripts
-- create tables

create table if not exists products (
	id uuid primary key not null default uuid_generate_v4(),
	title text not null,
	description text,
	price int
);

create table if not exists stocks (
	product_id uuid not null primary key,
	count int,
	foreign key (product_id) references products (id)
);


-- DML scripts
-- fill the tables with data

insert into products (id, title, description, price)
values
('0b998eff-f67b-44bd-a3df-cd3103bd0b1b', 'BAJAJ Boxer 100ES', 'Cheap to maintain and unpretentious to operate' , 100000),
('6f30ba55-3180-49a8-b59a-fa6a867b3b00', 'BAJAJ Pulsar NS 125', 'Stylish city bike', 180000),
('04780994-53ed-43e9-9e7a-ffdda2733a34', 'BAJAJ Pulsar NS 200', 'Maneuverable, precise in the control of a city bike', 295000),
('abe9488c-a58b-4ab0-b19d-7c57fc95fc90', 'Bajaj Dominar 400', 'Powerful, with excellent brakes with dual-circuit ABS', 460000);

insert into stocks (product_id, count)
values
('0b998eff-f67b-44bd-a3df-cd3103bd0b1b', 45),
('6f30ba55-3180-49a8-b59a-fa6a867b3b00', 23),
('04780994-53ed-43e9-9e7a-ffdda2733a34', 15),
('abe9488c-a58b-4ab0-b19d-7c57fc95fc90', 36);
