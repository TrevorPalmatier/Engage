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
exports.AddImageOrientationAndAccessCode1646686794732 = void 0;
class AddImageOrientationAndAccessCode1646686794732 {
    constructor() {
        this.name = 'AddImageOrientationAndAccessCode1646686794732';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "study" ADD "code" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "study" ADD CONSTRAINT "UQ_4aa82d83c8ff33a132b22f2f677" UNIQUE ("code")`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "imgOrientation" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "imgOrientation" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "imgOrientation"`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "imgOrientation"`);
            yield queryRunner.query(`ALTER TABLE "study" DROP CONSTRAINT "UQ_4aa82d83c8ff33a132b22f2f677"`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "code"`);
        });
    }
}
exports.AddImageOrientationAndAccessCode1646686794732 = AddImageOrientationAndAccessCode1646686794732;
//# sourceMappingURL=1646686794732-AddImageOrientationAndAccessCode.js.map