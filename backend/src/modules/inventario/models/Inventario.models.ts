import { IInventario } from "../interfaces/IInventario";
import { IProducto } from "../../producto/interfaces/IProducto";
import { ICalculoTotal } from "../strategy/ICalculoTotal";

class Inventario implements IInventario {
  productos: IProducto[] = [];
  private calculoTotalStrategy: ICalculoTotal;

  constructor(calculoTotalStrategy: ICalculoTotal) {
    this.calculoTotalStrategy = calculoTotalStrategy;
  }
    
 

  // Cambiar la estrategia de cálculo en tiempo de ejecución
  setStrategy(strategy: ICalculoTotal): void {
    this.calculoTotalStrategy = strategy;
  }

  // Listar todos los productos
  listarProductos(): Promise<IProducto[]> {
    return Promise.resolve(this.productos);
  }

  

  // Calcular el total del valor del inventario usando la estrategia actual
  calcularTotal(): number {
    return this.calculoTotalStrategy.calcular(this.productos);
  }
}
