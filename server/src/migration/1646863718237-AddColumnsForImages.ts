import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnsForImages1646863718237 implements MigrationInterface {
    name = 'AddColumnsForImages1646863718237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" ADD "version" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "study" ADD "version" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "slide_media" ADD "version" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ADD "version" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "version"`);
    }

}
