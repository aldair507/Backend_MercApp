import { MetodoPago } from './MetodoPago';
import { ProductoVenta } from './ProductoVenta';
import { ICalculoTotal } from "../strategy/ICalculoTotal"
import { Types } from 'mongoose';

export class Venta {
    private _id?: Types.ObjectId;
    private fechaVenta: Date;
    private metodoPago: MetodoPago;
    private productos: ProductoVenta[];
    private vendedor: string;
    private calculoTotalStrategy: ICalculoTotal;

    constructor(
        idVenta: Types.ObjectId,
        fechaVenta: Date,
        metodoPago: MetodoPago,
        productos: ProductoVenta[],
        vendedor: string,
        calculoTotalStrategy: ICalculoTotal,
      
    ) {
        this._id = idVenta;
        this.fechaVenta = fechaVenta;
        this.metodoPago = metodoPago;
        this.productos = productos || []; // Inicialización segura
        this.vendedor = vendedor;
        this.calculoTotalStrategy = calculoTotalStrategy;
    }

    public getIdVenta(): string {
        return this._id?.toString() || ""; // Retorna un string vacío si no hay ID
    }

    public getFechaVenta(): Date {
        return this.fechaVenta;
    }

    public getMetodoPago(): MetodoPago {
        return this.metodoPago;
    }

    public getProductos(): ProductoVenta[] {
        return this.productos;
    }

    public getVendedor(): string {
        return this.vendedor;
    }

    public calcularTotal(): number {
        if (!this.calculoTotalStrategy) {
            throw new Error("Estrategia de cálculo no definida");
        }
        if (!this.productos || this.productos.length === 0) {
            return 0; // Retorna 0 si no hay productos
        }
        return this.calculoTotalStrategy.calcular(this.productos);
    }
}