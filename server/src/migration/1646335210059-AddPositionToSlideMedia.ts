import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPositionToSlideMedia1646335210059 implements MigrationInterface {
    name = 'AddPositionToSlideMedia1646335210059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide_media" ADD "orientation" character varying NOT NULL DEFAULT 'landscape'`);
        await queryRunner.query(`ALTER TABLE "slide_media" ADD "position" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "orientation"`);
    }

}
