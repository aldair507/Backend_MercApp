import express from "express";
import { config } from "./config/app";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router as personasRouter } from './modules/persona/routes/persona.routes';
import { router as authRouter } from './modules/auth/routes/Auth.routes';

// Importar las rutas de usuarios

const app = express();
const PORT = config.PORT;

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors("http://localhost:5173"));

app.use(cookieParser());

// app.use("/api", UserRoutes);
app.use("/api", personasRouter); // Rutas de usuarios
app.use("/api", authRouter); // Rutas de autenticación

connectDB();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
