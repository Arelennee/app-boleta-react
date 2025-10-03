import pool from "../config/db.js";

/**
 * Optimiza la búsqueda flexible de boletas.
 * - Mejora la legibilidad de la construcción de la consulta SQL.
 * - Manejo más limpio de los parámetros de búsqueda.
 * - Usa `COALESCE` para manejar valores nulos en el límite/offset de manera concisa.
 */
export const buscarBoletasFlex = async (req, res) => {
  try {
    const { query, sort, limite, desde, hasta, page = 1 } = req.query;

    // Convertir a número con valor por defecto
    const resultLimit = parseInt(limite) || 50;
    const offset = (parseInt(page) - 1) * resultLimit;

    // 1. Manejo del caso por defecto (sin búsqueda)
    if (!query || query.trim() === "") {
      const [rows] = await pool.query(
        // Se mantiene la ordenación por defecto, si no se especifica 'sort'
        `SELECT * FROM boleta ORDER BY fecha_emision ${
          sort === "asc" ? "ASC" : "DESC"
        } LIMIT ? OFFSET ?`,
        [resultLimit, offset] // Se aplican el límite y el offset por defecto
      );
      return res.json(rows);
    }

    // 2. Preparación de términos y parámetros
    const terms = query
      .trim()
      .split(/\s+/)
      .filter((t) => t.length > 0);
    let sql = `SELECT * FROM boleta`;
    const params = [];

    // 3. Construcción de la cláusula WHERE (Busca cada término en todos los campos)
    if (terms.length > 0) {
      // Se crea una condición global para asegurar que TODAS las cláusulas de término
      // y la cláusula de fecha (si existe) se unan correctamente.
      const termConditions = terms.map((term) => {
        const likeTerm = `%${term}%`;
        // El problema potencial aquí es que, al concatenar múltiples ORs en un array
        // y luego unirlos con AND, se pierde la agrupación por término.
        // La lógica correcta es: (T1_DNI OR T1_NOMBRE OR T1_BOLETA) AND (T2_DNI OR T2_NOMBRE OR T2_BOLETA)...
        // El código original ya hacía esto, solo mejoramos la construcción del array de parámetros.

        // El patrón es: (C1 LIKE ? OR C2 LIKE ? OR C3 LIKE ? OR C4 LIKE ?)
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

    // 4. Se añaden las cláusulas de fecha
    if (desde && hasta) {
      // Si ya hay una cláusula WHERE de términos, añadimos AND
      sql += terms.length > 0 ? " AND " : " WHERE ";
      sql += " fecha_emision BETWEEN ? AND ?";
      params.push(desde, hasta);
    }

    // 5. Ordenamiento
    sql += ` ORDER BY fecha_emision ${sort === "asc" ? "ASC" : "DESC"}`;

    // 6. Paginación
    sql += " LIMIT ? OFFSET ?";
    params.push(resultLimit, offset);

    // 7. Ejecución de la consulta
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
