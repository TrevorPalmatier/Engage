import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageLinkBackIn1646866113058 implements MigrationInterface {
    name = 'AddImageLinkBackIn1646866113058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "version" TO "imageURL"`);
        await queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "version" TO "imageURL"`);
        await queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "version" TO "imageURL"`);
        await queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "version" TO "imageURL"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "imageURL" TO "version"`);
        await queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "imageURL" TO "version"`);
        await queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imageURL" TO "version"`);
        await queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "imageURL" TO "version"`);
    }

}
