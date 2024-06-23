import { AppDataSource } from "../config/databaseORM"
import { NextFunction, Request, Response } from "express"
import { MigrationInterface, QueryRunner} from "typeorm";
import { Angestellte } from "../entity/Angestellte"
import {AddEmailColumnToAngestellte1630943319814} from "../migrations/addEmail"

export class UserController {

    private userRepository = AppDataSource.getRepository(Angestellte)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)


        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { id, name, dampft } = request.body;

        const user = Object.assign(new Angestellte(), {
            id,
            name,
            dampft
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let userToRemove = await this.userRepository.findOneBy({ id })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

    async addEmail(request: Request, response: Response, next: NextFunction) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // Datenbankmigration ausführen
            const migration = new AddEmailColumnToAngestellte1630943319814();

            // Führe die up-Methode der Migration aus
            await migration.up(queryRunner);

            // Erfolgsnachricht senden
            await queryRunner.commitTransaction();
            return response.status(200).json({ message: 'Migration erfolgreich ausgeführt und E-Mail-Spalte hinzugefügt' });
        } catch (error) {
            // Bei Fehlern Transaktion zurückrollen
            await queryRunner.rollbackTransaction();
            // Fehlermeldung senden
            console.error('Fehler beim Hinzufügen der Spalte:', error);
            return response.status(500).json({ error: 'Interner Serverfehler' });
        } finally {
            // QueryRunner schließen
            await queryRunner.release();
        }
    }
}

    
