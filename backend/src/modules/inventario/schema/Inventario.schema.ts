import mongoose, { Schema, Document } from "mongoose";
import { IProducto } from "../../producto/interfaces/IProducto";

// Modelo de Inventario que almacena productos
export interface IInventarioDocument extends Document {
  productos: IProducto[]; // Array de productos
  total: number; // Total de valor del inventario
  calcularTotal(): number;
}

const InventarioSchema = new Schema<IInventarioDocument>({
  productos: [{ type: Schema.Types.ObjectId, ref: "Producto" }], // Referencia a los productos almacenados
  total: { type: Number, default: 0 }, // Total calculado
});

// Método para calcular el total del inventario
InventarioSchema.methods.calcularTotal = function () {
  return this.productos.reduce((total: number, producto: IProducto) => {
    return total + (producto.precio * producto.cantidad);
  }, 0);
};

export const InventarioModel = mongoose.model<IInventarioDocument>("Inventario", InventarioSchema);
