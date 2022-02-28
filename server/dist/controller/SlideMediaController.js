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
const SlideMedia_1 = require("../entity/SlideMedia");
class SlideMediaController {
    constructor() {
        this.slideMediaRepository = typeorm_1.getRepository(SlideMedia_1.SlideMedia);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.slideMediaRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.slideMediaRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.slideMediaRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToRemove = yield this.slideMediaRepository.findOne(request.params.id);
            yield this.slideMediaRepository.remove(userToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.slideMediaRepository.update(request.params.id, request.body);
        });
    }
}
exports.SlideMediaController = SlideMediaController;
//# sourceMappingURL=SlideMediaController.js.map