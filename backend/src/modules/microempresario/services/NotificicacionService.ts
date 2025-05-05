import { IObserver } from '../interfaces/IObserver';
import { ISubject } from '../interfaces/ISubjet';

export class NotificacionService implements ISubject {
    private observadores: IObserver[] = [];

    agregarObservador(observador: IObserver): void {
        const indice = this.observadores.indexOf(observador);
        if (indice === -1) { // Verificar que no esté ya registrado
            this.observadores.push(observador);
            console.log('Nuevo observador registrado');
        }
    }

    eliminarObservador(observador: IObserver): void {
        const indice = this.observadores.indexOf(observador);
        if (indice !== -1) {
            this.observadores.splice(indice, 1);
            console.log('Observador eliminado');
        }
    }

    notificar(mensaje: string): void {
        console.log('Notificando a todos los observadores...');
        this.observadores.forEach(observador => {
            observador.actualizar(mensaje);
        });
    }
}