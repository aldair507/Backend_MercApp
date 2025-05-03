  import { Persona } from "../../modules/persona/models/Persona.models";

  export interface DatosPersonales {
    idPersona: string;
    nombrePersona: string;
    apellido: string;
    edad: number;
    identificacion: number;
    correo: string;
  }

  export interface IUsuario extends Persona {
    getDatosPersonales(): DatosPersonales;
    actualizarDatosPersonales(): void;
    validarCredenciales(): boolean;
  }
