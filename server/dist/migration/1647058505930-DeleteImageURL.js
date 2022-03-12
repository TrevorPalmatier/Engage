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
class DeleteImageURL1647058505930 {
    constructor() {
        this.name = 'DeleteImageURL1647058505930';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "imageURL"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP COLUMN "type"`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "imageURL"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "imageURL"`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "imageURL"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" ADD "imageURL" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD "imageURL" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "imageURL" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "type" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD "imageURL" character varying NOT NULL`);
        });
    }
}
exports.DeleteImageURL1647058505930 = DeleteImageURL1647058505930;
//# sourceMappingURL=1647058505930-DeleteImageURL.js.map