import pool from "../config/db.js";

export const crearBoletaProforma = async (req, res) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();

  try {
    const {
      cliente_nombre,
      cliente_dni,
      cliente_ruc,
      empresa_ruc,
      atendido_por,
      dni_atiende,
      observaciones,
      equipos,
    } = req.body;

    const [boletaResult] = await connection.query(
      "INSERT INTO boleta (tipo, cliente_nombre, cliente_dni, cliente_ruc, empresa_ruc, atendido_por, dni_atiende, subtotal, total, numero_boleta, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, 0.00, 0.00, null, ?)",
      [
        "PROFORMA",
        cliente_nombre,
        cliente_dni,
        cliente_ruc || null,
        empresa_ruc,
        atendido_por,
        dni_atiende,
        observaciones || null,
      ]
    );

    const boletaId = boletaResult.insertId;

    let subtotal = 0;

    for (const eq of equipos) {
      const [equipoResult] = await connection.query(
        "INSERT INTO boleta_equipo (id_boleta, id_equipo_catalogo, descripcion_equipo) VALUES (?, ?, ?)",
        [boletaId, eq.id_equipo_catalogo, eq.descripcion_equipo]
      );

      const equipoId = equipoResult.insertId;

      for (const srv of eq.servicios) {
        await connection.query(
          "INSERT INTO boleta_equipo_servicio (id_boleta_equipo, nombre_servicio, precio_servicio) VALUES (?, ?, ?)",
          [equipoId, srv.nombre_servicio, srv.precio_servicio]
        );
        subtotal += parseFloat(srv.precio_servicio);
      }
    }

    const total = subtotal;

    await connection.query(
      "UPDATE boleta SET subtotal = ?, total = ? WHERE id_boleta = ?",
      [subtotal, total, boletaId]
    );
    await connection.commit();

    res.status(200).json({
      message: "Bill Succesfully created",
      id_boleta: boletaId,
      subtotal,
      total,
    });
  } catch (e) {
    await connection.rollback();
    console.log("There's an error creating the bill: ", e);
    res
      .status(500)
      .json({ message: "Error creating the bill", error: e.message });
  } finally {
    connection.release();
  }
};
