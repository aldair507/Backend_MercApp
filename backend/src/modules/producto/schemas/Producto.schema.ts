import mongoose, { Schema, Document } from 'mongoose';

export interface IProductoDocument extends Document {
    idProducto: string; // Usaremos idProducto como identificador principal
    nombre: string;
    cantidad: number;
    categoria: string;
    precio: number;
    estado: boolean;
    descuento: number;
    fechaCreacionProducto: Date;
}

const ProductoSchema = new Schema<IProductoDocument>({
    idProducto: { type: String, required: true,unique:true }, // idProducto como identificador único
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String, required: true },
    precio: { type: Number, required: true },
    estado: { type: Boolean, required: true },
    descuento: { type: Number, required: true },
    fechaCreacionProducto: { type: Date, required: true, default: Date.now },
}, {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;   // Elimina _id de la respuesta
        delete ret.__v;   // Elimina __v de la respuesta
      }
    },
    toObject: {
      transform: (_doc, ret) => {
        delete ret._id;   // Elimina _id de la respuesta
        delete ret.__v;   // Elimina __v de la respuesta
      }
    }
  });

export const ProductoModel = mongoose.model<IProductoDocument>('Producto', ProductoSchema, 'productos');