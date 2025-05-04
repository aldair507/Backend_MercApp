import { IVenta, IResumenVentas } from "../../venta/interfaces/IVenta";

export interface IVentaRepository {
    agregarVenta(venta: IVenta): void;
    obtenerVentas(): Array<IVenta>;
    generarResumenVentas(fechaInicio: Date, fechaFin: Date): IResumenVentas;
}

export class VentaRepository implements IVentaRepository {
    private ventas: Array<IVenta>;

    constructor() {
        this.ventas = [];
    }

    agregarVenta(venta: IVenta): void {
        this.ventas.push(venta);
    }

    obtenerVentas(): Array<IVenta> {
        return this.ventas;
    }

    generarResumenVentas(fechaInicio: Date, fechaFin: Date): IResumenVentas {
        const ventasFiltradas = this.ventas.filter(
            (venta) => venta.fechaVenta >= fechaInicio && venta.fechaVenta <= fechaFin
        );
        const totalVentas = ventasFiltradas.reduce((sum, venta) => sum + venta.total, 0);
        return {
            totalVentas,
            cantidadVentas: ventasFiltradas.length,
            fechaInicio,
            fechaFin
        };
    }
}