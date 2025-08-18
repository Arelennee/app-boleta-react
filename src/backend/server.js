import dotenv from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import boletasProformaRoutes from "./routes/boletasProformas.routes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import trabajadoresRoutes from "./routes/trabajadores.routes.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(json());
app.use(morgan("dev"));

app.use("/api", boletasProformaRoutes);
app.use("/api", equiposRoutes);
app.use("/api", trabajadoresRoutes);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
