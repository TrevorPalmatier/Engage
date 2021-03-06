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
exports.ChangesToContollersRoutes1645914925270 = void 0;
class ChangesToContollersRoutes1645914925270 {
    constructor() {
        this.name = 'ChangesToContollersRoutes1645914925270';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63"`);
            yield queryRunner.query(`ALTER TABLE "slide" DROP CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63" FOREIGN KEY ("slideId") REFERENCES "slide"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
            yield queryRunner.query(`ALTER TABLE "slide" ADD CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "slide" DROP CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a"`);
            yield queryRunner.query(`ALTER TABLE "slide_media" DROP CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63"`);
            yield queryRunner.query(`ALTER TABLE "slide" ADD CONSTRAINT "FK_d1dc0f8078ebb01c8dddb4ec49a" FOREIGN KEY ("blockId") REFERENCES "block"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "slide_media" ADD CONSTRAINT "FK_2cd1db3c1e2d2a1ad0673cfba63" FOREIGN KEY ("slideId") REFERENCES "slide"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.ChangesToContollersRoutes1645914925270 = ChangesToContollersRoutes1645914925270;
//# sourceMappingURL=1645914925270-ChangesToContollersRoutes%20copy.js.map