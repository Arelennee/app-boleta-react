import { Router } from "express";
import obtenerTrabajadores from "../controllers/trabajadores.controller.js";

const router = Router();

router.get("/trabajadores", obtenerTrabajadores);

export default router;
