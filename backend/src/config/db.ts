import mongoose from "mongoose";
import { config } from "./app";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      //   "mongodb+srv://aldairtorres507:mercaApp123@cluster0.gx9j6lq.mongodb.net/mercaApp?retryWrites=true&w=majority&appName=Cluster0"
      config.DB_URI
    );
    console.log("✅ MongoDB conectado");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

// Eventos de conexión (opcional)
mongoose.connection.on("error", (err) => {
  console.error("Error de MongoDB:", err);
});
