import { IObserver } from "./IObserver";

class Microempresario implements IObserver {
  private nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // Método que recibe la notificación cuando el stock de un producto es bajo
  update(producto: string, cantidad: number): void {
    console.log(`${this.nombre} ha recibido la notificación: El producto "${producto}" tiene solo ${cantidad} unidades disponibles.`);
  }
}

export default Microempresario;
