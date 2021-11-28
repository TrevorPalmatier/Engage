import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateEntryTable1638045381516 implements MigrationInterface {
    name = 'CreateEntryTable1638045381516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "promptId" integer NOT NULL, "userId" integer NOT NULL, "imageLink" character varying NOT NULL, "text" character varying, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "entry"`);
    }

}
