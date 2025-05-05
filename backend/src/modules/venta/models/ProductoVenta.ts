export class ProductoVenta {
  private idProducto: string;
  private idVenta: string;
  private cantidadVendida: number;
  private precioUnitario: number;
  private subTotal: number;
  private descuentos: number;
 

  constructor(
    idProducto: string,
    idVenta: string,
    cantidadVendida: number,
    precioUnitario: number,
    descuentos: number
  ) {
    this.idProducto = idProducto;
    this.idVenta = idVenta; // Generación de ID de venta
    this.cantidadVendida = cantidadVendida;
    this.precioUnitario = precioUnitario;
    this.descuentos = descuentos;
    this.subTotal = this.calcularSubTotal();
  }

  public calcularSubTotal(): number {
    const precioFinal =
      this.precioUnitario - (this.precioUnitario * this.descuentos) / 100;
    return precioFinal * this.cantidadVendida;
  }
  getIdVenta(): string {
    return this.idVenta;
    }

  public getIdProducto(): string {
    return this.idProducto;
  }

  public getCantidadVendida(): number {
    return this.cantidadVendida;
  }

  public getPrecioUnitario(): number {
    return this.precioUnitario;
  }

  public getDescuentos(): number {
    return this.descuentos;
  }

  public getSubTotal(): number {
    return this.subTotal;
  }

  public setIdProducto(id: string): void {
    this.idProducto = id;
  }

  public setCantidadVendida(cantidad: number): void {
    this.cantidadVendida = cantidad;
    this.subTotal = this.calcularSubTotal();
  }

  public setPrecioUnitario(precio: number): void {
    this.precioUnitario = precio;
    this.subTotal = this.calcularSubTotal();
  }

  public setDescuentos(desc: number): void {
    this.descuentos = desc;
    this.subTotal = this.calcularSubTotal();
  }
}
