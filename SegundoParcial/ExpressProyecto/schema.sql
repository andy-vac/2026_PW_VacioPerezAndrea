-- Base de datos para el ExpressProyecto
CREATE DATABASE IF NOT EXISTS cecyt9_local CHARACTER SET utf8mb4;
USE cecyt9_local;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(100) NOT NULL,
    boleta CHAR(10) NOT NULL UNIQUE,
    rol VARCHAR(20) NOT NULL DEFAULT 'alumno'
);

CREATE TABLE IF NOT EXISTS talleres (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    instructor VARCHAR(100),
    fecha DATE NOT NULL,
    cupo INT NOT NULL DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS asistencias (
    id CHAR(36) PRIMARY KEY,
    taller_id CHAR(36) NOT NULL,
    nombre_alumno VARCHAR(100) NOT NULL,
    boleta CHAR(10) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (taller_id) REFERENCES talleres(id) ON DELETE CASCADE
);
