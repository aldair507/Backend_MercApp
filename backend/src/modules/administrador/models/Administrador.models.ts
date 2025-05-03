import { Persona } from '../../persona/models/Persona.models';
import { IUsuario, DatosPersonales } from '../../../core/interfaces/IUsuario';

export class Administrador extends Persona implements IUsuario {
    private _usuariosGestionados: Array<IUsuario>;
    private _permisos: Array<string>;

    constructor(
        idPersona: string,
        rol: string,
        estadoPersona: boolean,
        nombrePersona: string,
        apellido: string,
        edad: number,
        identificacion: number,
        correo: string,
        fechaCreacionPersona: Date,
        usuariosGestionados: Array<IUsuario> = [],
        permisos: Array<string> = []
    ) {
        super(idPersona, rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, fechaCreacionPersona);
        this._usuariosGestionados = usuariosGestionados;
        this._permisos = permisos;
    }

    getDatosPersonales(): DatosPersonales {
        return {
            idPersona: this.idPersona, // Usamos el getter idPersona de la clase Persona
            nombrePersona: this.nombrePersona, // Usamos el getter nombrePersona de la clase Persona
            apellido: this.apellido, // Usamos el getter apellido de la clase Persona
            edad: this.edad, // Usamos el getter edad de la clase Persona
            identificacion: this.identificacion, // Usamos el getter identificacion de la clase Persona
            correo: this.correo // Usamos el getter correo de la clase Persona
        };
    }

    actualizarDatosPersonales(): void {
        console.log(`Datos personales de ${this.nombrePersona} actualizados.`);
    }

    validarCredenciales(): boolean {
        return !!this.correo && this.identificacion > 0;
    }

    crearUsuario(nuevoUsuario: IUsuario): void {
        this._usuariosGestionados.push(nuevoUsuario);
        console.log(`Usuario ${nuevoUsuario.getDatosPersonales().nombrePersona} creado por el administrador.`);
    }

    editarUsuario(usuario: IUsuario, nuevosDatos: Partial<IUsuario>): void {
        const index = this._usuariosGestionados.findIndex(
            (u) => u.getDatosPersonales().idPersona === usuario.getDatosPersonales().idPersona
        );
        if (index === -1) {
            console.log(`Usuario no encontrado.`);
            return;
        }
        Object.assign(this._usuariosGestionados[index], nuevosDatos);
        console.log(`Usuario ${usuario.getDatosPersonales().nombrePersona} editado por el administrador.`);
    }

    listarUsuarios(): Array<IUsuario> {
        return this._usuariosGestionados;
    }

    obtenerUsuarioPorId(id: string): IUsuario | undefined {
        return this._usuariosGestionados.find(
            (usuario) => usuario.getDatosPersonales().idPersona === id
        );
    }

    get usuariosGestionados(): Array<IUsuario> {
        return this._usuariosGestionados;
    }

    set usuariosGestionados(usuarios: Array<IUsuario>) {
        this._usuariosGestionados = usuarios;
    }

    get permisos(): Array<string> {
        return this._permisos;
    }

    set permisos(perms: Array<string>) {
        this._permisos = perms;
    }
}
