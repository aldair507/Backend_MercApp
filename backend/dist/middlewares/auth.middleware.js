"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const Administrador_controller_1 = require("../modules/persona/controllers/Administrador.controller");
const Auth_service_1 = require("../modules/auth/services/Auth.service");
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado en la cookie" });
        return;
    }
    if (Administrador_controller_1.blacklistedTokens.has(token)) {
        res.status(401).json({
            message: "Token invalidado, por favor vuelva a iniciar sesión",
        });
        return;
    }
    try {
        const decoded = (0, Auth_service_1.verifyToken)(token);
        req.user = decoded; // o usar tipado correcto con declaración global
        next();
    }
    catch (err) {
        res.status(401).json({
            message: "Token inválido",
            error: err instanceof Error
                ? err.message
                : "Error desconocido al verificar el token",
        });
    }
};
exports.authenticateToken = authenticateToken;
