"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaService = void 0;
class PersonaService {
    constructor(persona) {
        this.persona = persona;
    }
    getIdPersona() {
        return this.persona['_idPersona'];
    }
    setIdPersona(idPersona) {
        this.persona['_idPersona'] = idPersona;
    }
    getRol() {
        return this.persona['_rol'];
    }
    setRol(rol) {
        this.persona['_rol'] = rol;
    }
    getEstadoPersona() {
        return this.persona['_estadoPersona'];
    }
    setEstadoPersona(estadoPersona) {
        this.persona['_estadoPersona'] = estadoPersona;
    }
    getNombrePersona() {
        return this.persona['_nombrePersona'];
    }
    setNombrePersona(nombrePersona) {
        this.persona['_nombrePersona'] = nombrePersona;
    }
    getApellido() {
        return this.persona['_apellido'];
    }
    setApellido(apellido) {
        this.persona['_apellido'] = apellido;
    }
    getEdad() {
        return this.persona['_edad'];
    }
    setEdad(edad) {
        this.persona['_edad'] = edad;
    }
    getIdentificacion() {
        return this.persona['_identificacion'];
    }
    setIdentificacion(identificacion) {
        this.persona['_identificacion'] = identificacion;
    }
    getCorreo() {
        return this.persona['_correo'];
    }
    setCorreo(correo) {
        this.persona['_correo'] = correo;
    }
    getFechaCreacionPersona() {
        return this.persona['_fechaCreacionPersona'];
    }
    setFechaCreacionPersona(fechaCreacionPersona) {
        this.persona['_fechaCreacionPersona'] = fechaCreacionPersona;
    }
}
exports.PersonaService = PersonaService;
