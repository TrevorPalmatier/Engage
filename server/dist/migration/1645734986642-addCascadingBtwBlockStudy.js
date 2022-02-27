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
class AddCascadingBtwBlockStudy1645734986642 {
    constructor() {
        this.name = 'AddCascadingBtwBlockStudy1645734986642';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f"`);
            yield queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f"`);
            yield queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "FK_f0c42c160a7d9dcea7c08b61b5f" FOREIGN KEY ("studyId") REFERENCES "study"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.AddCascadingBtwBlockStudy1645734986642 = AddCascadingBtwBlockStudy1645734986642;
//# sourceMappingURL=1645734986642-addCascadingBtwBlockStudy.js.map