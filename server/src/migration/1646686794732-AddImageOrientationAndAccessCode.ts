import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageOrientationAndAccessCode1646686794732 implements MigrationInterface {
    name = 'AddImageOrientationAndAccessCode1646686794732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "study" ADD "code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "study" ADD CONSTRAINT "UQ_4aa82d83c8ff33a132b22f2f677" UNIQUE ("code")`);
        await queryRunner.query(`ALTER TABLE "study" ADD "imgOrientation" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ADD "imgOrientation" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "imgOrientation"`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "imgOrientation"`);
        await queryRunner.query(`ALTER TABLE "study" DROP CONSTRAINT "UQ_4aa82d83c8ff33a132b22f2f677"`);
        await queryRunner.query(`ALTER TABLE "study" DROP COLUMN "code"`);
    }

}
