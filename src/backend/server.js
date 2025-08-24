import dotenv from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import boletasProformaRoutes from "./routes/boletasProformas.routes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import trabajadoresRoutes from "./routes/trabajadores.routes.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const PORT = process.env.PORT;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.use("/api", boletasProformaRoutes);
app.use("/api", equiposRoutes);
app.use("/api", trabajadoresRoutes);
app.use("/pdfs", express.static(path.join(__dirname, "../../pdfs")));

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
