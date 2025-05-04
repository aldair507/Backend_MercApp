"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Persona = void 0;
class Persona {
    constructor(idPersona, rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, fechaCreacionPersona) {
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
    // Getters para acceder a las propiedades privadas
    get idPersona() {
        return this._idPersona;
    }
    get rol() {
        return this._rol;
    }
    get estadoPersona() {
        return this._estadoPersona;
    }
    get nombrePersona() {
        return this._nombrePersona;
    }
    get apellido() {
        return this._apellido;
    }
    get edad() {
        return this._edad;
    }
    get identificacion() {
        return this._identificacion;
    }
    get correo() {
        return this._correo;
    }
    get fechaCreacionPersona() {
        return this._fechaCreacionPersona;
    }
}
exports.Persona = Persona;
