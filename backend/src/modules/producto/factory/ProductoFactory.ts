import { IProducto } from "../../producto/interfaces/IProducto";
import { v4 as uuidv4 } from "uuid";

export interface ProductoData {
    idProducto?: string;
  nombre: string;
  categoria: string;
  precio: number;
  estado?: boolean;
  descuento?: number;
}

export class Producto implements IProducto {
  idProducto: string;
  nombre: string;
  categoria: string;
  precio: number;
  estado: boolean;
  descuento: number;
  fechaCreacionProducto: Date;

  constructor(data: ProductoData) {
    this.idProducto = uuidv4(); // Genera un ID único para el producto
    this.nombre = data.nombre;
    this.categoria = data.categoria;
    this.precio = data.precio;
    this.estado = data.estado ?? true;
    this.descuento = data.descuento ?? 0;
    this.fechaCreacionProducto = new Date();
  }

  actualizarStock(): void {
    console.log(`Stock actualizado para ${this.nombre}`);
  }
}

export class ProductoFactory {
  static crearProducto(data: ProductoData): IProducto {
    return new Producto(data);
  }
}
