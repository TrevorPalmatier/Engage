import {MigrationInterface, QueryRunner} from "typeorm";

export class PromptToUserRelationship1638047296052 implements MigrationInterface {
    name = 'PromptToUserRelationship1638047296052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`CREATE TABLE "prompt_users_user" ("promptId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8eba50c9966c4f2cefc01d209b8" PRIMARY KEY ("promptId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c7fa664528ca2d3ecff847a20" ON "prompt_users_user" ("promptId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4f32b4053443f32b43b16add64" ON "prompt_users_user" ("userId") `);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prompt_users_user" ADD CONSTRAINT "FK_6c7fa664528ca2d3ecff847a20e" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "prompt_users_user" ADD CONSTRAINT "FK_4f32b4053443f32b43b16add641" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prompt_users_user" DROP CONSTRAINT "FK_4f32b4053443f32b43b16add641"`);
        await queryRunner.query(`ALTER TABLE "prompt_users_user" DROP CONSTRAINT "FK_6c7fa664528ca2d3ecff847a20e"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" DROP NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f32b4053443f32b43b16add64"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6c7fa664528ca2d3ecff847a20"`);
        await queryRunner.query(`DROP TABLE "prompt_users_user"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
