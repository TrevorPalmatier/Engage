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
class PromptToPromptMediaRelationship1638045924087 {
    constructor() {
        this.name = 'PromptToPromptMediaRelationship1638045924087';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "prompt_media" ("id" SERIAL NOT NULL, "mediaUrl" character varying NOT NULL, "promptId" integer, CONSTRAINT "PK_cbcc1aa9e6cb3134ebd5babb0d4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "prompt_media" ADD CONSTRAINT "FK_36b835f90647253f3375b5285db" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "prompt_media" DROP CONSTRAINT "FK_36b835f90647253f3375b5285db"`);
            yield queryRunner.query(`DROP TABLE "prompt_media"`);
        });
    }
}
exports.PromptToPromptMediaRelationship1638045924087 = PromptToPromptMediaRelationship1638045924087;
//# sourceMappingURL=1638045924087-PromptToPromptMediaRelationship.js.map