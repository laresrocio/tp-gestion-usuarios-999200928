
CREATE DATABASE IF NOT EXISTS cli_usuarios;
USE cli_usuarios;
CREATE TABLE users (
    `id` VARCHAR(36) NOT NULL,            
    `username` VARCHAR(20) NOT NULL,  
    `email` VARCHAR(255) NOT NULL,     
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;


INSERT INTO users (id, username, email, password) 
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'Admin', 'admin@gmail.com', 'admin12345');