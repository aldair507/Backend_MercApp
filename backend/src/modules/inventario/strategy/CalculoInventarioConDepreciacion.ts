import { ICalculoInventario } from '../interfaces/ICalculoInventario';
import { IProducto } from '../../producto/interfaces/IProducto';

export class CalculoInventarioConDepreciacion implements ICalculoInventario {
    private tasaDepreciacion: number;
    
    constructor(tasaDepreciacion: number = 10) { // Por defecto 10% de depreciación
        this.tasaDepreciacion = tasaDepreciacion;
    }
    
    calcular(productos: IProducto[]): number {
        return productos.reduce((total, producto) => {
            const valorDepreciado = producto.precio * (1 - this.tasaDepreciacion / 100);
            return total + (valorDepreciado * producto.stock);
        }, 0);
    }
}