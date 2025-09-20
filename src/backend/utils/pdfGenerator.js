import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import imagen1 from "./image.js";
import dotenv from "dotenv";
dotenv.config();

export const generarPDFBoleta = (boletaData) => {
  return new Promise((resolve, reject) => {
    try {
      // Usamos el id de la boleta para el nombre del archivo
      const filename = `${boletaData.numero_boleta}.pdf`;
      const filePath = path.join("pdfs", filename);

      const doc = new PDFDocument({
        size: "A4",
        margin: 20,
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // --- Cabecera: Logo y RUC/Boleta ---
      const startY = doc.y;
      const docWidth =
        doc.page.width - doc.page.margins.left - doc.page.margins.right;
      const logoWidth = 225;
      const logoHeight = 123.75;
      const boxWidth = 200;
      const boxX = doc.page.width - doc.page.margins.right - boxWidth;

      // Logo en la esquina superior izquierda
      doc.image(imagen1, doc.page.margins.left, startY, {
        width: logoWidth,
        height: logoHeight,
      });

      // El cuadro de información de la boleta
      const boxY = startY + 10;
      doc.rect(boxX, boxY, boxWidth, 70).stroke();

      // Contenido de la caja
      doc.fontSize(11).text(`R.U.C ${process.env.RUC}`, boxX, boxY + 5, {
        width: boxWidth,
        align: "center",
      });
      doc
        .moveTo(boxX, boxY + 25)
        .lineTo(boxX + boxWidth, boxY + 25)
        .stroke();

      doc.fontSize(12).text(`Boleta-${boletaData.tipo}`, boxX, boxY + 30, {
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

      // --- Sección de Datos del Cliente, Fecha y Atendido por ---
      const clienteRectY = doc.y;
      doc.rect(doc.page.margins.left, clienteRectY, docWidth, 40).stroke();

      const clienteTextX = doc.page.margins.left + 5;
      const clienteTextY = clienteRectY + 5;

      // Datos del cliente en una sola línea
      let clienteInfo = `Cliente: ${boletaData.cliente.nombre}`;
      if (boletaData.cliente.dni)
        clienteInfo += ` | DNI: ${boletaData.cliente.dni}`;
      if (boletaData.cliente.ruc)
        clienteInfo += ` | RUC: ${boletaData.cliente.ruc}`;
      doc.fontSize(10).text(clienteInfo, clienteTextX, clienteTextY);

      // Fecha de Emisión
      const fechaText = `Fecha: ${boletaData.fecha_emision}`;
      const fechaWidth = doc.widthOfString(fechaText);
      const fechaX = docWidth + doc.page.margins.left - fechaWidth - 5;
      doc.text(fechaText, fechaX, clienteTextY);

      // Información de quien atendió
      const atendidoPorText = `Atendido por: ${boletaData.atendido_por.nombre} (DNI: ${boletaData.atendido_por.dni})`;
      doc.text(atendidoPorText, clienteTextX, clienteRectY + 20);

      doc.y = clienteRectY + 40 + 10;

      // --- Sección de Observaciones ---
      const obsRectY = doc.y;
      doc.rect(doc.page.margins.left, obsRectY, docWidth, 40).stroke();

      if (boletaData.observaciones) {
        doc
          .fontSize(10)
          .text("Observaciones:", doc.page.margins.left + 5, obsRectY + 5);
        doc.text(
          boletaData.observaciones,
          doc.page.margins.left + 5,
          obsRectY + 20
        );
      } else {
        doc
          .fontSize(10)
          .text("Observaciones: N/A", doc.page.margins.left + 5, obsRectY + 5);
      }
      doc.y = obsRectY + 40 + 10;

      // --- Tabla de Equipos y Servicios (Detallada) ---
      const tableTop = doc.y;
      const colWidths = [
        docWidth * 0.4,
        docWidth * 0.25,
        docWidth * 0.15,
        docWidth * 0.2,
      ];
      let currentY = tableTop;
      let subtotal = 0;

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

      // Contenido de la tabla por cada equipo y sus servicios
      boletaData.equipos.forEach((eq) => {
        const startOfEquipmentRow = currentY;

        // AÑADIMOS EL NOMBRE DEL EQUIPO AQUÍ
        doc
          .fontSize(10)
          .font("Helvetica-Bold") // Aplica negrita al nombre
          .text(
            `${eq.id_equipo_catalogo}`, // Usa la propiedad nombre_equipo
            doc.page.margins.left + 5,
            currentY + 5,
            { width: colWidths[0] - 10 }
          );

        // La descripción ahora se coloca debajo del nombre
        doc
          .font("Helvetica") // Vuelve a la fuente normal para la descripción
          .text(
            `Descripción: ${eq.descripcion_equipo}`,
            doc.page.margins.left + 5,
            currentY + 20, // Ajusta la posición vertical
            { width: colWidths[0] - 10 }
          );

        let equipoTotal = 0;

        eq.servicios.forEach((srv, index) => {
          // Ajusta la posición vertical de los servicios
          const serviceY = startOfEquipmentRow + 35 + index * 15;
          doc.text(
            srv.nombre_servicio,
            doc.page.margins.left + colWidths[0] + 5,
            serviceY,
            { width: colWidths[1] - 10 }
          );
          doc.text(
            `S/ ${parseFloat(srv.precio_servicio).toFixed(2)}`,
            doc.page.margins.left + colWidths[0] + colWidths[1] + 5,
            serviceY,
            { width: colWidths[2] - 10 }
          );
          doc.text(
            `S/ ${parseFloat(srv.precio_servicio).toFixed(2)}`,
            doc.page.margins.left +
              colWidths[0] +
              colWidths[1] +
              colWidths[2] +
              5,
            serviceY,
            { width: colWidths[3] - 10 }
          );
          equipoTotal += parseFloat(srv.precio_servicio);
        });

        // Asegura que la posición del próximo equipo sea la correcta
        currentY = Math.max(
          doc.y,
          startOfEquipmentRow + 35 + eq.servicios.length * 15
        );
        doc
          .moveTo(doc.page.margins.left, currentY)
          .lineTo(doc.page.margins.left + docWidth, currentY)
          .stroke();
        subtotal += equipoTotal;
      });

      // Totales
      currentY += 10;
      const totalText = `Subtotal: S/ ${subtotal.toFixed(
        2
      )} | Total: S/ ${subtotal.toFixed(2)}`;
      doc
        .fontSize(12)
        .text(totalText, doc.page.margins.left, currentY, { align: "right" });

      // Finalizar
      doc.end();
      stream.on("finish", () => resolve(filename));
      stream.on("error", reject);
    } catch (e) {
      reject(e);
    }
  });
};
