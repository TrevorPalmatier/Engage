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
class RemovePromptTable1645633670298 {
    constructor() {
        this.name = 'RemovePromptTable1645633670298';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_5953472c3421397515c38e0b5f1"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_6829440bdf14d581f3fecf93d00"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "promptId"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "REL_5953472c3421397515c38e0b5f"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "promptId"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
            yield queryRunner.query(`DROP TABLE "prompt_media"`);
            yield queryRunner.query(`DROP TABLE "prompt"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "promptTitle" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "promptText" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_6829440bdf14d581f3fecf93d00" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_6829440bdf14d581f3fecf93d00"`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "promptText"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "promptTitle"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_6829440bdf14d581f3fecf93d00" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.RemovePromptTable1645633670298 = RemovePromptTable1645633670298;
//# sourceMappingURL=1645633670298-RemovePromptTable.js.map