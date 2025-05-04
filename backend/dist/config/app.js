"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = exports.config = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Esquema de validación para variables de entorno
const envSchema = zod_1.z.object({
    PORT: zod_1.z.number().default(3000),
    DB_URI: zod_1.z.string().url().min(1),
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("development"),
});
// Validar y exportar las variables
exports.config = envSchema.parse({
    PORT: parseInt(process.env.PORT || "4000"),
    DB_URI: process.env.DB_URI,
    NODE_ENV: process.env.NODE_ENV,
});
console.log(`Configuración cargada: ${exports.config.NODE_ENV}`);
// Configuración adicional del servidor (opcional)
exports.serverConfig = {
    corsOptions: { origin: "*" },
    helmetOptions: { contentSecurityPolicy: false },
};
