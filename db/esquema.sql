
-- TABLA: DEPARTAMENTOS

CREATE TABLE IF NOT EXISTS departamentos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    encargado VARCHAR(100) NOT NULL
);


-- TABLA: VISITAS

CREATE TABLE IF NOT EXISTS visitas (
    id SERIAL PRIMARY KEY,
    nombre_visitante VARCHAR(100) NOT NULL,
    rut VARCHAR(15) NOT NULL,
    motivo TEXT,
    id_departamento INTEGER NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_salida TIMESTAMP,
    CONSTRAINT fk_visitas_departamento
        FOREIGN KEY (id_departamento)
        REFERENCES departamentos(id)
        ON DELETE CASCADE
);



-- Para comprobar si esta funcionando la basse de datos en la web
NSERT INTO departamentos (nombre, encargado)
VALUES
('Depto 101', 'Juan Pérez'),
('Depto 202', 'Ana Torres'),
('Depto 303', 'Carlos Díaz');


INSERT INTO visitas (nombre_visitante, rut, motivo, id_departamento)
VALUES
('Luis Rojas', '12345678-9', 'Entrega de encomienda', 1);