import { IProducto } from "../../producto/interfaces/IProducto";

export interface ICalculoInventario {
    calcular(productos: IProducto[]): number;
}