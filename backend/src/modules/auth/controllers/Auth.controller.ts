import { Request, Response } from 'express';
import { UsuarioModel } from '../../persona/schemas/persona.schema';
import { comparePassword, generateToken } from '../../auth/services/Auth.service';
import { crearUsuarioInterno } from '../services/Auth.service';
import { blacklistedTokens } from '../../persona/controllers/Administrador.controller';



export const registrarUsuario = async (req: Request, res: Response): Promise<void> => {
    const { rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, password } = req.body;
    try {
        if (rol === 'admin') {
            res.status(403).json({ message: 'No puedes registrarte como administrador desde esta ruta' });
            return;
        }
        

        const { usuario, token } = await crearUsuarioInterno({
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
                correo: usuario.correo ,
                password:password.password
            },
            token
        });
        console.log(usuario.password)
    } catch (error) {
        res.status(400).json({ message: 'Error al registrar usuario', error: error instanceof Error ? error.message : error });
    }
};

export const loginUsuario = async (req: Request, res: Response): Promise<void> => {
    const { correo, password } = req.body;
    try {
        const usuario = await UsuarioModel.findOne({ correo }).select('+password');
        if (!usuario || !(await comparePassword(password, usuario.password))) {
            res.status(401).json({ message: 'Credenciales inválidas' });
            return;
        }
        const token = generateToken({ idPersona: usuario.idPersona, rol: usuario.rol });

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
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error: error instanceof Error ? error.message : error });
    }
};

export const logoutUsuario = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.token;
    if (!token) {
        res.status(400).json({ message: 'Token no proporcionado en la cookie' });
        return;
    }

    blacklistedTokens.add(token);
    res.clearCookie('token', { path: '/' });
    res.status(200).json({ message: 'Logout exitoso.' });
};