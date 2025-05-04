"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioInterno = exports.verifyToken = exports.generateToken = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const persona_schema_1 = require("../../persona/schemas/persona.schema");
const counter_schema_1 = require("../../persona/schemas/counter.schema");
const SECRET_KEY = process.env.JWT_SECRET || 'TOKEN_SECRET';
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcryptjs_1.default.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcryptjs_1.default.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Token inválido');
    }
};
exports.verifyToken = verifyToken;
const crearUsuarioInterno = async (data) => {
    const { rol } = data;
    const rolesValidos = ['admin', 'Vendedor', 'Microempresario', 'usuario']; // Ajusta los roles según tus necesidades
    if (!rolesValidos.includes(rol)) {
        throw new Error('Rol no válido');
    }
    try {
        // Generar un idPersona único usando CounterModel
        const counter = await counter_schema_1.CounterModel.findByIdAndUpdate({ _id: 'usuarioId' }, { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
        const idPersona = `USER${counter.sequence_value.toString().padStart(6, '0')}`; // Ejemplo: USER000001
        const nuevoUsuario = await persona_schema_1.UsuarioModel.create({
            idPersona,
            ...data,
            fechaCreacionPersona: new Date()
        });
        const token = (0, exports.generateToken)({ idPersona: nuevoUsuario.idPersona, rol: nuevoUsuario.rol });
        return { usuario: nuevoUsuario, token };
    }
    catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error al crear usuario interno');
    }
};
exports.crearUsuarioInterno = crearUsuarioInterno;
