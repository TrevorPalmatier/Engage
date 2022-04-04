import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDefaultToAdmin1649035600545 implements MigrationInterface {
    name = 'AddDefaultToAdmin1649035600545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "admin" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "admin"`);
    }

}
