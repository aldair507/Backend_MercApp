import { ICalculoTotal } from './ICalculoTotal';
import { ProductoVenta } from '../models/ProductoVenta';

export class CalculoTotalSinDescuento implements ICalculoTotal {
    calcular(productos: ProductoVenta[]): number {
        return productos.reduce((total, producto) => 
            total + (producto.getPrecioUnitario() * producto.getCantidadVendida()), 0);
    }
}