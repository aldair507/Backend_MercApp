"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Administrador_controller_1 = require("../controllers/Administrador.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = express_1.default.Router();
exports.router = router;
router.post('/register', Administrador_controller_1.registrarAdmin);
router.post('/register-users', auth_middleware_1.authenticateToken, Administrador_controller_1.crearUsuario);
router.put('/get-user/:id', auth_middleware_1.authenticateToken, Administrador_controller_1.editarUsuario);
router.get('/users', Administrador_controller_1.listarUsuarios);
