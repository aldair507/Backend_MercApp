import mongoose, { Schema, Document } from "mongoose";
import { MetodoPagoEnum } from "../enums/MetodoPagoEnum";

// Esquema para MetodoPago
export interface IMetodoPagoDocument extends Document {
  nombreMetodoPago: MetodoPagoEnum;
  fechaEmisionResumen: Date;
}

const MetodoPagoSchema = new Schema<IMetodoPagoDocument>({
  nombreMetodoPago: { type: String, required: true },
  fechaEmisionResumen: { type: Date, required: true, default: Date.now },
});

// Esquema para ProductoVenta
export interface IProductoVentaDocument extends Document {
  idProducto: string;
  idVenta: string;
  cantidadVendida: number;
  precioUnitario: number;
  subTotal: number;
  descuentos: number;
}

const ProductoVentaSchema = new Schema<IProductoVentaDocument>({
  idProducto: { type: String, required: true },
  idVenta: { type: String, required: true },
  cantidadVendida: { type: Number, required: true },
  precioUnitario: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  descuentos: { type: Number, required: true },
});

// Esquema para Venta
export interface IVentaDocument extends Document {
  idVenta: string;
  fechaVenta: Date;
  metodoPago: IMetodoPagoDocument;
  productos: IProductoVentaDocument[];
  vendedor: string;
  calculoTotalStrategy?: string;
}

const VentaSchema = new Schema<IVentaDocument>({
  idVenta: { type: String, required: true, unique: true },
  fechaVenta: { type: Date, required: true, default: Date.now },
  metodoPago: { type: MetodoPagoSchema, required: true },
  productos: { type: [ProductoVentaSchema], required: true, default: [] },
  vendedor: { type: String, required: true },
});

// Esquema para ComprobanteVenta
export interface IComprobanteVentaDocument extends Document {
  idComprobante: string;
  venta: IVentaDocument;
  fechaEmision: Date;
}

const ComprobanteVentaSchema = new Schema<IComprobanteVentaDocument>({
  idComprobante: { type: String, required: true, unique: true },
  venta: { type: VentaSchema, required: true },
  fechaEmision: { type: Date, required: true, default: Date.now },
});

export const VentaModel = mongoose.model<IVentaDocument>("Venta", VentaSchema);
export const ComprobanteVentaModel = mongoose.model<IComprobanteVentaDocument>(
  "ComprobanteVenta",
  ComprobanteVentaSchema
);
    