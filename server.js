import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// ➤ Crear personaje
app.post("/api/personajes", (req, res) => {
  const { nombre, raza, transformacion, tecnica, saga, historia } = req.body;

  const sql = `
    INSERT INTO personaje (nombre, raza, transformacion, tecnica, saga, historia)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(sql, [nombre, raza, transformacion, tecnica, saga, historia], (err, results) => {
    if (err) return res.status(500).json({ error: "Error al agregar personaje." });
    res.json({ message: "Personaje agregado.", id_personaje: results.insertId });
  });
});


// ➤ Obtener lista
app.get("/api/personajes", (req, res) => {
  const sql = "SELECT * FROM personaje";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener personajes." });
    res.json(results);
  });
});


// ➤ Modificar
app.put("/api/personajes/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, raza, transformacion, tecnica, saga, historia } = req.body;

  const sql = `
    UPDATE personaje SET
      nombre=?, raza=?, transformacion=?, tecnica=?, saga=?, historia=?
    WHERE id_personaje=?
  `;

  connection.query(
    sql,
    [nombre, raza, transformacion, tecnica, saga, historia, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Error al modificar personaje." });
      res.json({ message: "Personaje modificado." });
    }
  );
});


// ➤ Eliminar
app.delete("/api/personajes/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM personaje WHERE id_personaje=?";

  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: "Error al eliminar personaje." });
    res.json({ message: "Personaje eliminado." });
  });
});


// Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
