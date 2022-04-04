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
exports.AddDateColumnForTimestamp1648070835523 = void 0;
class AddDateColumnForTimestamp1648070835523 {
    constructor() {
        this.name = 'AddDateColumnForTimestamp1648070835523';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "slide" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "timestamp" TIMESTAMP NOT NULL DEFAULT now()`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "block" ADD "timestamp" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "slide" ADD "timestamp" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "study" DROP COLUMN "timestamp"`);
            yield queryRunner.query(`ALTER TABLE "study" ADD "timestamp" integer NOT NULL`);
        });
    }
}
exports.AddDateColumnForTimestamp1648070835523 = AddDateColumnForTimestamp1648070835523;
//# sourceMappingURL=1648070835523-AddDateColumnForTimestamp.js.map