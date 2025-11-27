import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web"   // ← aquí va tu base de datos
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la BD:", err);
  } else {
    console.log("Conexión a MySQL exitosa.");
  }
});

export default connection;
