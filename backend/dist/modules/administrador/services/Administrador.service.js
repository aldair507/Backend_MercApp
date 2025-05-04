"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministradorService = void 0;
class AdministradorService {
    constructor(administrador) {
        this.administrador = administrador;
    }
    crearUsuario(nuevoUsuario) {
        this.administrador.crearUsuario(nuevoUsuario);
    }
    editarUsuario(id, nuevosDatos) {
        const usuario = this.administrador.obtenerUsuarioPorId(id);
        if (usuario) {
            this.administrador.editarUsuario(usuario, nuevosDatos);
        }
    }
    listarUsuarios() {
        return this.administrador.listarUsuarios();
    }
    getUsuariosGestionados() {
        return this.administrador.usuariosGestionados;
    }
    setUsuariosGestionados(usuarios) {
        this.administrador.usuariosGestionados = usuarios;
    }
}
exports.AdministradorService = AdministradorService;
