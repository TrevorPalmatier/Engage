import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTimestampAndNoImgOrientation1648068984015 implements MigrationInterface {
    name = 'AddTimestampAndNoImgOrientation1648068984015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imgOrientation" TO "timestamp"`);
        await queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "imgOrientation" TO "timestamp"`);
        await queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "orientation"`);
        await queryRunner.query(`ALTER TABLE "slide" ADD "timestamp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "study" ADD "timestamp" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "timestamp" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "block" ADD "timestamp" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "study" ADD "timestamp" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "timestamp"`);
        await queryRunner.query(`ALTER TABLE "slide_media" ADD "orientation" character varying NOT NULL DEFAULT 'landscape'`);
        await queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "timestamp" TO "imgOrientation"`);
        await queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "timestamp" TO "imgOrientation"`);
    }

}
