import { Router } from "express";
import {
  crearProducto,
  obtenerProductos,
  actualizarStockProducto,
  eliminarProducto,
  buscarPorId,
  actualizarProducto
  } from "../controllers/productos.controlleres";

const router = Router();

router.post("/register-product", crearProducto);
router.get("/products", obtenerProductos);
router.put("/update-stock/:id", actualizarStockProducto);
router.delete("/delete-product/:id", eliminarProducto);
router.get("/product/:id", buscarPorId);
router.put("/update-product/:id", actualizarProducto);
export { router };  