import mongoose, { Schema, Document, Model } from 'mongoose';
import { hashPassword } from '../../auth/services/Auth.service';

export interface IUsuarioDocument extends Document {
    idPersona: string;
    rol: string;
    estadoPersona: boolean;
    nombrePersona: string;
    apellido: string;
    edad: number;
    identificacion: number;
    correo: string;
    password: string;
    fechaCreacionPersona: Date;
}

const UsuarioSchema: Schema = new Schema({
    idPersona: { type: String, required: true, unique: true },
    rol: { type: String, required: true },
    estadoPersona: { type: Boolean, default: true },
    nombrePersona: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    identificacion: { type: Number, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // No se devuelve por defecto
    fechaCreacionPersona: { type: Date, default: Date.now }
});

// Hash de la contraseña antes de guardar
UsuarioSchema.pre<IUsuarioDocument>('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await hashPassword(this.password);
    }
    next();
});

export const UsuarioModel = mongoose.model<IUsuarioDocument>('Usuario', UsuarioSchema);