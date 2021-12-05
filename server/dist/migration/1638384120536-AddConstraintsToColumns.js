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
class AddConstraintsToColumns1638384120536 {
    constructor() {
        this.name = 'AddConstraintsToColumns1638384120536';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_eea9ba2f6e1bb8cb89c4e672f62" UNIQUE ("emailAddress")`);
            yield queryRunner.query(`ALTER TABLE "prompt" ADD CONSTRAINT "UQ_f7fa571c91bee07937b8af45859" UNIQUE ("title")`);
            yield queryRunner.query(`ALTER TABLE "prompt" ALTER COLUMN "backgroundText" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" ADD CONSTRAINT "UQ_fa30bbe93ae1d9e97d28ea0a760" UNIQUE ("title")`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
            yield queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_5716b5de40b931f44cd9479b64b"`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "userId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "entry" ALTER COLUMN "promptId" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "block" DROP CONSTRAINT "UQ_fa30bbe93ae1d9e97d28ea0a760"`);
            yield queryRunner.query(`ALTER TABLE "prompt" ALTER COLUMN "backgroundText" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "prompt" DROP CONSTRAINT "UQ_f7fa571c91bee07937b8af45859"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_eea9ba2f6e1bb8cb89c4e672f62"`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_5716b5de40b931f44cd9479b64b" FOREIGN KEY ("promptId") REFERENCES "prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.AddConstraintsToColumns1638384120536 = AddConstraintsToColumns1638384120536;
//# sourceMappingURL=1638384120536-AddConstraintsToColumns.js.map