import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

// Esquema de validación para variables de entorno
const envSchema = z.object({
  PORT: z.number().default(3000),
  DB_URI: z.string().url().min(1),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
});

// Validar y exportar las variables
export const config = envSchema.parse({
  PORT: parseInt(process.env.PORT || "4000"),
  DB_URI: process.env.DB_URI ,
  NODE_ENV: process.env.NODE_ENV,
  
});
console.log(`Configuración cargada: ${config.NODE_ENV}`);

// Configuración adicional del servidor (opcional)
export const serverConfig = {
  corsOptions: { origin: "*" },
  helmetOptions: { contentSecurityPolicy: false }, 
};