import { Venta } from './Venta.model';
import { ProductoVenta } from './ProductoVenta';

export class ResumenVenta {
    private ventasDia: Venta[];
    private fechaEmisionResumen: Date;

    constructor(ventasDia: Venta[], fechaEmisionResumen: Date) {
        this.ventasDia = ventasDia;
        this.fechaEmisionResumen = fechaEmisionResumen;
    }

    public calcularTotalDia(): number {
        let total: number = 0;
        for (const venta of this.ventasDia) {
            let productoVentaTotal: number = 0;
            const productos: ProductoVenta[] = venta['productos'] || [];
            for (const productoVenta of productos) {
                productoVentaTotal += productoVenta.getSubTotal();
            }
            total += productoVentaTotal;
        }
        return total;
    }

    public filtrarPorVendedor(vendedor: string): Venta[] {
        return this.ventasDia.filter(venta => venta['vendedor'] === vendedor);
    }

    public getVentasDia(): Venta[] {
        return this.ventasDia;
    }

    public setVentasDia(ventas: Venta[]): void {
        this.ventasDia = ventas;
    }

    public getFechaEmisionResumen(): Date {
        return this.fechaEmisionResumen;
    }

    public setFechaEmisionResumen(fecha: Date): void {
        this.fechaEmisionResumen = fecha;
    }
}