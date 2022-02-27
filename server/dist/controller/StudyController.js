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
const Study_1 = require("../entity/Study");
class StudyController {
    constructor() {
        this.studyRepository = typeorm_1.getRepository(Study_1.Study);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studyRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studyRepository.findOne(request.params.id);
        });
    }
    blocks(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const study = this.studyRepository
                .createQueryBuilder("study")
                .leftJoinAndSelect("study.blocks", "block")
                .where("study.id = :id", { id: request.params.id })
                .getOne();
            return (yield study).blocks;
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studyRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToRemove = yield this.studyRepository.findOne(request.params.id);
            yield this.studyRepository.remove(userToRemove);
        });
    }
}
exports.StudyController = StudyController;
//# sourceMappingURL=StudyController.js.map