CREATE DATABASE "trello-clone";


-- _________________________________________________________________

CREATE TABLE users(user_id SERIAL PRIMARY KEY,
name VARCHAR(20),
email VARCHAR(50),
phone VARCHAR(15),
password VARCHAR(20));