import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeColumnsForImages1646680870541 implements MigrationInterface {
    name = 'ChangeColumnsForImages1646680870541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "imageLink" TO "imageID"`);
        await queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imageLink" TO "imageID"`);
        await queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "mediaUrl" TO "imageID"`);
        await queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "mediaURL" TO "imageID"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "imageID" TO "mediaURL"`);
        await queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "imageID" TO "mediaUrl"`);
        await queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imageID" TO "imageLink"`);
        await queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "imageID" TO "imageLink"`);
    }

}
