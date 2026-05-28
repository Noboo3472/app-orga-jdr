import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
    log: 
    process.env.NODE_ENV === "development" 
    ? ["query", "error", "warn"] 
    : ["error"]
});
const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connecté à la base de données");
    } catch (error) {
        console.error(`Erreur de connexion à la base de données: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await prisma.$disconnect();
        console.log("Déconnecté de la base de données");
    } catch (error) {
        console.error(`Erreur de déconnexion de la base de données: ${error.message}`);
        process.exit(1);
    }
};


export {prisma, connectDB, disconnectDB}