// Tipos auxiliares
type RolUsuario = 'admin' | 'vendedor' | 'microempresario';

interface DatosPersonales {
  nombrePersona: string;
  apellido: string;
  edad: number;
  identificacion: number;
  estadoPersona?: boolean;
}

interface DatosEspecificos {
  // Campos comunes
  telefono?: string;
  
  // Admin
  permisos?: string[];
  
  // Microempresario
  nit?: string;
  nombreEmpresa?: string;
  
  // Vendedor
  codigoVendedor?: string;
  zonaVenta?: string;
}

export interface IAuthService {
  registrarUsuario(datosRegistro: {
    correo: string;
    contraseña: string;
    rol: RolUsuario;
    datosPersonales: DatosPersonales;
    datosEspecificos?: DatosEspecificos;
  }): Promise<{ usuario: any; token: string }>;

  iniciarSesion(credenciales: {
    correo: string;
    contraseña: string;
  }): Promise<{ usuario: any; token: string }>;

  validarToken(token: string): Promise<{ usuario: any }>;
}