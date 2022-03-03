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
class AddPositionToSlideMedia1646335210059 {
    constructor() {
        this.name = 'AddPositionToSlideMedia1646335210059';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD "orientation" character varying NOT NULL DEFAULT 'landscape'`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD "position" integer`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "position"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP COLUMN "orientation"`);
        });
    }
}
exports.AddPositionToSlideMedia1646335210059 = AddPositionToSlideMedia1646335210059;
//# sourceMappingURL=1646335210059-AddPositionToSlideMedia.js.map