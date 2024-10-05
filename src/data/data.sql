INSERT INTO states (name, created_at, updated_at) VALUES
('Abandonado', CURDATE(), CURDATE()),
('Finalizado', CURDATE(), CURDATE()),
('En curso', CURDATE(), CURDATE()),
('En pausa', CURDATE(), CURDATE());

INSERT INTO roles (name, created_at, updated_at) VALUES
('Graduado', CURDATE(), CURDATE()),
('Mentor', CURDATE(), CURDATE()),
('Administrador', CURDATE(), CURDATE());

INSERT INTO users (name, surname, image, dni, email, password, role_id, created_at, updated_at, description) VALUES
('Juan', 'Pérez', 'juan_perez.jpg', '12345678', 'juan.perez@gmail.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 1, CURDATE(), CURDATE(), 'Graduado en Ingeniería'),
('Ana', 'García', 'ana_garcia.jpg', '23456789', 'ana.garcia@gmail.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 2, CURDATE(), CURDATE(), 'Mentora en Ciencias Sociales'),
('Carlos', 'Martínez', 'carlos_martinez.jpg', '34567890', 'carlos.martinez@gmail.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 3, CURDATE(), CURDATE(), 'Administrador del sistema'),
('Laura', 'Fernández', null, '34567890', 'laura.fernandez@outlook.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 1, CURDATE(), CURDATE(), 'Laura es una diseñadora con experiencia en proyectos internacionales.'),
('Pedro', 'Sánchez', null, '34567890', 'pedro.sanchez@outlook.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 2, CURDATE(), CURDATE(), 'Pedro trabaja en el equipo de soporte técnico desde hace 5 años.'),
('María', 'López', null, '34567890', 'maria.lopez@outlook.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 1, CURDATE(), CURDATE(), 'María es una ingeniera de software con un interés en inteligencia artificial.'),
('Antonio', 'Ramírez', null, '34567890', 'antonio.ramirez@gmail.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 2, CURDATE(), CURDATE(), 'Antonio es el jefe de ventas con una vasta experiencia en el sector.'),
('Isabel', 'Moreno', null, '34567890', 'isabel.moreno@gmail.com', '$2a$12$U35omBTV.YZzXN79CQdhROsDW9DSGRJvC7bqoNXyGh6dYGLoD48Yy', 1, CURDATE(), CURDATE(), 'Isabel es una especialista en marketing con un enfoque en estrategias digitales.');

INSERT INTO technologies (name, created_at, updated_at) VALUES
('JavaScript', CURDATE(), CURDATE()),
('Python', CURDATE(), CURDATE()),
('Java', CURDATE(), CURDATE()),
('C#', CURDATE(), CURDATE()),
('Ruby', CURDATE(), CURDATE()),
('HTML', CURDATE(), CURDATE()), 
('CSS', CURDATE(), CURDATE()),  
('SQL', CURDATE(), CURDATE()), 
('PHP', CURDATE(), CURDATE()), 
('Swift', CURDATE(), CURDATE()), 
('Kotlin', CURDATE(), CURDATE()), 
('TypeScript', CURDATE(), CURDATE()),  
('R', CURDATE(), CURDATE()),   
('Go', CURDATE(), CURDATE()), 
('Rust', CURDATE(), CURDATE()),  
('Docker', CURDATE(), CURDATE()), 
('Kubernetes', CURDATE(), CURDATE()),
('React', CURDATE(), CURDATE()), 
('Angular', CURDATE(), CURDATE()), 
('Vue.js', CURDATE(), CURDATE()); 

-- Insertar tecnologías gestionadas en la tabla managed_technologies
INSERT INTO managed_technologies (user_id, technology_id, main_technology, created_at, updated_at) VALUES
(1, 1, TRUE, CURDATE(), CURDATE()), 
(1, 6, FALSE, CURDATE(), CURDATE()), 
(1, 12, FALSE, CURDATE(), CURDATE()),
(2, 2, TRUE, CURDATE(), CURDATE()),
(2, 8, FALSE, CURDATE(), CURDATE()), 
(2, 13, FALSE, CURDATE(), CURDATE()), 
(4, 3, TRUE, CURDATE(), CURDATE()),
(4, 10, FALSE, CURDATE(), CURDATE()),
(4, 14, FALSE, CURDATE(), CURDATE()),
(5, 4, TRUE, CURDATE(), CURDATE()), 
(5, 9, FALSE, CURDATE(), CURDATE()), 
(5, 15, FALSE, CURDATE(), CURDATE()), 
(6, 5, TRUE, CURDATE(), CURDATE()),  
(6, 7, FALSE, CURDATE(), CURDATE()), 
(6, 16, FALSE, CURDATE(), CURDATE()), 
(7, 7, TRUE, CURDATE(), CURDATE()),
(7, 13, FALSE, CURDATE(), CURDATE()),  
(7, 19, FALSE, CURDATE(), CURDATE()), 
(8, 15, TRUE, CURDATE(), CURDATE()), 
(8, 17, FALSE, CURDATE(), CURDATE()), 
(8, 20, FALSE, CURDATE(), CURDATE()); 
 

INSERT INTO programs (name, description, state_id, created_at, updated_at, start_date, end_date) VALUES
('Programa A', 'Programa enfocado en desarrollo web.', 1, CURDATE(), CURDATE(), '2024-09-01', '2024-12-15'),
('Programa B', 'Programa especializado en ciencia de datos.', 2, CURDATE(), CURDATE(), '2024-10-01', '2025-03-15'),
('Programa C', 'Programa sobre gestión de proyectos.', 1, CURDATE(), CURDATE(), '2024-11-01', '2025-05-15');

INSERT INTO settings (name, value, program_id, created_at, updated_at) VALUES
-- Configuraciones para el Programa A
('max_team_size', '8', 1, CURDATE(), CURDATE()), -- Tamaño máximo de equipos
('graduate_profiles', '5', 1, CURDATE(), CURDATE()), -- Perfiles de egresados por equipo
('technical_mentors_per_technology', '2', 1, CURDATE(), CURDATE()), -- Mentores técnicos por tecnología
-- Configuraciones para el Programa B
('max_team_size', '10', 2, CURDATE(), CURDATE()), -- Tamaño máximo de equipos
('graduate_profiles', '6', 2, CURDATE(), CURDATE()), -- Perfiles de egresados por equipo
('technical_mentors_per_technology', '3', 2, CURDATE(), CURDATE()), -- Mentores técnicos por tecnología
-- Configuraciones para el Programa C
('max_team_size', '7', 3, CURDATE(), CURDATE()), -- Tamaño máximo de equipos
('graduate_profiles', '4', 3, CURDATE(), CURDATE()), -- Perfiles de egresados por equipo
('technical_mentors_per_technology', '1', 3, CURDATE(), CURDATE()); -- Mentores técnicos por tecnología

INSERT INTO teams (name, description, state_id, program_id, created_at, updated_at) VALUES
('Equipo Alpha', 'Equipo dedicado al desarrollo frontend.', 1, 1, CURDATE(), CURDATE()),
('Equipo Beta', 'Equipo enfocado en análisis de datos.', 2, 2, CURDATE(), CURDATE()),
('Equipo Gamma', 'Equipo especializado en gestión de proyectos ágiles.', 1, 3, CURDATE(), CURDATE()),
('Equipo Front', 'Equipo dedicado al desarrollo frontend.', 1, 1, CURDATE(), CURDATE()),
('Equipo Datos', 'Equipo enfocado en análisis de datos.', 2, 2, CURDATE(), CURDATE()),
('Equipo Scruming', 'Equipo especializado en gestión de proyectos ágiles.', 1, 3, CURDATE(), CURDATE()),
('Equipo Fropha', 'Equipo dedicado al desarrollo frontend.', 1, 1, CURDATE(), CURDATE()),
('Equipo Data', 'Equipo enfocado en análisis de datos.', 2, 2, CURDATE(), CURDATE()),
('Equipo Kanban', 'Equipo especializado en gestión de proyectos ágiles.', 1, 3, CURDATE(), CURDATE());

INSERT INTO members (team_id, user_id, created_at, updated_at) VALUES
-- Miembros del Equipo Alpha
(1, 1, CURDATE(), CURDATE()),
(1, 2, CURDATE(), CURDATE()),
(1, 4, CURDATE(), CURDATE()),

-- Miembros del Equipo Beta
(2, 7, CURDATE(), CURDATE()),
(2, 4, CURDATE(), CURDATE()),
(2, 5, CURDATE(), CURDATE()),

-- Miembros del Equipo Gamma
(3, 8, CURDATE(), CURDATE()),
(3, 5, CURDATE(), CURDATE()),

-- Miembros del Equipo Front
(4, 1, CURDATE(), CURDATE()),
(4, 2, CURDATE(), CURDATE()),
(4, 6, CURDATE(), CURDATE()),

-- Miembros del Equipo Datos
(5, 4, CURDATE(), CURDATE()),
(5, 5, CURDATE(), CURDATE()),

-- Miembros del Equipo Scruming
(6, 2, CURDATE(), CURDATE()),
(6, 6, CURDATE(), CURDATE()),

-- Miembros del Equipo Fropha
(7, 7, CURDATE(), CURDATE()),
(7, 8, CURDATE(), CURDATE()),

-- Miembros del Equipo Data
(8, 4, CURDATE(), CURDATE()),
(8, 6, CURDATE(), CURDATE()),

-- Miembros del Equipo Kanban
(9, 1, CURDATE(), CURDATE()),
(9, 5, CURDATE(), CURDATE());
