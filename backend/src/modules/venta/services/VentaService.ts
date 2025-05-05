import { ResumenVenta } from '../models/ResumenVenta';
import { ProductoVenta } from '../models/ProductoVenta';
import { ComprobanteVenta } from '../models/ComprobanteVenta.model';
import { VentaRepository } from '../repository/VentaRepository';
import { Types } from 'mongoose';
import { IVentaDocument } from '../schemas/VentaSchema';
import { MetodoPago } from '../models/MetodoPago';
import { Venta } from '../models/Venta.model';
import { CalculoTotalSinDescuento } from '../strategy/CalculoTotalSinDescuento';

export class VentaService {
    private ventaRepository: VentaRepository;
    
    private calculoTotalStrategy: any;
    
    constructor() {
        this.ventaRepository = new VentaRepository();
    }
    
    obtenerCalculoTotalStrategy(): any {
      return this.calculoTotalStrategy;
  }
    public async agregarVenta(venta: Venta): Promise<void> {
        await this.ventaRepository.guardarVenta(venta);
    }
    
    public async obtenerResumenVentas(): Promise<ResumenVenta> {
        const ventasDocs = await this.ventaRepository.obtenerResumenVentas();
        const ventas = ventasDocs.map(ventaDoc => this.mapToModel(ventaDoc));
        const fechaActual = new Date();
        return new ResumenVenta(ventas, fechaActual);
    }
    
    public async calcularTotalDia(): Promise<number> {
        return await this.ventaRepository.calcularTotalDia();
    }
    
    public async filtrarVentasPorVendedor(vendedor: string): Promise<Venta[]> {
        const ventasDocs = await this.ventaRepository.filtrarPorVendedor(vendedor);
        return ventasDocs.map(ventaDoc => this.mapToModel(ventaDoc));
    }
    
    public async generarComprobante(venta: Venta): Promise<ComprobanteVenta> {
        return await this.ventaRepository.generarComprobante(venta);
    }
    setCalculoTotalStrategy(strategy: any): void {
      this.calculoTotalStrategy = strategy;
  }
    
    private mapToModel(ventaDoc: IVentaDocument): Venta {
        const metodoPago = new MetodoPago(
            ventaDoc.metodoPago.nombreMetodoPago,
            ventaDoc.metodoPago.fechaEmisionResumen
        );
        
        const productos = ventaDoc.productos.map(prod => new ProductoVenta(
            prod.idProducto,
            prod.idVenta,
            prod.cantidadVendida,
            prod.precioUnitario,
            prod.descuentos
        ));
        
        // Usando una estrategia por defecto si no se especifica en el documento
        // Aquí seleccionamos CalculoTotalSinDescuento por defecto
        const calculoStrategy = new CalculoTotalSinDescuento();
        return new Venta(
            new Types.ObjectId(ventaDoc.idVenta),
            ventaDoc.fechaVenta,
           
            metodoPago,
            productos,
            ventaDoc.vendedor,
            calculoStrategy  // Añadido el parámetro faltante
        );
    }
}