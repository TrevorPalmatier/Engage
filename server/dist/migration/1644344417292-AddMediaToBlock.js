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
class AddMediaToBlock1644344417292 {
    constructor() {
        this.name = 'AddMediaToBlock1644344417292';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_6829440bdf14d581f3fecf93d00"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "promptId"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "mediaURL" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "promptId" integer NOT NULL`);
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
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "promptId"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "mediaURL"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "blockId"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "blockId" integer`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "promptId" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_6829440bdf14d581f3fecf93d00" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.AddMediaToBlock1644344417292 = AddMediaToBlock1644344417292;
//# sourceMappingURL=1644344417292-AddMediaToBlock.js.map