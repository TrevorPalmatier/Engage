import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateAdmin1648924538831 implements MigrationInterface {
    name = 'CreateAdmin1648924538831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
    }

}
