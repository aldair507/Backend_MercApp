import { Router } from "express";

const router = Router();

import {
  crearProducto,
  obtenerProductos,
} from "../controllers/productos.controlleres";

router.post("/register-product", crearProducto);
router.get("/products", obtenerProductos);

export { router };
