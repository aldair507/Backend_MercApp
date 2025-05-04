import { IProducto } from "../../producto/interfaces/IProducto";

export interface IInventario {
  listarProductos(): Promise<Array<IProducto>>;
  buscarProductos(criterio: string): Promise<Array<IProducto>>;
  guardarProductos(producto: IProducto): Promise<IProducto>;
}
