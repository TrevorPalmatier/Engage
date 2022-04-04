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
exports.AddTimestampAndNoImgOrientation1648068984015 = void 0;
class AddTimestampAndNoImgOrientation1648068984015 {
    constructor() {
        this.name = 'AddTimestampAndNoImgOrientation1648068984015';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imgOrientation" TO "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "imgOrientation" TO "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "orientation"`);
            yield queryRunner.query(`ALTER TABLE "slide" ADD "timestamp" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "timestamp" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "timestamp" integer NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "timestamp" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "timestamp" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD "orientation" character varying NOT NULL DEFAULT 'landscape'`);
            yield queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "timestamp" TO "imgOrientation"`);
            yield queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "timestamp" TO "imgOrientation"`);
        });
    }
}
exports.AddTimestampAndNoImgOrientation1648068984015 = AddTimestampAndNoImgOrientation1648068984015;
//# sourceMappingURL=1648068984015-AddTimestampAndNoImgOrientation.js.map