import { MetodoPagoEnum } from "../enums/MetodoPagoEnum";

export class MetodoPago {
  private nombreMetodoPago: MetodoPagoEnum;
  private fechaEmisionResumen: Date;

  constructor(nombreMetodoPago: MetodoPagoEnum, fechaEmisionResumen: Date) {
    this.nombreMetodoPago = nombreMetodoPago;
    this.fechaEmisionResumen = fechaEmisionResumen;
  }

  getNombreMetodoPago(): MetodoPagoEnum {
    return this.nombreMetodoPago;
  }
  setNombreMetodoPago(nombreMetodoPago: MetodoPagoEnum): void {
    this.nombreMetodoPago = nombreMetodoPago;
  }
  setFechaEmisionResumen(fechaEmisionResumen: Date): void {
    this.fechaEmisionResumen = fechaEmisionResumen;
  }

  getFechaEmisionResumen(): Date {
    return this.fechaEmisionResumen;
  }
}
