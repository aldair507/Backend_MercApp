"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Auth_controller_1 = require("../controllers/Auth.controller");
const router = express_1.default.Router();
exports.router = router;
router.post('/register', Auth_controller_1.registrarUsuario);
router.post('/login', Auth_controller_1.loginUsuario);
router.post('/logout', Auth_controller_1.logoutUsuario);
