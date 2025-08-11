import dotenv from "dotenv";
import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import boletasProformaRoutes from "./routes/boletasProformas.routes.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", boletasProformaRoutes);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});
