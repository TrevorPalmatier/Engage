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
class ChangeColumnsForImages1646680870541 {
    constructor() {
        this.name = 'ChangeColumnsForImages1646680870541';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "imageLink" TO "imageID"`);
            yield queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imageLink" TO "imageID"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "mediaUrl" TO "imageID"`);
            yield queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "mediaURL" TO "imageID"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "imageID" TO "mediaURL"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "imageID" TO "mediaUrl"`);
            yield queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imageID" TO "imageLink"`);
            yield queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "imageID" TO "imageLink"`);
        });
    }
}
exports.ChangeColumnsForImages1646680870541 = ChangeColumnsForImages1646680870541;
//# sourceMappingURL=1646680870541-ChangeColumnsForImages.js.map