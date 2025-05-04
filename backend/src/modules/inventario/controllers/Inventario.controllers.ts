import { Request, Response } from "express";
import  InventarioService  from "../services/InventarioService";

export const listarProductos = async (_: Request, res: Response): Promise<void> => {
  try {
    const productos = await InventarioService.listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener productos",
      detalle: error instanceof Error ? error.message : error,
    });
  }
};

export const filtrarProductos = async (req: Request, res: Response): Promise<void> => {
  try {
    const criterios = req.body as Partial<Record<string, any>>;
    if (!criterios || Object.keys(criterios).length === 0) {
      res.status(400).json({ error: "Debes proporcionar al menos un criterio de filtrado" });
      return;
    }

    const productos = await InventarioService.filtrarProductos(criterios);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({
      error: "Error al filtrar productos",
      detalle: error instanceof Error ? error.message : error,
    });
  }
};

export const calcularTotalInventario = async (_: Request, res: Response): Promise<void> => {
  try {
    const total = await InventarioService.calcularTotalInventario();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({
      error: "Error al calcular total del inventario",
      detalle: error instanceof Error ? error.message : error,
    });
  }
};
