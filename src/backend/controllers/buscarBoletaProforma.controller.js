// buscarBoletaProforma.controller.js (CÓDIGO AJUSTADO)
import pool from "../config/db.js";

import dotenv from "dotenv"

dotenv.config();
/**
 * Optimiza la búsqueda flexible de boletas.
 * Se asegura de devolver la URL completa del PDF (pdf_url) para el frontend.
 */
export const buscarBoletasFlex = async (req, res) => {
  try {
    const { query, sort, limite, desde, hasta, page = 1 } = req.query;

    const resultLimit = parseInt(limite) || 50;
    const offset = (parseInt(page) - 1) * resultLimit;

    const apiHost = process.env.VITE_API_HOST || 'http://localhost:3000';

    // 💡 DEFINIMOS LA SENTENCIA BASE DE SELECCIÓN
    // Usamos COALESCE para manejar el caso de que pdf_url sea NULL.
    // Concatenamos la URL base desde la variable de entorno VITE_API_HOST.
    const SELECT_FIELDS = `
      *,
      CASE
        WHEN pdf_url IS NOT NULL THEN CONCAT('${apiHost}/', pdf_url)
        ELSE NULL
      END AS pdfUrlCompleta
    `;

    // 1. Manejo del caso por defecto (sin búsqueda)
    if (!query || query.trim() === "") {
      const [rows] = await pool.query(
        // 💡 CAMBIO AQUÍ: Usamos la sentencia SELECT_FIELDS
        `SELECT ${SELECT_FIELDS} FROM boleta ORDER BY fecha_emision ${
          sort === "asc" ? "ASC" : "DESC"
        } LIMIT ? OFFSET ?`,
        [resultLimit, offset]
      );
      return res.json(rows);
    }

    // 2. Preparación de términos y parámetros (Sin cambios)
    const terms = query
      .trim()
      .split(/\s+/)
      .filter((t) => t.length > 0);
    // 💡 CAMBIO AQUÍ: Usamos la sentencia SELECT_FIELDS
    let sql = `SELECT ${SELECT_FIELDS} FROM boleta`;
    const params = [];

    // 3. Construcción de la cláusula WHERE (Sin cambios en WHERE)
    if (terms.length > 0) {
      const termConditions = terms.map((term) => {
        const likeTerm = `%${term}%`;
        params.push(likeTerm, likeTerm, likeTerm, likeTerm);
        return `
          (cliente_dni LIKE ? 
          OR cliente_nombre LIKE ? 
          OR numero_boleta LIKE ? 
          OR total LIKE ?)
        `;
      });

      sql += ` WHERE ${termConditions.join(" AND ")}`;
    }

    // 4. Se añaden las cláusulas de fecha (Sin cambios)
    if (desde && hasta) {
      sql += terms.length > 0 ? " AND " : " WHERE ";
      sql += " fecha_emision BETWEEN ? AND ?";
      params.push(desde, hasta);
    }

    // 5. Ordenamiento (Sin cambios)
    sql += ` ORDER BY fecha_emision ${sort === "asc" ? "ASC" : "DESC"}`;

    // 6. Paginación (Sin cambios)
    sql += " LIMIT ? OFFSET ?";
    params.push(resultLimit, offset);

    // 7. Ejecución de la consulta (Sin cambios)
    const [rows] = await pool.query(sql, params);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No se encontraron boletas" });
    }

    res.json(rows);
  } catch (error) {
    console.error("Error en buscarBoletasFlex:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
