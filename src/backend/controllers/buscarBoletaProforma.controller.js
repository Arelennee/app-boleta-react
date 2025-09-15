import pool from "../config/db.js";

export const buscarBoletasFlex = async (req, res) => {
  try {
    const { query, sort, limite, desde, hasta, page = 1 } = req.query;

    // Si el query es nulo, vacío o solo espacios, se retorna la lista por defecto.
    if (!query || query.trim() === "") {
      const [rows] = await pool.query(
        "SELECT * FROM boleta ORDER BY fecha_emision DESC LIMIT 50"
      );
      return res.json(rows);
    }

    const terms = query.trim().split(/\s+/);

    // Construcción de la cláusula WHERE.
    const whereClauses = terms.map(
      () => `
      (cliente_dni LIKE ? 
      OR cliente_nombre LIKE ? 
      OR numero_boleta LIKE ? 
      OR total LIKE ?)
    `
    );

    let sql = `
      SELECT * FROM boleta
      WHERE ${whereClauses.join(" AND ")}
    `;

    // Armamos los parámetros.
    const params = [];
    terms.forEach((term) => {
      const likeTerm = `%${term}%`;
      params.push(likeTerm, likeTerm, likeTerm, likeTerm);
    });

    // Se añaden las cláusulas de fecha y ordenamiento.
    if (desde && hasta) {
      sql += " AND fecha_emision BETWEEN ? AND ?";
      params.push(desde, hasta);
    }

    if (sort === "asc") {
      sql += " ORDER BY fecha_emision ASC";
    } else {
      sql += " ORDER BY fecha_emision DESC";
    }

    const resultLimit = parseInt(limite) || 50;
    const offset = (page - 1) * resultLimit;
    sql += " LIMIT ? OFFSET ?";
    params.push(resultLimit, offset);

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
