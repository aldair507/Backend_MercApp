import { IProducto } from "../../producto/interfaces/IProducto";
import { ICalculoInventario } from "../interfaces/ICalculoInventario";

export interface IInventario {
    productos: IProducto[];
    
    buscarProductos(criterio: string): Promise<Array<IProducto>>;
    guardarProductos(producto: IProducto): Promise<IProducto>;
    listarProductos(): Promise<IProducto[]>;
    calcularTotal(): number;
    setStrategy(strategy: ICalculoInventario): void;
}