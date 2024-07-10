-- Crear tabla rol
CREATE TABLE Rol(
    idRol INT PRIMARY KEY,
    funcion VARCHAR(50) NOT NULL CHECK (funcion IN ('ciclista', 'masajista', 'director', 'administrador'))
);

-- Crear tabla Especialidad
CREATE TABLE Especialidad (
    idEspecialidad INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    acciones TEXT[] 
);

-- tabla administrador
CREATE TABLE Administrador (
    idAdministrador INT PRIMARY KEY
);

-- Crear tabla Usuario con características adicionales
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    sexo CHAR(1) NOT NULL CHECK (sexo IN ('M', 'F')),
    rol_id INT NOT NULL REFERENCES Rol(idRol),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla Equipo
CREATE TABLE Equipo (
    idEquipo INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tiempo_total INT DEFAULT 0
    participantes_equipo JSON 
);

-- Crear tabla Ciclista
CREATE TABLE Ciclista (
    idCiclista INT PRIMARY KEY,
    especialidad_id INT REFERENCES Especialidad(idEspecialidad),
    contextura VARCHAR(100),
    equipo_id INT REFERENCES Equipo(idEquipo)
);

-- Crear tabla Masajista
CREATE TABLE Masajista (
    idMasajista INT PRIMARY KEY,
    anios_experiencia INT NOT NULL DEFAULT 0,
    equipo_id INT REFERENCES Equipo(idEquipo)
);

-- Crear tabla Director
CREATE TABLE Director (
    idDirector INT PRIMARY KEY,
    nacionalidad VARCHAR(100) NOT NULL,
    equipo_id INT REFERENCES Equipo(idEquipo)
);

-- Crear tabla Etapa
CREATE TABLE Etapa (
    idEtapa INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tiempo_duracion INT NOT NULL,
    num_carreras INT NOT NULL,
    categoriaEtapa VARCHAR(50) NOT NULL CHECK (categoriaEtapa IN ('montaña', 'llano con curvas', 'semi llano', 'llano en recta'))
);


-- Crear tabla Carrera
CREATE TABLE Carrera (
    idCarrera INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    etapa_id INT REFERENCES Etapa(idEtapa),
    fecha DATE NOT NULL,
	equipo_id INT REFERENCES Equipo(idEquipo)
);

-- Crear tabla Participacion
CREATE TABLE Participacion (
    idParticipacion INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    etapa_id INT REFERENCES Carrera(idCarrera),
    ciclista_id INT REFERENCES Ciclista(idCiclista),
    tiempo INT NOT NULL
);

-- Insertar valores en la tabla Especialidad
INSERT INTO Especialidad (nombre, descripcion) VALUES
('escalador', 'Especialista en etapas montañosas. Tienen una contextura física muy delgada y una relación peso/potencia perfecta para afrontar grandes subidas. Características adicionales: aceleración promedio en subida y grado de rampa soportada.'),
('rodador', 'Especialista en rodar a grandes velocidades en terrenos llanos con curvas. Suelen ser ciclistas más pesados y con mayor envergadura. Característica particular: velocidad promedio de pedaleo.'),
('embalador', 'Especialista en etapas semiplanas, con mucha potencia muscular para esfuerzos intensos en periodos cortos. Características: potencia promedio y velocidad promedio en sprint.'),
('gregario', 'Ayudan al jefe de filas en la carrera. Su contextura es media y su especialidad son las etapas de ruta. Característica propia: función en el pelotón.'),
('clasicomano', 'Especialista en competiciones de un solo día. Son ciclistas completos que se defienden bien en varios terrenos. Característica principal: número de clásicos ganados.'),
('contrarrelojista', 'Especialista en etapas llanas rectas. Necesitan mucha concentración y constancia. Característica adicional: velocidad máxima.');

-- Insertar valores en la tabla Rol
INSERT INTO Rol (idRol, funcion) VALUES
(1, 'ciclista'),
(2, 'masajista'),
(3, 'director'),
(4, 'administrador');

-- Insertar Usuarios de ejemplo
INSERT INTO Usuario (idUsuario, nombre, email, password, sexo, rol_id) VALUES
(1, 'Juan Pérez', 'juan.perez@example.com', 'password123', 'M', 1);

INSERT INTO Usuario (idUsuario, nombre, email, password, sexo, rol_id) VALUES
(2, 'Ana Gómez', 'ana.gomez@example.com', 'password456','F', 2);

INSERT INTO Usuario (idUsuario, nombre, email, password, sexo, rol_id) VALUES
(3, 'Carlos Fernández', 'carlos.fernandez@example.com', 'password789','M');

INSERT INTO Usuario (idUsuario, nombre, email, password, sexo, rol_id) VALUES
(4, 'Elverto', 'elvertogomez12@gmail.com','1234', 'M', 4);


-- Consultar todos los usuarios
SELECT * FROM Usuario;