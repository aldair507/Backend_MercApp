import { ICalculoInventario } from '../interfaces/ICalculoInventario';
import { IProducto } from '../../producto/interfaces/IProducto';

export class CalculoInventarioNormal implements ICalculoInventario {
    calcular(productos: IProducto[]): number {
        return productos.reduce((total, producto) => 
            total + (producto.precio * producto.stock), 0);
    }
}