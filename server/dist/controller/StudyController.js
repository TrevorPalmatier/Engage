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
exports.StudyController = void 0;
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
            const accessCode = request.body.code;
            const result = yield this.studyRepository
                .createQueryBuilder("study")
                .where("study.code = :code", { code: accessCode })
                .getOne();
            if (result === undefined)
                return { studyid: null, studyname: null };
            yield this.studyRepository
                .createQueryBuilder()
                .relation(Study_1.Study, "users")
                .of(result)
                .add(request.body.userid)
                .catch((err) => {
                // return { studyid: null, studyname: null };
            });
            return { studyid: result.id, studyname: result.title };
        });
    }
}
exports.StudyController = StudyController;
//# sourceMappingURL=StudyController.js.map