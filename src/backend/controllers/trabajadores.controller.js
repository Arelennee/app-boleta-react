import pool from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

const obtenerTrabajadores = async (req, res) => {
  try {
    const query = "SELECT * FROM trabajadores";
    const [result] = await pool.query(query);
    res.status(200).json(result);
  } catch (e) {
    console.error("error en el server al procesar la peticion: ", e);
    res.status(500).json({ message: "internal error server" });
  }
};
export default obtenerTrabajadores;
