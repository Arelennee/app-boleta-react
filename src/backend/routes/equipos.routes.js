import { Router } from "express";
import { obtenerEquipos } from "../controllers/equiposCatalogo.controller.js";

const router = Router();

router.get("/obtenerEquipos", obtenerEquipos);

export default router;
