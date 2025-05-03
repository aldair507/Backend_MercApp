import { Persona } from './Persona.models';
import { IUsuario, DatosPersonales } from '../../../core/interfaces/IUsuario';

export class Administrador extends Persona implements IUsuario {
    private _usuariosGestionados: Array<IUsuario>;

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
        usuariosGestionados: Array<IUsuario> = []
    ) {
        super(idPersona, rol, estadoPersona, nombrePersona, apellido, edad, identificacion, correo, fechaCreacionPersona);
        this._usuariosGestionados = usuariosGestionados;
    }

    getDatosPersonales(): DatosPersonales {
        return {
            idPersona: this['_idPersona'],
            nombrePersona: this['_nombrePersona'],
            apellido: this['_apellido'],
            edad: this['_edad'],
            identificacion: this['_identificacion'],
            correo: this['_correo']
        };
    }

    actualizarDatosPersonales(): void {
        console.log(`Datos personales de ${this['_nombrePersona']} actualizados.`);
    }

    validarCredenciales(): boolean {
        return !!this['_correo'] && this['_identificacion'] > 0;
    }

    crearUsuario(nuevoUsuario: IUsuario): void {
        this._usuariosGestionados.push(nuevoUsuario);
        console.log(`Usuario ${nuevoUsuario.getDatosPersonales().nombrePersona} creado por el administrador.`);
    }

    editarUsuario(usuario: IUsuario, nuevosDatos: Partial<IUsuario>): void {
        Object.assign(usuario, nuevosDatos);
        console.log(`Usuario ${usuario.getDatosPersonales().nombrePersona} editado por el administrador.`);
    }

    listarUsuarios(): Array<IUsuario> {
        return this._usuariosGestionados;
    }

    get usuariosGestionados(): Array<IUsuario> {
        return this._usuariosGestionados;
    }

    set usuariosGestionados(usuarios: Array<IUsuario>) {
        this._usuariosGestionados = usuarios;
    }
}