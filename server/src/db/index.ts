import mysql from "mysql2/promise";
import dbConfig from "../config/db.config"; // Importa la configurazione del database

// Configurazione del connection pool
const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

export const getConnection = async () => {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error("Errore durante la connessione a MySQL:", error);
    throw error;
  }
};

export default pool;
