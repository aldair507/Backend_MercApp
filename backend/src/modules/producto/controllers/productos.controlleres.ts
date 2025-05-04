import { Request, Response } from "express";
import { ProductoService } from "../services/ProductoService";

const productoService = new ProductoService();

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const producto = await productoService.crearProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto", detalle: error });
  }
};

export const obtenerProductos = async (_: Request, res: Response) => {
  try {
    const productos = await productoService.obtenerProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
};
