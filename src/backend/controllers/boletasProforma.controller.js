import pool from "../config/db.js";
import dotenv from "dotenv";
import { generarNumeroBoleta } from "../utils/generarNumeroBoleta.js";
dotenv.config();

export const crearBoletaProforma = async (req, res) => {
  const connection = await pool.getConnection();
  await connection.beginTransaction();
  const numeroBoleta = await generarNumeroBoleta();

  try {
    const {
      cliente_nombre,
      cliente_dni,
      cliente_ruc,
      atendido_por,
      dni_atiende,
      observaciones,
      equipos,
    } = req.body;

    const [boletaResult] = await connection.query(
      "INSERT INTO boleta (tipo, cliente_nombre, cliente_dni, cliente_ruc, empresa_ruc, atendido_por, dni_atiende, subtotal, total, numero_boleta, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, 0.00, 0.00, ?, ?)",
      [
        "PROFORMA",
        cliente_nombre,
        cliente_dni,
        cliente_ruc || null,
        process.env.RUC,
        atendido_por,
        dni_atiende,
        numeroBoleta,
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
/*
El estilo de la peticion debe ser asi:
{
  "cliente_nombre": "Juan Pérez",
  "cliente_dni": "12345678",
  "cliente_ruc": null,
  "atendido_por": "Carlos Ramírez",
  "dni_atiende": "87654321",
  "observaciones": "Cliente solicita servicio rápido",
  "equipos": [
    {
      "id_equipo_catalogo": 1,
      "descripcion_equipo": "Laptop Lenovo con problemas de encendido",
      "servicios": [
        { "nombre_servicio": "Revisión de hardware", "precio_servicio": 50.00 },
        { "nombre_servicio": "Cambio de batería", "precio_servicio": 120.00 }
      ]
    },
    {
      "id_equipo_catalogo": 2,
      "descripcion_equipo": "PC de escritorio con fallas en el sistema operativo",
      "servicios": [
        { "nombre_servicio": "Instalación de Windows", "precio_servicio": 80.00 }
      ]
    }
  ]
}
*/
export const obtenerBoletaProforma = async (req, res) => {
  const { numero_boleta } = req.params;

  try {
    const [boletaRows] = await pool.query(
      'SELECT * FROM boleta WHERE numero_boleta = ? AND tipo = "PROFORMA"',
      [numero_boleta]
    );
    if (boletaRows.length === 0) {
      return res.status(400).json({ message: "Bill not found" });
    }

    const boleta = boletaRows[0];

    const [equiposRows] = await pool.query(
      "SELECT be.*, ec.nombre_equipo FROM boleta_equipo be INNER JOIN equipo_catalogo ec ON be.id_equipo_catalogo = ec.id_equipo_catalogo WHERE be.id_boleta = ?",
      [boleta.id_boleta]
    );

    let serviciosMap = {};
    if (equiposRows.length > 0) {
      const equipoIds = equiposRows.map((eq) => eq.id_boleta_equipo);
      const [serviciosRows] = await pool.query(
        "SELECT * FROM boleta_equipo_servicio WHERE id_boleta_equipo IN (?)",
        [equipoIds]
      );

      serviciosMap = serviciosRows.reduce((acc, servicio) => {
        if (!acc[servicio.id_boleta_equipo]) {
          acc[servicio.id_boleta_equipo] = [];
        }
        acc[servicio.id_boleta_equipo].push(servicio);
        return acc;
      }, {});
    }

    const equiposConServicios = equiposRows.map((eq) => ({
      ...eq,
      servicios: serviciosMap[eq.id_boleta_equipo] || [],
    }));

    const boletaCompleta = {
      ...boleta,
      equipos: equiposConServicios,
    };
    res.json(boletaCompleta);
  } catch (e) {
    console.log("An error happend ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};
