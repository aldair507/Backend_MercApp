"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = require("./config/app");
const db_1 = require("./config/db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const Administrador_routes_1 = require("./modules/administrador/routes/Administrador.routes");
const Auth_routes_1 = require("./modules/auth/routes/Auth.routes");
// Importar las rutas de usuarios
const app = (0, express_1.default)();
const PORT = app_1.config.PORT;
// Middlewares básicos
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use("/api/admin", Administrador_routes_1.router); // Rutas de usuarios
app.use("/api/auth", Auth_routes_1.router); // Rutas de autenticación
(0, db_1.connectDB)();
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
