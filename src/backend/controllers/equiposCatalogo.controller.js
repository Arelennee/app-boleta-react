import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

export const obtenerEquipos = async (req, res) => {
  try {
    const query = "SELECT * FROM equipo_catalogo";
    const [result] = await pool.query(query);
    res.status(200).json(result);
  } catch (e) {
    console.error("Error obteniendo los equipos", e);
    res.status(500).json({ message: "error interno del server" });
  }
};
