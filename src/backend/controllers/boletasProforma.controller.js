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
      cliente_dni, // Ahora puede ser nulo
      cliente_ruc,
      cliente_cel, // Ahora es obligatorio
      atendido_por,
      dni_atiende,
      observaciones,
      equipos,
    } = req.body;

    // 1. Validaciones Ajustadas
    // Se valida que cliente_nombre, cliente_cel, atendido_por y dni_atiende NO sean nulos.
    if (!cliente_nombre || !cliente_cel || !atendido_por || !dni_atiende) {
      return res
        .status(400)
        .json({
          message:
            "Faltan campos obligatorios (nombre, celular, atendido_por o dni_atiende)",
        });
    }
    if (!equipos || equipos.length === 0) {
      return res
        .status(400)
        .json({ message: "Incluya al menos un equipo para generar la boleta" });
    }

    // 2. Pre-cálculo de Subtotal y Validación de Equipos/Servicios
    let subtotal = 0;

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

      for (const srv of eq.servicios) {
        subtotal += parseFloat(srv.precio_servicio || 0);
      }
    }

    const total = subtotal;

    // 3. Inserción de la Boleta (Ajuste en la consulta SQL y en los valores)
    const [boletaResult] = await connection.query(
      "INSERT INTO boleta (tipo, cliente_nombre, cliente_dni, cliente_ruc, cliente_cel, empresa_ruc, atendido_por, dni_atiende, subtotal, total, numero_boleta, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        "PROFORMA",
        cliente_nombre,
        cliente_dni || null, // <-- Ajuste: Usamos null si cliente_dni está vacío
        cliente_ruc || null,
        cliente_cel, // <-- Ajuste: Se inserta el valor obligatorio
        process.env.RUC,
        atendido_por,
        dni_atiende,
        subtotal,
        total,
        numeroBoleta,
        observaciones || null,
      ]
    );

    const boletaId = boletaResult.insertId;

    // 4. Inserción Masiva de Equipos (Batch Insert) (Sin cambios)
    const equipoValues = equipos.map((eq) => [
      boletaId,
      eq.id_equipo_catalogo,
      eq.descripcion_equipo,
    ]);

    let serviciosData = [];
    if (equipoValues.length > 0) {
      const [equipoInsertResult] = await connection.query(
        "INSERT INTO boleta_equipo (id_boleta, id_equipo_catalogo, descripcion_equipo) VALUES ?",
        [equipoValues]
      );

      const primerEquipoId = equipoInsertResult.insertId;

      for (let i = 0; i < equipos.length; i++) {
        const equipoId = primerEquipoId + i;
        for (const srv of equipos[i].servicios) {
          serviciosData.push([
            equipoId,
            srv.nombre_servicio,
            srv.precio_servicio,
          ]);
        }
      }

      if (serviciosData.length > 0) {
        await connection.query(
          "INSERT INTO boleta_equipo_servicio (id_boleta_equipo, nombre_servicio, precio_servicio) VALUES ?",
          [serviciosData]
        );
      }
    }

    // 5. Obtención de la fecha
    const [boletaFinalResult] = await connection.query(
      "SELECT fecha_emision FROM boleta WHERE id_boleta = ?",
      [boletaId]
    );
    const fecha_emision = boletaFinalResult[0].fecha_emision;

    await connection.commit();

    // 6. Preparación de la respuesta
    const boletaData = {
      id_boleta: boletaId,
      tipo: "PROFORMA",
      numero_boleta: numeroBoleta,
      cliente: {
        nombre: cliente_nombre,
        dni: cliente_dni || null, // <-- Devuelve null si no se proporcionó DNI
        ruc: cliente_ruc || null,
        cel: cliente_cel,
      },
      empresa_ruc: process.env.RUC,
      atendido_por: {
        nombre: atendido_por,
        dni: dni_atiende,
      },
      observaciones,
      subtotal,
      total,
      fecha_emision,
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

//----------------------------------------------------------------------

/**
 * Función Optimizada: obtenerBoletaProforma
 * - Consolida boleta, equipos y nombres de equipos en una sola consulta (JOIN).
 * - Obtiene todos los servicios en una sola consulta (SELECT IN (?)).
 * - Reduce el número total de consultas de lectura de N+1 a solo 2.
 */
export const obtenerBoletaProforma = async (req, res) => {
  const { numero_boleta } = req.params;

  try {
    // 1. Consulta Consolidada: Boleta + Equipos
    const [rows] = await pool.query(
      `SELECT
            b.id_boleta, b.tipo, b.cliente_nombre, b.cliente_dni, b.cliente_ruc, b.empresa_ruc, b.atendido_por, b.dni_atiende, b.subtotal, b.total, b.numero_boleta, b.observaciones, b.fecha_emision,
            be.id_boleta_equipo,
            be.id_equipo_catalogo,
            be.descripcion_equipo,
            ec.nombre_equipo
        FROM boleta b
        LEFT JOIN boleta_equipo be ON b.id_boleta = be.id_boleta
        LEFT JOIN equipo_catalogo ec ON be.id_equipo_catalogo = ec.id_equipo_catalogo
        WHERE b.numero_boleta = ? AND b.tipo = "PROFORMA"`,
      [numero_boleta]
    );

    if (rows.length === 0 || !rows[0].id_boleta) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // El objeto base de la boleta (tomado del primer row)
    const boletaBase = {
      id_boleta: rows[0].id_boleta,
      tipo: rows[0].tipo,
      cliente_nombre: rows[0].cliente_nombre,
      cliente_dni: rows[0].cliente_dni,
      cliente_ruc: rows[0].cliente_ruc,
      atendido_por: rows[0].atendido_por,
      dni_atiende: rows[0].dni_atiende,
      observaciones: rows[0].observaciones,
      subtotal: rows[0].subtotal,
      total: rows[0].total,
      numero_boleta: rows[0].numero_boleta,
      fecha_emision: rows[0].fecha_emision,
      empresa_ruc: rows[0].empresa_ruc,
      equipos: [],
    };

    // 2. Recolectar IDs de equipos
    const equipoIds = rows
      .filter((row) => row.id_boleta_equipo != null)
      .map((row) => row.id_boleta_equipo);

    let serviciosMap = {};
    if (equipoIds.length > 0) {
      // 3. Consulta Única para todos los Servicios
      const [serviciosRows] = await pool.query(
        "SELECT id_boleta_equipo, nombre_servicio, precio_servicio FROM boleta_equipo_servicio WHERE id_boleta_equipo IN (?)",
        [equipoIds]
      );

      // Mapeo de servicios
      serviciosMap = serviciosRows.reduce((acc, servicio) => {
        const id = servicio.id_boleta_equipo;
        if (!acc[id]) {
          acc[id] = [];
        }
        acc[id].push({
          nombre_servicio: servicio.nombre_servicio,
          precio_servicio: servicio.precio_servicio,
        });
        return acc;
      }, {});
    }

    // 4. Reconstrucción del objeto final (en la aplicación)
    const equiposMap = {};
    rows.forEach((row) => {
      if (row.id_boleta_equipo) {
        if (!equiposMap[row.id_boleta_equipo]) {
          equiposMap[row.id_boleta_equipo] = {
            id_boleta_equipo: row.id_boleta_equipo,
            id_equipo_catalogo: row.id_equipo_catalogo,
            descripcion_equipo: row.descripcion_equipo,
            nombre_equipo: row.nombre_equipo,
            servicios: serviciosMap[row.id_boleta_equipo] || [],
          };
        }
      }
    });

    boletaBase.equipos = Object.values(equiposMap);

    res.json(boletaBase);
  } catch (e) {
    console.log("An error happend ", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

//----------------------------------------------------------------------

export const descargarBoletaProforma = async (req, res) => {
  try {
    const { numero } = req.params;
    const pdfPath = `pdf/${numero}.pdf`;

    res.sendFile(pdfPath, { root: process.cwd() });
  } catch (e) {
    res
      .status(500)
      .json({ message: "error al enviar el pdf", error: e.message });
  }
};
