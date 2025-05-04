"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const Auth_service_1 = require("../../auth/services/Auth.service");
const uuid_1 = require("uuid");
const UsuarioSchema = new mongoose_1.Schema({
    idPersona: {
        type: String,
        unique: true,
        default: uuid_1.v4 // Genera automáticamente un ID único si no se pasa
    },
    rol: { type: String, required: true },
    estadoPersona: { type: Boolean, default: true },
    nombrePersona: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    identificacion: { type: Number, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    fechaCreacionPersona: { type: Date, default: Date.now },
});
UsuarioSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await (0, Auth_service_1.hashPassword)(this.password);
    }
    next();
});
exports.UsuarioModel = mongoose_1.default.model("Usuario", UsuarioSchema);
