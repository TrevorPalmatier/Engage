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
            return this.studyRepository.find({ order: { timestamp: "DESC" } });
        });
    }
    blocks(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const study = this.studyRepository.findOne(request.params.id, { relations: ["blocks"] });
            return (yield study).blocks;
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.studyRepository.findOne(request.params.id, { relations: ["blocks", "users"] });
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
            return yield this.studyRepository.remove(userToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.studyRepository.update(request.params.id, request.body);
        });
    }
    addUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessCode = request.params.code;
            const result = this.studyRepository
                .createQueryBuilder("study")
                .where("study.code = :id", { id: accessCode })
                .getOne();
            return this.studyRepository.update((yield result).id, { users: request.body });
        });
    }
}
exports.StudyController = StudyController;
//# sourceMappingURL=StudyController.js.map