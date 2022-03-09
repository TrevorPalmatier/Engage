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
class AddImageLinkBackIn1646866113058 {
    constructor() {
        this.name = 'AddImageLinkBackIn1646866113058';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "version" TO "imageURL"`);
            yield queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "version" TO "imageURL"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "version" TO "imageURL"`);
            yield queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "version" TO "imageURL"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "block" RENAME COLUMN "imageURL" TO "version"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" RENAME COLUMN "imageURL" TO "version"`);
            yield queryRunner.query(`ALTER TABLE "study" RENAME COLUMN "imageURL" TO "version"`);
            yield queryRunner.query(`ALTER TABLE "entry" RENAME COLUMN "imageURL" TO "version"`);
        });
    }
}
exports.AddImageLinkBackIn1646866113058 = AddImageLinkBackIn1646866113058;
//# sourceMappingURL=1646866113058-AddImageLinkBackIn.js.map