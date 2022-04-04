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
exports.AddOptionToSlide1646339368352 = void 0;
class AddOptionToSlide1646339368352 {
    constructor() {
        this.name = 'AddOptionToSlide1646339368352';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "slide" ADD "option" integer`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ALTER COLUMN "position" SET NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "slide_media" ALTER COLUMN "position" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "slide" DROP COLUMN "option"`);
        });
    }
}
exports.AddOptionToSlide1646339368352 = AddOptionToSlide1646339368352;
//# sourceMappingURL=1646339368352-AddOptionToSlide.js.map