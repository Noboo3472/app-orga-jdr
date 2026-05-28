import express from 'express';
import {config} from 'dotenv';
import {connectDB, disconnectDB} from './config/db.js';


const PORT = process.env.PORT || 3000;

//Routes
config();
connectDB();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API routes


app.listen(PORT, () => {
    console.log(`Serveur fonction sur le port ${PORT}`);
});

//Déconnecter de la base de donnéesen cas de rejet non géré
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
//déconnecter de la base de données en cas d'exception non gérée
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});
//Déconnecter de la base de données en cas de signal d'arrêt
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});