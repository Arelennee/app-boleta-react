import pool from "../config/db.js";

export const buscarBoletasFlex = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ message: "Ingrese un criterio de búsqueda" });
    }

    const terms = query.trim().split(/\s+/);

    // Construimos el WHERE dinámico
    const whereClauses = terms.map(
      () => `
      (cliente_dni LIKE ? 
      OR cliente_nombre LIKE ? 
      OR numero_boleta LIKE ? 
      OR cliente_ruc LIKE ? 
      OR total LIKE ?)
    `
    );

    const sql = `
      SELECT * FROM boleta
      WHERE ${whereClauses.join(" AND ")}
    `;

    // Armamos los parámetros (cada término aplica a 4 columnas)
    const params = [];
    terms.forEach((term) => {
      const likeTerm = `%${term}%`;
      params.push(likeTerm, likeTerm, likeTerm, likeTerm);
    });

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
