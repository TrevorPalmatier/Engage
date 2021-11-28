import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateBlockTable1638045553222 implements MigrationInterface {
    name = 'CreateBlockTable1638045553222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block" ("id" SERIAL NOT NULL, "imageLink" character varying, "title" character varying NOT NULL, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "block"`);
    }

}
