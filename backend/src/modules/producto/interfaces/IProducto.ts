export interface IProducto {
    idProducto: string;
  nombre: string;
  categoria: string;
  precio: number;
  estado: boolean;
  descuento: number;
  fechaCreacionProducto: Date;
  actualizarStock(): void;
}
