import express, { Router } from 'express';
import { registrarUsuario, loginUsuario, logoutUsuario } from '../controllers/Auth.controller';

const router: Router = express.Router();

router.post('/register', registrarUsuario);
router.post('/login', loginUsuario);
router.post('/logout', logoutUsuario);

export { router };