import { ICalculoTotal } from './ICalculoTotal';
import { ProductoVenta } from '../models/ProductoVenta';

export class CalculoTotalConDescuento implements ICalculoTotal {
    calcular(productos: ProductoVenta[]): number {
        return productos.reduce((total, producto) => {
            const precioFinal = producto.getPrecioUnitario() - (producto.getPrecioUnitario() * producto.getDescuentos() / 100);
            return total + (precioFinal * producto.getCantidadVendida());
        }, 0);
    }
}