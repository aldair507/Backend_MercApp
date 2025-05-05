import { VentaModel, IVentaDocument, ComprobanteVentaModel } from '../schemas/VentaSchema';
import { Venta } from '../models/Venta.model';
import { ProductoVenta } from '../models/ProductoVenta';
import { ComprobanteVenta } from '../models/ComprobanteVenta.model';
import { CalculoTotalConDescuento } from '../strategy/CalculoTotalConDescuento';


export class VentaRepository {
    private calculoTotal: CalculoTotalConDescuento;

    constructor() {
        this.calculoTotal = new CalculoTotalConDescuento();
    }

    private async guardarVenta(venta: Venta): Promise<IVentaDocument> {
        try {
            const ventaDoc = new VentaModel({
                fechaVenta: venta.getFechaVenta(),
                metodoPago: {
                    nombreMetodoPago: venta.getMetodoPago().getNombreMetodoPago(),
                    fechaEmisionResumen: venta.getMetodoPago().getFechaEmisionResumen()
                },
                productos: venta.getProductos().map(prod => ({
                    idProducto: prod.getIdProducto(),
                    cantidadVendida: prod.getCantidadVendida(),
                    precioUnitario: prod.getPrecioUnitario(),
                    subTotal: prod.getSubTotal(),
                    descuentos: prod.getDescuentos()
                })),
                vendedor: venta.getVendedor()
            });

            return await ventaDoc.save();
        } catch (error) {
            console.error('Error al guardar la venta:', error);
            throw error;
        }
    }

    async generarComprobante(venta: Venta): Promise<ComprobanteVenta> {
        try {
            const ventaDoc = await this.guardarVenta(venta);

            if (!ventaDoc._id) {
                throw new Error('No se pudo obtener el ID de la venta');
            }

            const comprobante = new ComprobanteVenta(
                `COMP-${ventaDoc._id.toString()}`, // Formato específico para el ID del comprobante
                new Date(),
                venta.getProductos(),
                venta.calcularTotal(),
                venta.getVendedor(),
                ventaDoc._id
            );

            const comprobanteDoc = new ComprobanteVentaModel({
                idComprobante: comprobante.getIdComprobante(),
                venta: ventaDoc._id,
                fechaEmision: comprobante.getFechaEmision()
            });

            await comprobanteDoc.save();
            return comprobante;
        } catch (error) {
            console.error('Error al generar comprobante:', error);
            throw error;
        }
    }

    async obtenerResumenVentas(): Promise<IVentaDocument[]> {
        return await VentaModel.find().exec();
    }

    async calcularTotalDia(): Promise<number> {
        const ventas = await this.obtenerResumenVentas();
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        const productosDeHoy = ventas
            .filter(venta => {
                const fechaVenta = new Date(venta.fechaVenta);
                fechaVenta.setHours(0, 0, 0, 0);
                return fechaVenta.getTime() === hoy.getTime();
            })
            .flatMap(venta => venta.productos);

        const productosConvertidos = productosDeHoy.map(this.convertirAProductoVenta);
        return this.calculoTotal.calcular(productosConvertidos);
    }

    private convertirAProductoVenta(producto: any): ProductoVenta {
        return new ProductoVenta(
            producto.idProducto,
            producto.idVenta,
            producto.cantidadVendida,
            producto.precioUnitario,
            producto.descuentos
        );
    }

    async calcularTotalVenta(idVenta: string): Promise<number> {
        const ventaDoc = await VentaModel.findOne({ idVenta }).exec();
        if (!ventaDoc) {
            throw new Error(`Venta con idVenta ${idVenta} no encontrada`);
        }
        const productosConvertidos = ventaDoc.productos.map(this.convertirAProductoVenta);
        return this.calculoTotal.calcular(productosConvertidos);
    }

    async filtrarPorVendedor(vendedor: string): Promise<IVentaDocument[]> {
        return await VentaModel.find({ vendedor }).exec();
    }
}