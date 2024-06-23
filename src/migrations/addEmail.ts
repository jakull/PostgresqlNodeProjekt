import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailColumnToAngestellte1630943319814 implements MigrationInterface {
    name = 'AddEmailColumnToAngestellte1630943319814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE angestellte ADD COLUMN email VARCHAR`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE angestellte DROP COLUMN email`);
    }

}
