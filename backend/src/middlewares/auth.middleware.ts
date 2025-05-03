import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { blacklistedTokens } from '../modules/persona/controllers/Administrador.controller';
import { verifyToken } from '../modules/auth/services/Auth.service';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta'; // Mejor usar variables de entorno
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: 'Token no proporcionado en la cookie' });
        return;
    }

    if (blacklistedTokens.has(token)) {
        res.status(401).json({ message: 'Token invalidado, por favor vuelva a iniciar sesión' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ 
            message: 'Token inválido', 
            error: err instanceof Error ? err.message : 'Error desconocido al verificar el token'
        });
    }
};