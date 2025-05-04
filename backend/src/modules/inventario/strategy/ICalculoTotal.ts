
import { IProducto } from "../../producto/interfaces/IProducto";
export interface ICalculoTotal {
    calcular(productos: IProducto[]): number;
  }