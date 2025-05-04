"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoFactory = exports.Producto = void 0;
const uuid_1 = require("uuid");
class Producto {
    constructor(data) {
        this.idProducto = (0, uuid_1.v4)(); // Genera un ID único para el producto
        this.nombre = data.nombre;
        this.categoria = data.categoria;
        this.precio = data.precio;
        this.estado = data.estado ?? true;
        this.descuento = data.descuento ?? 0;
        this.fechaCreacionProducto = new Date();
    }
    actualizarStock() {
        console.log(`Stock actualizado para ${this.nombre}`);
    }
}
exports.Producto = Producto;
class ProductoFactory {
    static crearProducto(data) {
        return new Producto(data);
    }
}
exports.ProductoFactory = ProductoFactory;
