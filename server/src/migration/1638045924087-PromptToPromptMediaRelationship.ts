import {MigrationInterface, QueryRunner} from "typeorm";

export class PromptToPromptMediaRelationship1638045924087 implements MigrationInterface {
    name = 'PromptToPromptMediaRelationship1638045924087'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prompt_media" ("id" SERIAL NOT NULL, "mediaUrl" character varying NOT NULL, "promptId" integer, CONSTRAINT "PK_cbcc1aa9e6cb3134ebd5babb0d4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "prompt_media" ADD CONSTRAINT "FK_36b835f90647253f3375b5285db" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prompt_media" DROP CONSTRAINT "FK_36b835f90647253f3375b5285db"`);
        await queryRunner.query(`DROP TABLE "prompt_media"`);
    }

}
