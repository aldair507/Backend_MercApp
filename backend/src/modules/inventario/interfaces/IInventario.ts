import { IProducto } from '../../producto/interfaces/IProducto';



export interface IInventario {
    listarProductos(): Promise<Array<IProducto>>;
    buscarProductos(criterio: string): Promise<Array<IProducto>>;
    actualizarStock(idProducto: string, cantidad: number): Promise<void>;
}