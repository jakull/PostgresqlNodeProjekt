import "reflect-metadata"
import { DataSource } from "typeorm"
import { Angestellte } from "../entity/Angestellte";

export const AppDataSource = new DataSource({
    
    type: "postgres", // Typ der Datenbank
    host: "localhost", // Host der Datenbank
    port: 5431, // Port der Datenbank
    username: "postgres", // Dein PostgreSQL-Benutzername
    password: "postgresuser", // Dein PostgreSQL-Passwort
    database: "postgres", // Name der Datenbank
    synchronize: false, // Synchronisiere die Entitäten mit der Datenbank (nicht in Produktion verwenden)
    logging: false, // SQL-Abfragen werden nicht geloggt
    entities: [Angestellte], // Deine Entitäten
    migrations: [], // Deine Migrationen
    subscribers: [] // Deine Subscriber
})
