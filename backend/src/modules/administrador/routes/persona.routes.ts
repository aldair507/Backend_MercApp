import express from 'express';
import { registrarAdmin, crearUsuario, editarUsuario, listarUsuarios } from '../controllers/Administrador.controller';
import { authenticateToken } from '../../../middlewares/auth.middleware';

const router = express.Router();


router.post('/admin', registrarAdmin);
router.post('/usuarios', authenticateToken, crearUsuario);
router.put('/usuarios/:id', authenticateToken, editarUsuario);
router.get('/usuarios', authenticateToken, listarUsuarios);
export { router };  