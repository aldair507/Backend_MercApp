
import { Types } from "mongoose";
import { ProductoVenta } from "./ProductoVenta";

export class ComprobanteVenta {
    private _id?: Types.ObjectId;
    private idComprobante: string;
    private fechaEmision: Date;
    private productos: ProductoVenta[];
    private total: number;
    private vendedor: string;

    constructor(
        idComprobante: string,
        fechaEmision: Date,
        productos: ProductoVenta[],
        total: number,
        vendedor: string,
        mongoId?: Types.ObjectId
    ) {
        this.idComprobante = idComprobante;
        this._id = mongoId;
        this.fechaEmision = fechaEmision;
        this.productos = productos;
        this.total = total;
        this.vendedor = vendedor;
    }

    public getMongoId(): Types.ObjectId | undefined {
        return this._id;
    }

    public getIdComprobante(): string {
        return this.idComprobante;
    }

    public getFechaEmision(): Date {
        return this.fechaEmision;
    }

    public getProductos(): ProductoVenta[] {
        return this.productos;
    }

    public getTotal(): number {
        return this.total;
    }

    public getVendedor(): string {
        return this.vendedor;
    }

    public mostrarComprobante(): object {
        return {
            idComprobante: this.idComprobante,
            fechaEmision: this.fechaEmision,
            productos: this.productos.map(p => ({
                idProducto: p.getIdProducto(),
                cantidad: p.getCantidadVendida(),
                precioUnitario: p.getPrecioUnitario(),
                subtotal: p.getSubTotal()
            })),
            total: this.total,
            vendedor: this.vendedor
        };
    }
}