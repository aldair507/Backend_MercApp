import { IProducto } from "../../producto/interfaces/IProducto";
import { ProductoModel } from '../models/Producto.model';
export interface IProductoRepository {
    agregarProducto(producto: IProducto): Promise<void>;
    actualizarProducto(idProducto: string, nuevosDatos: Partial<IProducto>): Promise<void>;
    obtenerProductos(): Promise<IProducto[]>;
    actualizarStock(idProducto: string, cantidad: number): Promise<void>;
}


export class ProductoRepository implements IProductoRepository {
    async agregarProducto(producto: IProducto): Promise<void> {
        const nuevoProducto = new ProductoModel(producto);
        await nuevoProducto.save();
    }

    async actualizarProducto(idProducto: string, nuevosDatos: Partial<IProducto>): Promise<void> {
        await ProductoModel.findByIdAndUpdate(idProducto, nuevosDatos);
    }

    async obtenerProductos(): Promise<IProducto[]> {
        return await ProductoModel.find();
    }

    async actualizarStock(idProducto: string, cantidad: number): Promise<void> {
        await ProductoModel.findByIdAndUpdate(idProducto, { $inc: { stock: cantidad } });
    }
}