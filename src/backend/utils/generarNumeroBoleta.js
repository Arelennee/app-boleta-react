import pool from "../config/db.js";

export async function generarNumeroBoleta() {
  try {
    const [rows] = await pool.query(
      'SELECT numero_boleta FROM boleta WHERE tipo = "PROFORMA" ORDER BY id_boleta DESC LIMIT 1'
    );

    let nuevoNumero = 1;

    if (rows.length > 0 && rows[0].numero_boleta) {
      const numeroActual = parseInt(rows[0]).numero_boleta.replace(
        ("PROF-", ""),
        10
      );
      nuevoNumero = numeroActual + 1;
    }

    const numeroFormateado = String(nuevoNumero).padStart(9, "0");

    return `PROF-${numeroFormateado}`;
  } catch (e) {
    console.log("An error have occurred: ", e);
    throw e;
  }
}
