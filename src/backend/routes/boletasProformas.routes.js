import { Router } from "express";
import { crearBoletaProforma } from "../controllers/boletasProforma.controller.js";

const router = Router();

router.post("/boletas-proforma", crearBoletaProforma);

export default router;
