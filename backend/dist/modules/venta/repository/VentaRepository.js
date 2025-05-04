"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaRepository = void 0;
class VentaRepository {
    constructor() {
        this.ventas = [];
    }
    agregarVenta(venta) {
        this.ventas.push(venta);
    }
    obtenerVentas() {
        return this.ventas;
    }
    generarResumenVentas(fechaInicio, fechaFin) {
        const ventasFiltradas = this.ventas.filter((venta) => venta.fechaVenta >= fechaInicio && venta.fechaVenta <= fechaFin);
        const totalVentas = ventasFiltradas.reduce((sum, venta) => sum + venta.total, 0);
        return {
            totalVentas,
            cantidadVentas: ventasFiltradas.length,
            fechaInicio,
            fechaFin
        };
    }
}
exports.VentaRepository = VentaRepository;
