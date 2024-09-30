-- Eliminar las tablas si existen
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS programs;
DROP TABLE IF EXISTS managed_technologies;
DROP TABLE IF EXISTS technologies;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS states;

-- Crear tabla States
CREATE TABLE states (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at DATE,
    updated_at DATE
);

-- Crear tabla Roles
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at DATE,
    updated_at DATE
);

-- Crear tabla Users
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    dni VARCHAR(15),
    description TEXT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Crear tabla Technologies
CREATE TABLE technologies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    created_at DATE,
    updated_at DATE
);

-- Crear tabla Managed_technologies
CREATE TABLE managed_technologies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    technology_id INT,
    main_technology BOOLEAN,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (technology_id) REFERENCES technologies(id)
);

-- Crear tabla Programs
CREATE TABLE programs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    state_id INT,
    created_at DATE,
    updated_at DATE,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (state_id) REFERENCES states(id)
);

-- Crear tabla Settings
CREATE TABLE settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255),
    program_id INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (program_id) REFERENCES programs(id)
);

-- Crear tabla Teams
CREATE TABLE teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    state_id INT,
    program_id INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (state_id) REFERENCES states(id),
    FOREIGN KEY (program_id) REFERENCES programs(id)
);

-- Crear tabla Members
CREATE TABLE members (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    team_id INT,
    user_id INT,
    created_at DATE,
    updated_at DATE,
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
