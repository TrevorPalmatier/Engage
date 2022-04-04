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
exports.SlideController = void 0;
const typeorm_1 = require("typeorm");
const Slide_1 = require("../entity/Slide");
class SlideController {
    constructor() {
        this.slideRepository = typeorm_1.getRepository(Slide_1.Slide);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.slideRepository
                .createQueryBuilder("slide")
                .orderBy('timestamp', "ASC")
                .getMany();
            return yield result;
        });
    }
    media(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(request.params.id, 10) === -1)
                return [];
            const result = this.slideRepository
                .createQueryBuilder("slide")
                .leftJoinAndSelect("slide.medias", "media")
                .where("slide.id = :id", { id: request.params.id })
                .getOne();
            return (yield result).medias;
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.slideRepository.createQueryBuilder("slide")
                .leftJoinAndSelect("slide.medias", "media")
                .where("slide.id = :id", { id: request.params.id })
                .orderBy("media.position")
                .getOne();
            return yield result;
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.slideRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const slideToRemove = yield this.slideRepository.findOne(request.params.id);
            return yield this.slideRepository.remove(slideToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.slideRepository.update(request.params.id, request.body);
            return yield this.slideRepository.findOne(request.params.id, { relations: ["medias"] });
        });
    }
}
exports.SlideController = SlideController;
//# sourceMappingURL=SlideController.js.map