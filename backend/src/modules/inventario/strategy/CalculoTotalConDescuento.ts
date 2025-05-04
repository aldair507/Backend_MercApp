
import { ICalculoTotal } from './ICalculoTotal';
import { IProducto } from '../../producto/interfaces/IProducto';
export class CalculoTotalConDescuento implements ICalculoTotal {
    calcular(productos: IProducto[]): number {
      return productos.reduce((total, producto) => {
        const precioConDescuento = producto.precio - (producto.precio * producto.descuento / 100);
        return total + (precioConDescuento * producto.cantidad);
      }, 0);
    }
  }
  