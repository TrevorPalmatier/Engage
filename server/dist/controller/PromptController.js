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
const typeorm_1 = require("typeorm");
const Prompt_1 = require("../entity/Prompt");
class PromptController {
    constructor() {
        this.promptRepository = typeorm_1.getRepository(Prompt_1.Prompt);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.promptRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.promptRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.promptRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const promptToRemove = yield this.promptRepository.findOne(request.params.id);
            yield this.promptRepository.remove(promptToRemove);
        });
    }
}
exports.PromptController = PromptController;
//# sourceMappingURL=PromptController.js.map