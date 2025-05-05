
import { IProducto } from "../../producto/interfaces/IProducto";
import { ProductoVenta } from "../models/ProductoVenta";
export interface ICalculoTotal {
    calcular(productos: ProductoVenta[]): number;
  }