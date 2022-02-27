import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTypeToSlideMedia1646002635032 implements MigrationInterface {
    name = 'AddTypeToSlideMedia1646002635032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide_media" ADD "type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "type"`);
    }

}
