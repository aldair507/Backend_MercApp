class Microempresario extends Usuario {
    nit: string;
    nombreNegocio: string;
  
    constructor(
      nombre: string,
      apellido: string,
      email: string,
      idUsuario: string,
      rol: string,
      nit: string,
      nombreNegocio: string
    ) {
      super(nombre, apellido, email, idUsuario, rol);
      this.nit = nit;
      this.nombreNegocio = nombreNegocio;
    }
    
  // Método para agregar un producto al inventario
  agregarProducto(producto: IProducto): void {
    // Lógica para agregar producto al inventario
    console.log(`Producto agregado: ${producto.nombre}`);
  }

  // Método para editar un producto en el inventario
  editarProducto(productoId: string, nuevoProducto: IProducto): void {
    // Lógica para editar producto en inventario
    console.log(`Producto con ID ${productoId} actualizado`);
  }
}