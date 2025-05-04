

export interface IProducto {
  idProducto: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  precio: number;
  estado: boolean;
  descuento: number;
  fechaCreacionProducto: Date;

  mostrarInformacion(): string;
  actualizarStock(cantidad: number): Promise<void>;
}