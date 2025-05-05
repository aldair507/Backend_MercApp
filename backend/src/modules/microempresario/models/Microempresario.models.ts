import { IObserver } from '../interfaces/IObserver';

export class Microempresario implements IObserver {
    private id: string;
    private nombre: string;
    private email: string;
    private telefono: string;

    constructor(id: string, nombre: string, email: string, telefono: string) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
    }

    getId(): string {
        return this.id;
    }

    getNombre(): string {
        return this.nombre;
    }

    getEmail(): string {
        return this.email;
    }

    getTelefono(): string {
        return this.telefono;
    }

    actualizar(mensaje: string): void {
        console.log(`Notificación para ${this.nombre} (${this.email}): ${mensaje}`);
        // Aquí se implementaría el envío real de notificaciones
        // Por ejemplo, enviar un email o SMS
    }
}