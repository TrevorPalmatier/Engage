import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangesToContollersRoutes1645914925270 implements MigrationInterface {
    name = 'ChangesToContollersRoutes1645914925270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide_media" DROP CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63"`);
        await queryRunner.query(`ALTER TABLE "slide" DROP CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a"`);
        await queryRunner.query(`ALTER TABLE "slide_media" ADD CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63" FOREIGN KEY ("slideId") REFERENCES "slide"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "slide" ADD CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "slide" DROP CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a"`);
        await queryRunner.query(`ALTER TABLE "slide_media" DROP CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63"`);
        await queryRunner.query(`ALTER TABLE "slide" ADD CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "slide_media" ADD CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63" FOREIGN KEY ("slideId") REFERENCES "slide"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
