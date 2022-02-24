import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascadingBtwBlockStudy1645734986642 implements MigrationInterface {
    name = 'addCascadingBtwBlockStudy1645734986642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f"`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f"`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
