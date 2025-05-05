import { IObserver } from './IObserver';

export interface ISubject {
    agregarObservador(observador: IObserver): void;
    eliminarObservador(observador: IObserver): void;
    notificar(mensaje: string): void;
}