import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import imagen1 from "./image.js";

export const generarPDFBoleta = (boletaData) => {
  return new Promise((resolve, reject) => {
    try {
      const filename = `${boletaData.numero_boleta}.pdf`;
      const filePath = path.join("pdfs", filename);

      const doc = new PDFDocument({
        size: "A4",
        margin: 20,
      });
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      doc.image(imagen1, {
        width: 225,
        height: 123.75,
      });

      doc.fontSize(16).text("Boleta Proforma", { align: "right" });
      doc.moveDown();

      doc.fontSize(12).text(`Número: ${boletaData.numero_boleta}`);
      doc.text(`Cliente : ${boletaData.cliente.nombre}`);
      if (boletaData.cliente.dni)
        doc.text(`Dni del Cliente: ${boletaData.cliente.dni}`);
      if (boletaData.cliente.ruc)
        doc.text(`RUC del Cliente: ${boletaData.cliente.ruc}`);
      doc.text(
        `Atendido por: ${boletaData.atendido_por.nombre} (DNI: ${boletaData.atendido_por.dni})`
      );
      if (boletaData.observaciones)
        doc.text(`Observaciones: ${boletaData.observaciones}`);
      doc.moveDown();

      doc.fontSize(14).text("Equipos y servicios");
      doc.moveDown(0.5);
      let subtotal = 0;
      boletaData.equipos.forEach((eq, index) => {
        doc.fontSize(12).text(`${index + 1}. ${eq.descripcion_equipo}`);
        eq.servicios.forEach((srv) => {
          doc.text(`   - ${srv.nombre_servicio}: S/ ${srv.precio_servicio}`);
          subtotal += parseFloat(srv.precio_servicio);
        });
        doc.moveDown(0.5);
      });

      doc.moveDown();
      doc.fontSize(12).text(`Subtotal: S/ ${subtotal.toFixed(2)}`);
      doc.text(`Total: S/ ${subtotal.toFixed(2)}`, { underline: true });

      // Finalizar
      doc.end();
      stream.on("finish", () => resolve(filename));
      stream.on("error", reject);
    } catch (e) {
      reject(e);
    }
  });
};
