import { ProductoModel,IProductoDocument } from "../schemas/Producto.schema";


export class ProductoService {
  async crearProducto(data: Partial<IProductoDocument>): Promise<IProductoDocument> {
    const producto = new ProductoModel(data);
    return await producto.save();
  }

  async obtenerProductos(): Promise<IProductoDocument[]> {
    return await ProductoModel.find();
  }

  async buscarPorId(id: string): Promise<IProductoDocument | null> {
    return await ProductoModel.findOne({ idProducto: id });
  }

  async actualizarStock(id: string, cantidad: number): Promise<IProductoDocument | null> {
    const producto = await ProductoModel.findOne({ idProducto: id });
    if (!producto) return null;
    producto.cantidad += cantidad;
    return await producto.save();
  }

  async eliminarProducto(id: string): Promise<boolean> {
    const resultado = await ProductoModel.deleteOne({ idProducto: id });
    return resultado.deletedCount === 1;
  }
}
