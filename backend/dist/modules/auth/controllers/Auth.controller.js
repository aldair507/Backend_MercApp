"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUsuario = exports.loginUsuario = exports.registrarUsuario = void 0;
const persona_schema_1 = require("../../persona/schemas/persona.schema");
const Auth_service_1 = require("../../auth/services/Auth.service");
const Auth_service_2 = require("../services/Auth.service");
const Administrador_controller_1 = require("../../persona/controllers/Administrador.controller");
const registrarUsuario = async (req, res) => {
    const { rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, password } = req.body;
    try {
        if (rol === 'admin') {
            res.status(403).json({ message: 'No puedes registrarte como administrador desde esta ruta' });
            return;
        }
        const { usuario, token } = await (0, Auth_service_2.crearUsuarioInterno)({
            rol,
            estadoPersona,
            nombrePersona,
            apellido,
            edad,
            identificacion,
            correo,
            password
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });
        res.status(201).json({
            message: `Usuario ${nombrePersona} registrado`,
            usuario: {
                idPersona: usuario.idPersona,
                rol: usuario.rol,
                nombrePersona: usuario.nombrePersona,
                correo: usuario.correo,
                password: password.password
            },
            token
        });
        console.log(usuario.password);
    }
    catch (error) {
        res.status(400).json({ message: 'Error al registrar usuario', error: error instanceof Error ? error.message : error });
    }
};
exports.registrarUsuario = registrarUsuario;
const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;
    try {
        const usuario = await persona_schema_1.UsuarioModel.findOne({ correo }).select('+password');
        if (!usuario || !(await (0, Auth_service_1.comparePassword)(password, usuario.password))) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        const token = (0, Auth_service_1.generateToken)({ idPersona: usuario.idPersona, rol: usuario.rol });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
        });
        res.status(200).json({
            message: 'Login exitoso',
            usuario: {
                idPersona: usuario.idPersona,
                rol: usuario.rol,
                nombrePersona: usuario.nombrePersona,
                correo: usuario.correo
            },
            token
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error instanceof Error ? error.message : error });
    }
};
exports.loginUsuario = loginUsuario;
const logoutUsuario = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(400).json({ message: 'Token no proporcionado en la cookie' });
        return;
    }
    Administrador_controller_1.blacklistedTokens.add(token);
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logout exitoso.' });
};
exports.logoutUsuario = logoutUsuario;
