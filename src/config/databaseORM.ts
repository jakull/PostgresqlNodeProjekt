import "reflect-metadata"
import { DataSource } from "typeorm"
import { Angestellte } from "../entity/Angestellte";

export const AppDataSource = new DataSource({
    
    type: "postgres", // Typ der Datenbank
    host: process.env.DB_HOST as string, // Host der Datenbank
    port: parseInt(process.env.DB_PORT as string, 10), // Port der Datenbank
    username: process.env.DB_USER as string, // Dein PostgreSQL-Benutzername
    password: process.env.DB_PASSWORD as string, // Dein PostgreSQL-Passwort
    database: process.env.DB_NAME as string, // Name der Datenbank
    synchronize: false, // Synchronisiere die Entitäten mit der Datenbank (nicht in Produktion verwenden)
    logging: false, // SQL-Abfragen werden nicht geloggt
    entities: [Angestellte], // Deine Entitäten
    migrations: [], // Deine Migrationen
    subscribers: [] // Deine Subscriber
})
