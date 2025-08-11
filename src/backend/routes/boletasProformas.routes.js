import { Router } from "express";
import {
  crearBoletaProforma,
  obtenerBoletaProforma,
} from "../controllers/boletasProforma.controller.js";

const router = Router();

router.post("/crearBoleta", crearBoletaProforma);
router.get("/obtenerBoleta/:numero_boleta", obtenerBoletaProforma);

export default router;
