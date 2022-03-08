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
const Block_1 = require("../entity/Block");
class BlockController {
    constructor() {
        this.blockRepository = typeorm_1.getRepository(Block_1.Block);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockRepository.find();
        });
    }
    slides(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const promptAndSlides = this.blockRepository.findOne(request.params.id, { relations: ["slides"] });
            const result = [
                ...(yield promptAndSlides).slides,
                { id: -1, title: (yield promptAndSlides).promptTitle, backgroundText: (yield promptAndSlides).promptText },
            ];
            return result;
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockRepository.findOne(request.params.id, { relations: ["slides"] });
        });
    }
    oneEntries(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockRepository.findOne(request.params.id, { relations: ["entries"] });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockToRemove = yield this.blockRepository.findOne(request.params.id);
            yield this.blockRepository.remove(blockToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.blockRepository.update(request.params.id, request.body);
            return this.blockRepository.findOne(request.params.id, { relations: ["slides"] });
        });
    }
}
exports.BlockController = BlockController;
//# sourceMappingURL=BlockController.js.map