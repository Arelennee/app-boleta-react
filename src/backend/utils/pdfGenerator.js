// pdfGenerator.js (CÓDIGO AJUSTADO)
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import imagen1 from "./image.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const getEquipmentNameById = (id) => {
  switch (id) {
    case 1:
      return "PC";
    case 2:
      return "Laptop";
    case 3:
      return "Impresora";
    default:
      return "Equipo no especificado";
  }
};

export const generarPDFBoleta = (boletaData) => {
  return new Promise((resolve, reject) => {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      const filename = `${boletaData.numero_boleta}.pdf`;
      const filePath = path.join(__dirname, "..", "pdfs", filename);

      const doc = new PDFDocument({
        size: "A4",
        margin: 20,
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // --- Cabecera: Logo y RUC/Boleta (sin cambios) ---
      const startY = doc.y;
      const docWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const logoWidth = 225;
      const logoHeight = 123.75;
      const boxWidth = 200;
      const boxX = doc.page.width - doc.page.margins.right - boxWidth;

      doc.image(imagen1, doc.page.margins.left, startY, {
        width: logoWidth,
        height: logoHeight,
      });

      const boxY = startY + 10;
      doc.rect(boxX, boxY, boxWidth, 70).stroke();

      doc.fontSize(11).text(`R.U.C ${process.env.RUC}`, boxX, boxY + 5, {
        width: boxWidth,
        align: "center",
      });
      doc
        .moveTo(boxX, boxY + 25)
        .lineTo(boxX + boxWidth, boxY + 25)
        .stroke();

      doc.fontSize(12).text(`${boletaData.tipo}`, boxX, boxY + 30, {
        width: boxWidth,
        align: "center",
      });
      doc
        .moveTo(boxX, boxY + 50)
        .lineTo(boxX + boxWidth, boxY + 50)
        .stroke();

      doc.fontSize(11).text(`N° ${boletaData.numero_boleta}`, boxX, boxY + 55, {
        width: boxWidth,
        align: "center",
      });

      doc.y = Math.max(doc.y, startY + logoHeight) + 15;

      // --- Sección de Datos del Cliente, Fecha y Atendido por (AJUSTADA) ---
      const clienteRectY = doc.y;
      doc.rect(doc.page.margins.left, clienteRectY, docWidth, 40).stroke();

      const clienteTextX = doc.page.margins.left + 5;
      const clienteTextY = clienteRectY + 5;

      let clienteInfo = `Cliente: ${boletaData.cliente.nombre}`;
      if (boletaData.cliente.dni)
        clienteInfo += ` | DNI: ${boletaData.cliente.dni}`;
      if (boletaData.cliente.ruc)
        clienteInfo += ` | RUC: ${boletaData.cliente.ruc}`;
      if (boletaData.cliente.cel)
        clienteInfo += ` | Número de Cliente: ${boletaData.cliente.cel}`;
      doc.fontSize(10).text(clienteInfo, clienteTextX, clienteTextY);

      const fechaHoraFormateada = formatDateTime(boletaData.fecha_emision);
      const fechaText = `Fecha: ${fechaHoraFormateada}`;
      const fechaWidth = doc.widthOfString(fechaText);
      const fechaX = docWidth + doc.page.margins.left - fechaWidth - 5;
      doc.text(fechaText, fechaX, clienteTextY);

      // 💡 AJUSTE CLAVE: Eliminamos la referencia a boletaData.atendido_por.dni
      const atendidoPorText = `Atendido por: ${boletaData.atendido_por.nombre}`;
      // Movemos este texto para que quede mejor centrado verticalmente
      doc.text(atendidoPorText, clienteTextX, clienteRectY + 20);

      doc.y = clienteRectY + 40 + 10;

      // --- Sección de Observaciones (DINÁMICA) ---
      const obsRectY = doc.y;
      let obsRectHeight;

      const textOptions = {
        width: docWidth - 10,
        align: 'left'
      };

      if (boletaData.observaciones && boletaData.observaciones.trim() !== '') {
        // 1. Medir la altura que necesitará el texto (versión definitiva)
        const lines = boletaData.observaciones.split('\n');
        let totalTextHeight = 0;
        // Se calcula la altura de una línea estándar (incluso si está vacía)
        const lineHeight = doc.heightOfString(' ', textOptions);

        lines.forEach(line => {
          if (line.trim() === '') {
            // Si la línea está vacía (un "Enter"), sumar la altura de una línea
            totalTextHeight += lineHeight;
          } else {
            // Si la línea tiene texto, medir su altura (que puede ser mayor si hay ajuste de línea)
            totalTextHeight += doc.heightOfString(line, textOptions);
          }
        });

        obsRectHeight = totalTextHeight + 30; // Altura total del texto + padding

        // 2. Dibujar el cuadro con la altura calculada
        doc.rect(doc.page.margins.left, obsRectY, docWidth, obsRectHeight).stroke();

        // 3. Escribir el texto
        doc.fontSize(10).text("Observaciones:", doc.page.margins.left + 5, obsRectY + 5);
        doc.text(boletaData.observaciones, doc.page.margins.left + 5, obsRectY + 20, textOptions);
      } else {
        // Si no hay observaciones, dibujar un cuadro más pequeño
        obsRectHeight = 20;
        doc.rect(doc.page.margins.left, obsRectY, docWidth, obsRectHeight).stroke();
        doc.fontSize(10).text("Observaciones: N/A", doc.page.margins.left + 5, obsRectY + 5);
      }

      // 4. Ajustar la posición 'y' para el resto del documento, con espaciado inferior
      doc.y = obsRectY + obsRectHeight + 10;

      // --- Tabla de Equipos y Servicios (sin cambios) ---
      const tableTop = doc.y;
      const colWidths = [
        docWidth * 0.4,
        docWidth * 0.25,
        docWidth * 0.15,
        docWidth * 0.2,
      ];
      let currentY = tableTop;
      let totalBoleta = 0;

      // Encabezados de la tabla
      doc
        .fontSize(10)
        .text("Descripción de Equipo", doc.page.margins.left + 5, currentY, {
          width: colWidths[0],
        })
        .text("Servicio", doc.page.margins.left + colWidths[0] + 5, currentY, {
          width: colWidths[1],
        })
        .text(
          "Precio Unitario",
          doc.page.margins.left + colWidths[0] + colWidths[1] + 5,
          currentY,
          { width: colWidths[2] }
        )
        .text(
          "Total",
          doc.page.margins.left +
            colWidths[0] +
            colWidths[1] +
            colWidths[2] +
            5,
          currentY,
          { width: colWidths[3] }
        );
      currentY += 20;
      doc
        .moveTo(doc.page.margins.left, currentY)
        .lineTo(doc.page.margins.left + docWidth, currentY)
        .stroke();

      // Contenido de la tabla por cada equipo y sus servicios (AJUSTADO PARA ALTURA DINÁMICA)
      boletaData.equipos.forEach((eq) => {
        const rowTop = currentY;
        const PADDING = 5;

        // Guardar la posición Y inicial para la columna de servicios
        const servicesInitialY = rowTop + PADDING;
        let servicesCurrentY = servicesInitialY;

        // Dibujar la columna de servicios (2 y 3) y calcular su altura total
        let equipoTotal = 0;
        eq.servicios.forEach((srv) => {
          equipoTotal += parseFloat(srv.precio_servicio);
          const serviceNameHeight = doc.heightOfString(srv.nombre_servicio, {
            width: colWidths[1] - PADDING * 2,
          });

          doc.text(
            srv.nombre_servicio,
            doc.page.margins.left + colWidths[0] + PADDING,
            servicesCurrentY,
            { width: colWidths[1] - PADDING * 2 }
          );
          doc.text(
            `S/ ${parseFloat(srv.precio_servicio).toFixed(2)}`,
            doc.page.margins.left + colWidths[0] + colWidths[1] + PADDING,
            servicesCurrentY,
            { width: colWidths[2] - PADDING * 2 }
          );
          servicesCurrentY += serviceNameHeight; // Incrementar Y para el siguiente servicio
        });
        const servicesColumnEnd = servicesCurrentY;

        // Dibujar la columna de descripción (1)
        const nombreEquipo = getEquipmentNameById(
          Number(eq.id_equipo_catalogo)
        );
        doc
          .fontSize(10)
          .font("Helvetica-Bold")
          .text(
            nombreEquipo,
            doc.page.margins.left + PADDING,
            rowTop + PADDING,
            {
              width: colWidths[0] - PADDING * 2,
            }
          );
        doc
          .font("Helvetica")
          .text(
            `Descripción: ${eq.descripcion_equipo}`,
            doc.page.margins.left + PADDING,
            doc.y, // Continuar donde terminó el texto anterior
            { width: colWidths[0] - PADDING * 2 }
          );
        const descriptionColumnEnd = doc.y;

        // Dibujar la columna de total (4)
        doc.text(
          `S/ ${equipoTotal.toFixed(2)}`,
          doc.page.margins.left +
            colWidths[0] +
            colWidths[1] +
            colWidths[2] +
            PADDING,
          rowTop + PADDING, // Alinear con la parte superior de la fila
          { width: colWidths[3] - PADDING * 2 }
        );

        // Determinar la altura final de la fila y la nueva posición Y
        currentY = Math.max(descriptionColumnEnd, servicesColumnEnd) + PADDING * 2;

        // Manejo de salto de página
        if (currentY > doc.page.height - doc.page.margins.bottom - 50) {
          doc.addPage();
          currentY = doc.page.margins.top;
          // NOTA: Faltaría redibujar los encabezados de la tabla aquí si ocurre un salto.
        }

        // Dibujar la línea separadora
        doc
          .moveTo(doc.page.margins.left, currentY)
          .lineTo(doc.page.margins.left + docWidth, currentY)
          .stroke();

        totalBoleta += equipoTotal;
      });

      currentY += 10;
      // Solo mostramos el total de la boleta, sin subtotal
      const totalText = `Total: S/ ${totalBoleta.toFixed(2)}`;
      doc
        .fontSize(12)
        .text(totalText, doc.page.margins.left, currentY, { align: "right" });

      // --- Disclaimer al final de la página ---
      doc
        .fontSize(10)
        .font("Helvetica-Oblique")
        .text(
          "Todo recojo y/o reclamo tiene que ser con boleta en mano",
          doc.page.margins.left,
          doc.page.height - 50, // Posición vertical fija en la parte inferior
          {
            align: "center",
            width: docWidth
          }
        );

      doc.end();
      stream.on("finish", () => resolve(filename));
      stream.on("error", reject);
    } catch (e) {
      reject(e);
    }
  });
};
