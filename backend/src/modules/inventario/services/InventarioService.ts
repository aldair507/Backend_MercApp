import { ProductoModel } from "../../producto/schemas/Producto.schema";
import { IProducto } from "../../producto/interfaces/IProducto";
import { IInventario } from "../interfaces/IInventario";

class InventarioService implements IInventario {
  productos: IProducto[] = [];

  // Listar todos los productos
  async listarProductos(): Promise<IProducto[]> {
    return await ProductoModel.find();
  }

  // Buscar un producto por id
  async buscarProductos(criterio: string): Promise<IProducto[]> {
    return await ProductoModel.find({ idProducto: criterio });
  }

  // Guardar un producto en la base de datos
  async guardarProductos(producto: IProducto): Promise<IProducto> {
    const nuevoProducto = new ProductoModel(producto);
    const savedProducto = await nuevoProducto.save();
    return {
      idProducto: savedProducto.idProducto,
      nombre: savedProducto.nombre,
      precio: savedProducto.precio,
      cantidad: savedProducto.cantidad,
    } as IProducto;
  }

  async filtrarProductos(criterios: Partial<IProducto>): Promise<IProducto[]> {
    try {
      // Utilizamos 'lean' para obtener un objeto plano de JavaScript en lugar de un documento Mongoose
      const productos = await ProductoModel.find(criterios).lean().exec();

      return productos.map(producto => ({
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
      } as IProducto)); // Mapeamos los productos para que coincidan con la interfaz IProducto
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al filtrar productos: ${error.message}`);
      }
      throw new Error('Error desconocido al filtrar productos');
    }
  }

  // Calcular el total del inventario
  async calcularTotalInventario(): Promise<number> {
    const productos = await this.listarProductos();
    return productos.reduce((total, p) => total + p.precio * p.cantidad, 0);
  }

// Calcular el total del inventario desde la base de datos
async calcularTotal(): Promise<number> {
    try {
      // Obtenemos todos los productos de la base de datos
      const productos = await this.listarProductos();
      
      // Calculamos el total sumando el precio * cantidad de cada producto
      return productos.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al calcular el total del inventario desde la base de datos: ${error.message}`);
      }
      throw new Error('Error desconocido al calcular el total del inventario desde la base de datos');
    }
  }
  
}

export default new InventarioService();
