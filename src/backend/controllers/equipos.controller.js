import pool from "../config/db.js";

export const getEquipos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM equipo_catalogo");
    res.json(rows);
  } catch (e) {
    console.log("An error occured at trying obtain equipos", e);
    res.status(500).json({ message: "Error obtainig equipos" });
  }
};
