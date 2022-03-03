import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOptionToSlide1646339368352 implements MigrationInterface {
    name = 'AddOptionToSlide1646339368352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide" ADD "option" integer`);
        await queryRunner.query(`ALTER TABLE "slide_media" ALTER COLUMN "position" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide_media" ALTER COLUMN "position" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "option"`);
    }

}
