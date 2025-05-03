import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../../persona/schemas/persona.schema';
import { CounterModel } from '../../persona/schemas/counter.schema'; 

const SECRET_KEY = process.env.JWT_SECRET || 'TOKEN_SECRET'; 

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (payload: { idPersona: string; rol: string }): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Token inválido');
    }
};
export const crearUsuarioInterno = async (data: {
    rol: string;
    estadoPersona: boolean;
    nombrePersona: string;
    apellido: string;
    edad: number;
    identificacion: number;
    correo: string;
    password: string;
}) => {
    const { rol } = data;
    const rolesValidos = ['admin', 'Vendedor', 'Microempresario','usuario']; // Ajusta los roles según tus necesidades
    if (!rolesValidos.includes(rol)) {
        throw new Error('Rol no válido');
    }

    try {
        // Generar un idPersona único usando CounterModel
        const counter = await CounterModel.findByIdAndUpdate(
            { _id: 'usuarioId' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        const idPersona = `USER${counter.sequence_value.toString().padStart(6, '0')}`; // Ejemplo: USER000001

        const nuevoUsuario = await UsuarioModel.create({
            idPersona,
            ...data,
            fechaCreacionPersona: new Date()
        });
        const token = generateToken({ idPersona: nuevoUsuario.idPersona, rol: nuevoUsuario.rol });
        return { usuario: nuevoUsuario, token };
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : 'Error al crear usuario interno');
    }
};