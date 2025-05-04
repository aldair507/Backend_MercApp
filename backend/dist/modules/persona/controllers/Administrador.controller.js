"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarUsuarios = exports.editarUsuario = exports.crearUsuario = exports.registrarAdmin = exports.blacklistedTokens = void 0;
const persona_schema_1 = require("../schemas/persona.schema");
const Auth_service_1 = require("../../auth/services/Auth.service");
const Auth_service_2 = require("../../auth/services/Auth.service");
exports.blacklistedTokens = new Set();
const registrarAdmin = async (req, res) => {
    const { rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, password } = req.body;
    try {
        if (rol !== 'admin') {
            res.status(400).json({ message: 'El rol debe ser admin' });
            return;
        }
        const nuevoAdmin = await persona_schema_1.UsuarioModel.create({
            rol,
            estadoPersona,
            nombrePersona,
            apellido,
            edad,
            identificacion,
            correo,
            password,
            fechaCreacionPersona: new Date()
        });
        const token = (0, Auth_service_1.generateToken)({ idPersona: nuevoAdmin.idPersona, rol: nuevoAdmin.rol });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: `Administrador ${nombrePersona} creado`,
            admin: {
                idPersona: nuevoAdmin.idPersona,
                rol: nuevoAdmin.rol,
                nombrePersona: nuevoAdmin.nombrePersona,
                correo: nuevoAdmin.correo
            },
            token // Incluimos el token en la respuesta (opcional)
        });
    }
    catch (error) {
        res.status(400).json({ message: 'Error al registrar administrador', error: error instanceof Error ? error.message : error });
    }
};
exports.registrarAdmin = registrarAdmin;
const crearUsuario = async (req, res) => {
    const { rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, password } = req.body;
    try {
        if (rol === 'admin') {
            res.status(403).json({ message: 'No puedes crear otro administrador desde esta ruta' });
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
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: `Usuario ${nombrePersona} creado`,
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
        res.status(400).json({ message: 'Error al crear usuario', error: error instanceof Error ? error.message : error });
    }
};
exports.crearUsuario = crearUsuario;
const editarUsuario = async (req, res) => {
    const { id } = req.params;
    const nuevosDatos = req.body;
    try {
        const usuario = await persona_schema_1.UsuarioModel.findOneAndUpdate({ idPersona: id }, nuevosDatos, { new: true, runValidators: true });
        if (!usuario) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ message: `Usuario ${usuario.nombrePersona} editado`, usuario });
    }
    catch (error) {
        res.status(400).json({ message: 'Error al editar usuario', error: error instanceof Error ? error.message : error });
    }
};
exports.editarUsuario = editarUsuario;
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await persona_schema_1.UsuarioModel.find().select('-password');
        res.status(200).json({ usuarios });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios', error: error instanceof Error ? error.message : error });
    }
};
exports.listarUsuarios = listarUsuarios;
