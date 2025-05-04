
import { ICalculoTotal } from './ICalculoTotal';
import { IProducto } from '../../producto/interfaces/IProducto';

export class CalculoTotalSinDescuento implements ICalculoTotal {
    calcular(productos: IProducto[]): number {
      return productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
    }
  }
  