import { IUsuario, DatosPersonales } from "../../../core/interfaces/IUsuario";
import { IInventario } from "../../inventario/interfaces/IInventario";
import { IProducto } from "../../producto/interfaces/IProducto";
import { IVenta, IResumenVentas } from "../../venta/interfaces/IVenta";
import { ProductoData } from "../../producto/factory/ProductoFactory";

export interface IMicroempresario extends IUsuario, IInventario {
  nit: string;
  productos: Array<IProducto>;
  ventasRealizadas: Array<IVenta>;

  crearProducto(productoData: ProductoData): Promise<void>; // Tipo específico ProductoData
  editarProducto(idProducto: string, nuevosDatos: Partial<ProductoData>): Promise<void>; // Tipo específico ProductoData
  generarProductoVenta(idVenta: string, productosIds: string[], metodoPago?: string): Promise<IVenta>; // Añadido parámetro metodoPago opcional
  verResumenVentas(fechaInicio: Date, fechaFin: Date): Promise<IResumenVentas>; // Cambiado a Promise
}