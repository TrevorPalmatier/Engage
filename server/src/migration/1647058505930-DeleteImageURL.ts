import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteImageURL1647058505930 implements MigrationInterface {
    name = 'DeleteImageURL1647058505930'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "imageURL"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "type"`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "imageURL"`);
        await queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "imageURL"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "imageURL"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" ADD "imageURL" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "slide_media" ADD "imageURL" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "study" ADD "imageURL" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "imageURL" character varying NOT NULL`);
    }

}
