import { IProducto } from "../../producto/interfaces/IProducto";

export interface IVenta {
    idVenta: string;
    fechaVenta: Date;
    productos: Array<IProducto>;
    total: number;
    metodoPago?: string | null; 
}

export interface IResumenVentas {
    totalVentas: number;
    cantidadVentas: number;
    fechaInicio: Date;
    fechaFin: Date;
}