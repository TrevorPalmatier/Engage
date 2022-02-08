import {MigrationInterface, QueryRunner} from "typeorm";

export class AddMediaToBlock1644344417292 implements MigrationInterface {
    name = 'AddMediaToBlock1644344417292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_6829440bdf14d581f3fecf93d00"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "promptId"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
        await queryRunner.query(`ALTER TABLE "block" ADD "mediaURL" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "promptId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_6829440bdf14d581f3fecf93d00" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_6829440bdf14d581f3fecf93d00"`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "promptId"`);
        await queryRunner.query(`ALTER TABLE "block" DROP COLUMN "mediaURL"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
        await queryRunner.query(`ALTER TABLE "entry" ADD "promptId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_6829440bdf14d581f3fecf93d00" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
