import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePromptTable1638044479449 implements MigrationInterface {
    name = 'CreatePromptTable1638044479449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prompt" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "backgroundText" character varying NOT NULL, "blockId" integer NOT NULL, CONSTRAINT "PK_d8e3aa07a95560a445ad50fb931" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "prompt"`);
    }

}
