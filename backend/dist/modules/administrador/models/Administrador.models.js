"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Administrador = void 0;
const Persona_models_1 = require("../../persona/models/Persona.models");
class Administrador extends Persona_models_1.Persona {
    constructor(idPersona, rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, fechaCreacionPersona, usuariosGestionados = [], permisos = []) {
        super(idPersona, rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, fechaCreacionPersona);
        this._usuariosGestionados = usuariosGestionados;
        this._permisos = permisos;
    }
    getDatosPersonales() {
        return {
            idPersona: this.idPersona, // Usamos el getter idPersona de la clase Persona
            nombrePersona: this.nombrePersona, // Usamos el getter nombrePersona de la clase Persona
            apellido: this.apellido, // Usamos el getter apellido de la clase Persona
            edad: this.edad, // Usamos el getter edad de la clase Persona
            identificacion: this.identificacion, // Usamos el getter identificacion de la clase Persona
            correo: this.correo // Usamos el getter correo de la clase Persona
        };
    }
    actualizarDatosPersonales() {
        console.log(`Datos personales de ${this.nombrePersona} actualizados.`);
    }
    validarCredenciales() {
        return !!this.correo && this.identificacion > 0;
    }
    crearUsuario(nuevoUsuario) {
        this._usuariosGestionados.push(nuevoUsuario);
        console.log(`Usuario ${nuevoUsuario.getDatosPersonales().nombrePersona} creado por el administrador.`);
    }
    editarUsuario(usuario, nuevosDatos) {
        const index = this._usuariosGestionados.findIndex((u) => u.getDatosPersonales().idPersona === usuario.getDatosPersonales().idPersona);
        if (index === -1) {
            console.log(`Usuario no encontrado.`);
            return;
        }
        Object.assign(this._usuariosGestionados[index], nuevosDatos);
        console.log(`Usuario ${usuario.getDatosPersonales().nombrePersona} editado por el administrador.`);
    }
    listarUsuarios() {
        return this._usuariosGestionados;
    }
    obtenerUsuarioPorId(id) {
        return this._usuariosGestionados.find((usuario) => usuario.getDatosPersonales().idPersona === id);
    }
    get usuariosGestionados() {
        return this._usuariosGestionados;
    }
    set usuariosGestionados(usuarios) {
        this._usuariosGestionados = usuarios;
    }
    get permisos() {
        return this._permisos;
    }
    set permisos(perms) {
        this._permisos = perms;
    }
}
exports.Administrador = Administrador;
