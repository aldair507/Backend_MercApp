"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoRepository = void 0;
const Producto_model_1 = require("../models/Producto.model");
class ProductoRepository {
    async agregarProducto(producto) {
        const nuevoProducto = new Producto_model_1.ProductoModel(producto);
        await nuevoProducto.save();
    }
    async actualizarProducto(idProducto, nuevosDatos) {
        await Producto_model_1.ProductoModel.findByIdAndUpdate(idProducto, nuevosDatos);
    }
    async obtenerProductos() {
        return await Producto_model_1.ProductoModel.find();
    }
    async actualizarStock(idProducto, cantidad) {
        await Producto_model_1.ProductoModel.findByIdAndUpdate(idProducto, { $inc: { stock: cantidad } });
    }
}
exports.ProductoRepository = ProductoRepository;
