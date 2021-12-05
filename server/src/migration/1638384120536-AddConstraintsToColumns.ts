import {MigrationInterface, QueryRunner} from "typeorm";

export class AddConstraintsToColumns1638384120536 implements MigrationInterface {
    name = 'AddConstraintsToColumns1638384120536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_eea9ba2f6e1bb8cb89c4e672f62" UNIQUE ("emailAddress")`);
        await queryRunner.query(`ALTER TABLE "prompt" ADD CONSTRAINT "UQ_f7fa571c91bee07937b8af45859" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "prompt" ALTER COLUMN "backgroundText" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "UQ_fa30bbe93ae1d9e97d28ea0a760" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "UQ_fa30bbe93ae1d9e97d28ea0a760"`);
        await queryRunner.query(`ALTER TABLE "prompt" ALTER COLUMN "backgroundText" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "prompt" DROP CONSTRAINT "UQ_f7fa571c91bee07937b8af45859"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_eea9ba2f6e1bb8cb89c4e672f62"`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
