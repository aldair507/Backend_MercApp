"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(
        //   "mongodb+srv://aldairtorres507:mercaApp123@cluster0.gx9j6lq.mongodb.net/mercaApp?retryWrites=true&w=majority&appName=Cluster0"
        app_1.config.DB_URI);
        console.log("✅ MongoDB conectado");
    }
    catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
// Eventos de conexión (opcional)
mongoose_1.default.connection.on("error", (err) => {
    console.error("Error de MongoDB:", err);
});
