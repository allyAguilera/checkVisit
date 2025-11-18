
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

-- dejamos ingresado los datos de los departamentos que exiten en nuestro edificio
-- Departamentos
INSERT INTO departamentos (nombre, encargado)
VALUES
  ('101', 'Carlos Muñoz'),
  ('102', 'María Gómez'),
  ('103', 'Ana Torres'),
  ('104', 'Pedro López'),
  ('105', 'Lucía Fuentes'),
  ('106', 'Ricardo Soto'),
  ('107', 'Fernanda Díaz'),
  ('108', 'Héctor Silva'),
  ('109', 'Camila Vargas'),
  ('110', 'Felipe Rojas'),
  ('201', 'Andrea Navarro'),
  ('202', 'Rodrigo Pérez');

  
-- insertamos datos para pruebas 
INSERT INTO visitas (nombre_visitante, rut, motivo, id_departamento)
VALUES
('Luis Rojas', '12345678-9', 'Entrega de encomienda', 1); 

