export class Persona {
    private _idPersona: string;
    private _rol: string;
    private _estadoPersona: boolean;
    private _nombrePersona: string;
    private _apellido: string;
    private _edad: number;
    private _identificacion: number;
    private _correo: string;
    private _fechaCreacionPersona: Date;

    constructor(
        idPersona: string,
        rol: string,
        estadoPersona: boolean,
        nombrePersona: string,
        apellido: string,
        edad: number,
        identificacion: number,
        correo: string,
        fechaCreacionPersona: Date
    ) {
        this._idPersona = idPersona;
        this._rol = rol;
        this._estadoPersona = estadoPersona;
        this._nombrePersona = nombrePersona;
        this._apellido = apellido;
        this._edad = edad;
        this._identificacion = identificacion;
        this._correo = correo;
        this._fechaCreacionPersona = fechaCreacionPersona;
    }
}