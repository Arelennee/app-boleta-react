import pool from "../config/db.js";
import dotenv from "dotenv";
import { generarNumeroBoleta } from "../utils/generarNumeroBoleta.js";
import { generarPDFBoleta } from "../utils/pdfGenerator.js";
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

    if (!cliente_nombre || !cliente_dni || !atendido_por || !dni_atiende) {
      return res.status(400).json({ message: "Faltan campos con datos" });
    }
    if (!equipos || equipos.length === 0) {
      res
        .status(400)
        .json({ message: "Inlcuya al menos un equipo para generar la boleta" });
    }

    for (const eq of equipos) {
      if (
        !eq.id_equipo_catalogo ||
        !eq.descripcion_equipo ||
        !eq.servicios?.length
      ) {
        return res
          .status(400)
          .json({ message: "Equipos o servicios incompletos" });
      }
    }

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

    // 💡 Paso clave: Obtener la fecha de la base de datos
    const [boletaFinalResult] = await connection.query(
      "SELECT fecha_emision FROM boleta WHERE id_boleta = ?",
      [boletaId]
    );
    const fecha_emision = boletaFinalResult[0].fecha_emision;

    await connection.commit();

    const boletaData = {
      id_boleta: boletaId,
      tipo: "PROFORMA",
      numero_boleta: numeroBoleta,
      cliente: {
        nombre: cliente_nombre,
        dni: cliente_dni,
        ruc: cliente_ruc || null,
      },
      empresa_ruc: process.env.RUC,
      atendido_por: {
        nombre: atendido_por,
        dni: dni_atiende,
      },
      observaciones,
      subtotal,
      total,
      fecha_emision, // ✨ La fecha ahora está aquí
      equipos: equipos.map((eq) => ({
        id_equipo_catalogo: eq.id_equipo_catalogo,
        descripcion_equipo: eq.descripcion_equipo,
        servicios: eq.servicios.map((srv) => ({
          nombre_servicio: srv.nombre_servicio,
          precio_servicio: srv.precio_servicio,
        })),
      })),
    };

    const pdfPath = await generarPDFBoleta(boletaData);

    res.status(200).json({
      message: "Bill Succesfully created",
      id_boleta: boletaId,
      subtotal,
      total,
      pdfUrl: `pdfs/${numeroBoleta}.pdf`,
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

//obtencion de la boleta proforma mediante el numero de boleta
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

export const descargarBoletaProforma = async (req, res) => {
  try {
    const { numero } = req.params;
    const pdfPath = `pdf/${numero}.pdf`;

    res.sendFile(pdfPath, { root: process.cwd() });
  } catch (e) {
    res.status(500).json({ message: "error al enviar el pdf", e });
  }
};
