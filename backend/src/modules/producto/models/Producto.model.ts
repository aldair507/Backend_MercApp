import mongoose, { Schema, Document } from 'mongoose';
import { IProducto } from '../../producto/interfaces/IProducto';

export interface IProductoDocument extends Document, IProducto {}

const ProductoSchema: Schema = new Schema({

    nombre: { type: String, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    estado: { type: Boolean, default: true },
    descuento: { type: Number, default: 0 },
    fechaCreacionProducto: { type: Date, default: Date.now }
});

export const ProductoModel = mongoose.model<IProductoDocument>('Producto', ProductoSchema);