import { Administrador } from '../models/Administrador.models';
import { IUsuario } from '../../../core/interfaces/IUsuario';
export class AdministradorService {
    private administrador: Administrador;

    constructor(administrador: Administrador) {
        this.administrador = administrador;
    }

    crearUsuario(nuevoUsuario: IUsuario): void {
        this.administrador.crearUsuario(nuevoUsuario);
    }
    
    editarUsuario(id: string, nuevosDatos: Partial<IUsuario>): void {
        const usuario = this.administrador.obtenerUsuarioPorId(id);
        if (usuario) {
            this.administrador.editarUsuario(usuario, nuevosDatos);
        }
    }

    listarUsuarios(): Array<IUsuario> {
        return this.administrador.listarUsuarios();
    }

    getUsuariosGestionados(): Array<IUsuario> {
        return this.administrador.usuariosGestionados;
    }

    setUsuariosGestionados(usuarios: Array<IUsuario>): void {
        this.administrador.usuariosGestionados = usuarios;
    }
}