"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class PromptToUserRelationship1638047296052 {
    constructor() {
        this.name = 'PromptToUserRelationship1638047296052';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`CREATE TABLE "prompt_users_user" ("promptId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_8eba50c9966c4f2cefc01d209b8" PRIMARY KEY ("promptId", "userId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_6c7fa664528ca2d3ecff847a20" ON "prompt_users_user" ("promptId") `);
            yield queryRunner.query(`CREATE INDEX "IDX_4f32b4053443f32b43b16add64" ON "prompt_users_user" ("userId") `);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "prompt_users_user" ADD CONSTRAINT "FK_6c7fa664528ca2d3ecff847a20e" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "prompt_users_user" ADD CONSTRAINT "FK_4f32b4053443f32b43b16add641" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "prompt_users_user" DROP CONSTRAINT "FK_4f32b4053443f32b43b16add641"`);
            yield queryRunner.query(`ALTER TABLE "prompt_users_user" DROP CONSTRAINT "FK_6c7fa664528ca2d3ecff847a20e"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" DROP NOT NULL`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_4f32b4053443f32b43b16add64"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_6c7fa664528ca2d3ecff847a20"`);
            yield queryRunner.query(`DROP TABLE "prompt_users_user"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.PromptToUserRelationship1638047296052 = PromptToUserRelationship1638047296052;
//# sourceMappingURL=1638047296052-PromptToUserRelationship.js.map