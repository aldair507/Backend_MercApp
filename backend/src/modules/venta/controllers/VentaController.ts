import { Request, Response } from "express";
import { Venta } from "../models/Venta.model";
import { ProductoVenta } from "../models/ProductoVenta";
import { MetodoPago } from "../models/MetodoPago";
import { VentaService } from "../services/VentaService";
import { ProductoModel } from "../../producto/schemas/Producto.schema";
import { MetodoPagoEnum } from "../enums/MetodoPagoEnum";
import { CalculoTotalConDescuento } from "../../venta/strategy/CalculoTotalConDescuento";
import { CalculoTotalSinDescuento } from "../../venta/strategy/CalculoTotalSinDescuento";
import { VentaModel } from "../schemas/VentaSchema";
import { Types } from "mongoose";

// Instanciamos el servicio de ventas
const ventaService = new VentaService();

export const crearVenta = async (req: Request, res: Response): Promise<void> => {
    try {
        const {  fechaVenta, metodoPago, productos, vendedor, aplicarDescuentos } = req.body;



        // Validación básica
        if ( !fechaVenta || !metodoPago || !productos || !vendedor) {
            res.status(400).json({ error: 'Faltan datos requeridos' });
            return;
        }

        // Validar que los productos existan
        const productoIds = productos.map((p: any) => p.idProducto);
        const productosExistentes = await ProductoModel.find({ idProducto: { $in: productoIds } }).exec();
        const existingIds = productosExistentes.map(p => p.idProducto);

        const invalidProducts: string[] = productoIds.filter((productoId: string) => !existingIds.includes(productoId));
        if (invalidProducts.length > 0) {
            res.status(400).json({ error: 'Los siguientes productos no existen: ' + invalidProducts.join(', ') });
            return;
        }

        // Configurar estrategia de cálculo según si se aplican descuentos o no
        if (aplicarDescuentos === false) {
            ventaService.setCalculoTotalStrategy(new CalculoTotalSinDescuento());
        } else {
            ventaService.setCalculoTotalStrategy(new CalculoTotalConDescuento());
        }

        // Procesamiento del método de pago
        const nombreMetodoClave = metodoPago.nombreMetodoPago;
        let metodoPagoEnum: MetodoPagoEnum;

        try {
            metodoPagoEnum = MetodoPagoEnum[nombreMetodoClave as keyof typeof MetodoPagoEnum];
        } catch (error) {
            res.status(400).json({ error: 'Método de pago no válido' });
            return;
        }

        const metodoPagoObj = new MetodoPago(
            metodoPagoEnum,
            new Date(metodoPago.fechaEmisionResumen || fechaVenta)
        );

        const ventaId = new Types.ObjectId();
          
        // Crear array de productos vendidos
        const productosArray: ProductoVenta[] = productos.map((p: any) => new ProductoVenta(
            p.idProducto,
            ventaId.toString(),  
            p.cantidadVendida,
            p.precioUnitario,
            p.descuentos || 0
        ));

        // Crear objeto de venta
        const venta = new Venta(
            new Types.ObjectId(), // Agregar mongoId como primer parámetro
            new Date(fechaVenta), 
            metodoPagoObj, 
            productosArray, 
            vendedor,
            ventaService.obtenerCalculoTotalStrategy() // Pasar la estrategia de cálculo
        );
        
        // Guardar la venta y generar comprobante
        await ventaService.agregarVenta(venta);
        const comprobante = await ventaService.generarComprobante(venta);
        
        res.status(201).json({ 
            mensaje: 'Venta creada exitosamente', 
            comprobante: comprobante.mostrarComprobante() 
        });
    } catch (error) {
        console.error('Error al crear venta:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerTotalDia = async (req: Request, res: Response): Promise<void> => {
    try {
        const total = await ventaService.calcularTotalDia();
        res.status(200).json({ 
            totalDia: total,
            fecha: new Date().toISOString().split('T')[0],
            estrategiaCalculo: ventaService.obtenerCalculoTotalStrategy() instanceof CalculoTotalConDescuento 
                ? 'Con descuento' 
                : 'Sin descuento'
        });
    } catch (error) {
        console.error('Error al obtener total del día:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const filtrarPorVendedor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { vendedor } = req.query;
        
        if (!vendedor || typeof vendedor !== 'string') {
            res.status(400).json({ error: 'Vendedor es requerido' });
            return;
        }
        
        const ventas = await ventaService.filtrarVentasPorVendedor(vendedor);
        
        // Formatear los datos para la respuesta
        const ventasFormateadas = ventas.map(venta => ({
            idVenta: venta.getIdVenta(),
            fechaVenta: venta.getFechaVenta(),
            metodoPago: venta.getMetodoPago().getNombreMetodoPago(),
            vendedor: venta.getVendedor(),
            cantidadProductos: venta.getProductos().length,
            total: ventaService.obtenerCalculoTotalStrategy().calcular(venta.getProductos())
        }));
        
        res.status(200).json({ 
            vendedor,
            cantidad: ventasFormateadas.length,
            ventas: ventasFormateadas 
        });
    } catch (error) {
        console.error('Error al filtrar por vendedor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const cambiarEstrategiaCalculo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { usarDescuentos } = req.body;
        
        if (usarDescuentos === undefined) {
            res.status(400).json({ error: 'Se requiere especificar si usar descuentos o no' });
            return;
        }
        
        if (usarDescuentos) {
            ventaService.setCalculoTotalStrategy(new CalculoTotalConDescuento());
            res.status(200).json({ mensaje: 'Estrategia cambiada a cálculo con descuentos' });
        } else {
            ventaService.setCalculoTotalStrategy(new CalculoTotalSinDescuento());
            res.status(200).json({ mensaje: 'Estrategia cambiada a cálculo sin descuentos' });
        }
    } catch (error) {
        console.error('Error al cambiar estrategia de cálculo:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};