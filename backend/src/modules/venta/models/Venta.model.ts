import mongoose, { Schema, Document } from 'mongoose';
import { IVenta } from '../../venta/interfaces/IVenta';

export interface IVentaDocument extends Document, IVenta {
    productos: Array<any>; // Ajustar según el modelo de IProducto
}

const VentaSchema: Schema = new Schema({
    idVenta: { type: String, required: true, unique: true },
    fechaVenta: { type: Date, default: Date.now },
    productos: [{ type: Schema.Types.ObjectId, ref: 'Producto' }],
    total: { type: Number, required: true }
});

export const VentaModel = mongoose.model<IVentaDocument>('Venta', VentaSchema);