import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDateColumnForTimestamp1648070835523 implements MigrationInterface {
    name = 'AddDateColumnForTimestamp1648070835523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "study" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "slide" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "timestamp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "slide" ADD "timestamp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "study" ADD "timestamp" integer NOT NULL`);
    }

}
