import { Router } from "express";
import {
  crearBoletaProforma,
  obtenerBoletaProforma,
} from "../controllers/boletasProforma.controller.js";
import { buscarBoletasFlex } from "../controllers/buscarBoletaProforma.controller.js";

const router = Router();

router.post("/crearBoleta", crearBoletaProforma);
router.get("/obtenerBoleta/:numero_boleta", obtenerBoletaProforma);
router.get("/buscarBoleta", buscarBoletasFlex);

export default router;
