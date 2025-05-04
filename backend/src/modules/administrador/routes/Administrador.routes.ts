import express from 'express';
import { registrarAdmin, crearUsuario, editarUsuario, listarUsuarios } from '../controllers/Administrador.controller';
import { authenticateToken } from '../../../middlewares/auth.middleware';

const router = express.Router();


router.post('/register', registrarAdmin);
router.post('/register-users', authenticateToken, crearUsuario);
router.put('/get-user/:id', authenticateToken, editarUsuario);
router.get('/users', listarUsuarios);
export { router };  