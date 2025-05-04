import { IProducto } from "../../producto/interfaces/IProducto";

class Producto implements IProducto {
  private _idProducto: string;
  private _nombre: string;
  private _cantidad: number;
  private _categoria: string;
  private _precio: number;

  estado: boolean;
  descuento: number;
  fechaCreacionProducto: Date;

  constructor(
    idProducto: string,
    nombre: string,
    cantidad: number,
    categoria: string,
    precio: number,
    estado: boolean,
    descuento: number,
    fechaCreacionProducto: Date
  ) {
    this._idProducto = idProducto;
    this._nombre = nombre;
    this._cantidad = cantidad;
    this._categoria = categoria;
    this._precio = precio;
    this.estado = estado;
    this.descuento = descuento;
    this.fechaCreacionProducto = fechaCreacionProducto;
  }
  get idProducto(): string {
    return this._idProducto;
  }

  set idProducto(value: string) {
    if (value.trim().length === 0)
      throw new Error("El ID del producto no puede estar vacío");
    this._idProducto = value;
  }
  get categoria(): string {
    return this._categoria;
  }
  set categoria(value: string) {
    if (value.trim().length === 0)
      throw new Error("La categoría no puede estar vacía");
    this._categoria = value;
  }
  get nombre(): string {
    return this._nombre;
  }

  set nombre(value: string) {
    if (value.length === 0) throw new Error("El nombre no puede estar vacío");
    this._nombre = value;
  }

  get precio(): number {
    return this._precio;
  }

  set precio(value: number) {
    if (value < 0) throw new Error("El precio no puede ser negativo");
    this._precio = value;
  }

  get cantidad(): number {
    return this._cantidad;
  }

  set cantidad(value: number) {
    if (value < 0) throw new Error("La cantidad no puede ser negativa");
    this._cantidad = value;
  }
  mostrarInformacion(): string {
    const info = `Producto: ${this.nombre}, Precio: $${this.precio}, Stock: ${this.cantidad}`;
    console.log(info);
    return info;
  }

  actualizarStock(cantidad: number): Promise<void> {
    return new Promise((resolve) => {
      this.cantidad += cantidad;
      resolve();
    });
  }
}
