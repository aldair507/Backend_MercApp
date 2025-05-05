import { Request, Response } from "express";
import { ProductoService } from "../services/ProductoService";

const productoService = new ProductoService();

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const producto = await productoService.crearProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    console.log(error);
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

export const actualizarStockProducto = async (req: Request, res: Response) => {
  const { cantidad } = req.body;
  const { id } = req.params;
  try {
    if (!id || cantidad === undefined) {
      return res
        .status(400)
        .json({ error: "Faltan datos necesarios (id, cantidad)" });
    }

    const productoActualizado = await productoService.actualizarStock(
      id,
      cantidad
    );

    if (!productoActualizado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(productoActualizado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar stock" });
  }
};


export const actualizarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const datosActualizados = req.body;
  
    try {
      if (!id || Object.keys(datosActualizados).length === 0) {
        return res.status(400).json({ error: 'ID o datos para actualizar no proporcionados' });
      }
  
      const productoActualizado = await productoService.actualizarProducto(id, datosActualizados);
  
      if (!productoActualizado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
  
      res.status(200).json(productoActualizado);
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

export const eliminarProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const eliminado = await productoService.eliminarProducto(id);

    if (!eliminado) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const buscarPorId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await productoService.buscarPorId(id);

    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};
