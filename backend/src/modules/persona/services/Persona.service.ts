import { Persona } from '../models/Persona.models';

export class PersonaService {
    private persona: Persona;

    constructor(persona: Persona) {
        this.persona = persona;
    }

    getIdPersona(): string {
        return this.persona['_idPersona'];
    }

    setIdPersona(idPersona: string): void {
        this.persona['_idPersona'] = idPersona;
    }

    getRol(): string {
        return this.persona['_rol'];
    }

    setRol(rol: string): void {
        this.persona['_rol'] = rol;
    }

    getEstadoPersona(): boolean {
        return this.persona['_estadoPersona'];
    }

    setEstadoPersona(estadoPersona: boolean): void {
        this.persona['_estadoPersona'] = estadoPersona;
    }

    getNombrePersona(): string {
        return this.persona['_nombrePersona'];
    }

    setNombrePersona(nombrePersona: string): void {
        this.persona['_nombrePersona'] = nombrePersona;
    }

    getApellido(): string {
        return this.persona['_apellido'];
    }

    setApellido(apellido: string): void {
        this.persona['_apellido'] = apellido;
    }

    getEdad(): number {
        return this.persona['_edad'];
    }

    setEdad(edad: number): void {
        this.persona['_edad'] = edad;
    }

    getIdentificacion(): number {
        return this.persona['_identificacion'];
    }

    setIdentificacion(identificacion: number): void {
        this.persona['_identificacion'] = identificacion;
    }

    getCorreo(): string {
        return this.persona['_correo'];
    }

    setCorreo(correo: string): void {
        this.persona['_correo'] = correo;
    }

    getFechaCreacionPersona(): Date {
        return this.persona['_fechaCreacionPersona'];
    }

    setFechaCreacionPersona(fechaCreacionPersona: Date): void {
        this.persona['_fechaCreacionPersona'] = fechaCreacionPersona;
    }
}