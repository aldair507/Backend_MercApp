

export interface IProducto {
  idProducto: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  precio: number;
  estado: boolean;
  descuento: number;
  fechaCreacionProducto: Date;
  stock: number;

  mostrarInformacion(): string;
  actualizarStock(cantidad: number): Promise<void>;
}