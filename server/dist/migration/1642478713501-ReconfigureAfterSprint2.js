"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReconfigureAfterSprint21642478713501 = void 0;
class ReconfigureAfterSprint21642478713501 {
    constructor() {
        this.name = 'ReconfigureAfterSprint21642478713501';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "entry" ("id" SERIAL NOT NULL, "imageLink" character varying NOT NULL, "text" character varying, "blockId" integer, "userId" integer, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "emailAddress" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "study" ("id" SERIAL NOT NULL, "imageLink" character varying, "title" character varying NOT NULL, CONSTRAINT "PK_ae14dbea0172b8521edb2ce4597" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "slide_media" ("id" SERIAL NOT NULL, "mediaUrl" character varying NOT NULL, "slideId" integer, CONSTRAINT "PK_e05d2c2191b3c2dd583744f20fe" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "slide" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "backgroundText" character varying NOT NULL, "blockId" integer, CONSTRAINT "PK_61701f20afc899f757f86da067b" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "prompt" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "promptText" character varying NOT NULL, CONSTRAINT "PK_d8e3aa07a95560a445ad50fb931" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "block" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "backgroundText" character varying NOT NULL, "studyId" integer, "promptId" integer, CONSTRAINT "REL_5953472c3421397515c38e0b5f" UNIQUE ("promptId"), CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "prompt_media" ("id" SERIAL NOT NULL, "mediaUrl" character varying NOT NULL, "promptId" integer, CONSTRAINT "PK_cbcc1aa9e6cb3134ebd5babb0d4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "study_users_user" ("studyId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_dacffb49440dd60913a042bd35d" PRIMARY KEY ("studyId", "userId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_193588a9aadedc3d456b571832" ON "study_users_user" ("studyId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_27bdd61ac1ebcea5be84319689" ON "study_users_user" ("userId") `);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "promptId" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_6829440bdf14d581f3fecf93d00" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63" FOREIGN KEY ("slideId") REFERENCES "slide"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "slide" ADD CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_5953472c3421397515c38e0b5f1" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "prompt_media" ADD CONSTRAINT "FK_36b835f90647253f3375b5285db" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "study_users_user" ADD CONSTRAINT "FK_193588a9aadedc3d456b5718328" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "study_users_user" ADD CONSTRAINT "FK_27bdd61ac1ebcea5be843196893" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "study_users_user" DROP CONSTRAINT "FK_27bdd61ac1ebcea5be843196893"`);
            yield queryRunner.query(`ALTER TABLE "study_users_user" DROP CONSTRAINT "FK_193588a9aadedc3d456b5718328"`);
            yield queryRunner.query(`ALTER TABLE "prompt_media" DROP CONSTRAINT "FK_36b835f90647253f3375b5285db"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_5953472c3421397515c38e0b5f1"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f"`);
            yield queryRunner.query(`ALTER TABLE "slide" DROP CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_6829440bdf14d581f3fecf93d00"`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "promptId"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_27bdd61ac1ebcea5be84319689"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_193588a9aadedc3d456b571832"`);
            yield queryRunner.query(`DROP TABLE "study_users_user"`);
            yield queryRunner.query(`DROP TABLE "prompt_media"`);
            yield queryRunner.query(`DROP TABLE "block"`);
            yield queryRunner.query(`DROP TABLE "prompt"`);
            yield queryRunner.query(`DROP TABLE "slide"`);
            yield queryRunner.query(`DROP TABLE "slide_media"`);
            yield queryRunner.query(`DROP TABLE "study"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "entry"`);
        });
    }
}
exports.ReconfigureAfterSprint21642478713501 = ReconfigureAfterSprint21642478713501;
//# sourceMappingURL=1642478713501-ReconfigureAfterSprint2.js.map