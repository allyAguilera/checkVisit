import express from "express";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;


//  CONFIGURACIÓN DE LA BASE DE DATOS,creamos un pool de conexiones hacia PostgreSQL

const pool = new Pool({
  host: "db", // nombre del servicio en docker-compose.yml
  user: "allysonaguilera",
  password: "1234567890",
  database: "checkvisit",
  port: 5432,
});

//  CONFIGURACIÓN DEL SERVIDOR EXPRESS
const app = express();

app.use(
  cors({
    origin: "*", //  "http://localhost:8080" si se necesita restringir
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());


// ENDPOINTS CRUD


//Listar todas las visitas con nombre del departamento
app.get("/api/visitas", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT v.id, v.nombre_visitante, v.rut, v.motivo, 
             d.nombre AS departamento, v.fecha_ingreso, v.fecha_salida
      FROM visitas v
      JOIN departamentos d ON v.id_departamento = d.id
      ORDER BY v.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener visitas:", err);
    res.status(500).json({ error: "Error al obtener las visitas" });
  }
});

// Crear una nueva visita numero de departamento como text
app.post("/api/visitas", async (req, res) => {
  try {
    const { nombre_visitante, rut, motivo, departamento_nombre } = req.body;

    console.log("📦 Datos recibidos:", req.body);

    if (!nombre_visitante || !rut || !departamento_nombre) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Buscar el ID del departamento ej: '101')
    const deptoQuery = await pool.query(
      "SELECT id FROM departamentos WHERE TRIM(nombre) = TRIM($1)",
      [departamento_nombre]
    );

    if (deptoQuery.rowCount === 0) {
      console.log("Departamento no encontrado:", departamento_nombre);
      return res.status(400).json({ error: `Departamento '${departamento_nombre}' no encontrado` });
    }

    const id_departamento = deptoQuery.rows[0].id;

    // Insertar la nueva visita
    const result = await pool.query(
      `INSERT INTO visitas (nombre_visitante, rut, motivo, id_departamento)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre_visitante, rut, motivo || "", id_departamento]
    );

    console.log(" Visita registrada:", result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al registrar visita :C ", err);
    res.status(500).json({ error: err.message });
  }
});

// Marcar salida de una visita
app.put("/api/visitas/:id/salida", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "UPDATE visitas SET fecha_salida = NOW() WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Visita no encontrada" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al marcar salida:", err);
    res.status(500).json({ error: "Error al actualizar la salida" });
  }
});

// Eliminar una visita
app.delete("/api/visitas/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM visitas WHERE id = $1", [id]);

    if (result.rowCount === 0)
      return res.status(404).json({ error: "Visita no encontrada" });

    res.json({ message: "Visita eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar la visita:", err);
    res.status(500).json({ error: "Error al eliminar la visita" });
  }
});

// Listar departamentos
app.get("/api/departamentos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM departamentos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener departamentos:", err);
    res.status(500).json({ error: "Error al obtener los departamentos" });
  }
});
// INICIO DEL SERVIDOR

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor Node.js corriendo en puerto ${PORT}`);
});
