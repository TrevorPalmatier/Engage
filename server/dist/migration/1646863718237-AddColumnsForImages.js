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
exports.AddColumnsForImages1646863718237 = void 0;
class AddColumnsForImages1646863718237 {
    constructor() {
        this.name = 'AddColumnsForImages1646863718237';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" ADD "version" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "type" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "version" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD "version" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "version" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "version"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "version"`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "version"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "type"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "version"`);
        });
    }
}
exports.AddColumnsForImages1646863718237 = AddColumnsForImages1646863718237;
//# sourceMappingURL=1646863718237-AddColumnsForImages.js.map