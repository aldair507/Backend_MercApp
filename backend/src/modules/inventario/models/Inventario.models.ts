import { IInventario } from "../interfaces/IInventario";
import { IProducto } from "../../producto/interfaces/IProducto";
import { ICalculoInventario } from "../interfaces/ICalculoInventario";
import { IObserver } from "../../microempresario/interfaces/IObserver";
import { ISubject } from "../../microempresario/interfaces/ISubjet";


export class Inventario implements IInventario, ISubject {
  productos: IProducto[] = [];
  private calculoInventarioStrategy: ICalculoInventario;
  private observadores: IObserver[] = [];
  private limitesStockBajo: Map<string, number> = new Map(); // Mapa para almacenar los límites por producto

  constructor(calculoInventarioStrategy: ICalculoInventario) {
    this.calculoInventarioStrategy = calculoInventarioStrategy;
  }

  buscarProductos(criterio: string): Promise<Array<IProducto>> {
    const productosFiltrados = this.productos.filter(producto =>
      Object.values(producto).some(valor =>
        valor.toString().toLowerCase().includes(criterio.toLowerCase())
      )
    );
    return Promise.resolve(productosFiltrados);
  }

  async guardarProductos(producto: IProducto): Promise<IProducto> {
    // Verificar si ya existe el producto para actualizar en lugar de añadir
    const indice = this.productos.findIndex(p => p.idProducto === producto.idProducto);
    
    if (indice !== -1) {
      // Actualización de producto existente
      const stockAnterior = this.productos[indice].stock;
      this.productos[indice] = producto;
      
      // Verificar si hay cambio en el stock y si está por debajo del límite
      if (producto.stock !== stockAnterior) {
        this.verificarStockBajo(producto);
      }
    } else {
      // Nuevo producto
      this.productos.push(producto);
      // Establecer un límite por defecto para stock bajo (ejemplo: 10% del stock inicial)
      this.establecerLimiteStockBajo(producto.idProducto, Math.max(1, Math.round(producto.stock * 0.1)));
    }
    
    return Promise.resolve(producto);
  }

  // Establecer un límite personalizado para stock bajo de un producto específico
  establecerLimiteStockBajo(idProducto: string, limite: number): void {
    this.limitesStockBajo.set(idProducto, limite);
  }

  // Verificar si un producto tiene stock bajo y notificar si es necesario
  private verificarStockBajo(producto: IProducto): void {
    const limite = this.limitesStockBajo.get(producto.idProducto) || 5; // Valor por defecto si no se ha establecido
    
    if (producto.stock <= limite) {
      const mensaje = `¡ALERTA DE STOCK BAJO! El producto "${producto.nombre}" (ID: ${producto.idProducto}) tiene solo ${producto.stock} unidades disponibles, por debajo del límite de ${limite}.`;
      this.notificar(mensaje);
    }
  }

  // Método para actualizar el stock de un producto (por ejemplo, después de una venta)
  async actualizarStock(idProducto: string, cantidad: number): Promise<void> {
    const indice = this.productos.findIndex(p => p.idProducto === idProducto);
    
    if (indice !== -1) {
      // Asegurarse de que el stock no sea negativo
      const nuevoStock = Math.max(0, this.productos[indice].stock - cantidad);
      this.productos[indice].stock = nuevoStock;
      
      // Verificar si el nuevo stock está por debajo del límite
      this.verificarStockBajo(this.productos[indice]);
    }
  }

  // Cambiar la estrategia de cálculo en tiempo de ejecución
  setStrategy(strategy: ICalculoInventario): void {
    this.calculoInventarioStrategy = strategy;
  }

  // Listar todos los productos
  listarProductos(): Promise<IProducto[]> {
    return Promise.resolve(this.productos);
  }

  // Calcular el total del valor del inventario usando la estrategia actual
  calcularTotal(): number {
    return this.calculoInventarioStrategy.calcular(this.productos);
  }

  // Implementación de métodos del patrón Observer
  agregarObservador(observador: IObserver): void {
    const indice = this.observadores.indexOf(observador);
    if (indice === -1) {
      this.observadores.push(observador);
    }
  }

  eliminarObservador(observador: IObserver): void {
    const indice = this.observadores.indexOf(observador);
    if (indice !== -1) {
      this.observadores.splice(indice, 1);
    }
  }

  notificar(mensaje: string): void {
    this.observadores.forEach(observador => {
      observador.actualizar(mensaje);
    });
  }
}
