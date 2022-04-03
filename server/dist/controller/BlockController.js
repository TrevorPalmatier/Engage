"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Block_1 = require("../entity/Block");
const Slide_1 = require("../entity/Slide");
const joi_1 = __importDefault(require("joi"));
const saveBlockSchema = joi_1.default
    .object({
    title: joi_1.default.string().min(1).required(),
    imageID: joi_1.default.string().min(1).required(),
    promptTitle: joi_1.default.string().min(1),
    promtText: joi_1.default.string().min(1)
});
const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
};
class BlockController {
    constructor() {
        this.blockRepository = typeorm_1.getRepository(Block_1.Block);
        this.slideRepository = typeorm_1.getRepository(Slide_1.Slide);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockRepository.find({ order: { timestamp: "ASC" } });
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
            const slides = this.slideRepository
                .createQueryBuilder("slide")
                .where("slide.blockId = :blockid", { blockid: request.params.id })
                .orderBy('timestamp', "ASC")
                .getMany();
            const blockResult = yield this.blockRepository.findOne(request.params.id);
            const result = {
                slides: yield slides,
                id: blockResult.id,
                title: blockResult.title,
                promptTitle: blockResult.promptTitle,
                promptText: blockResult.promptText,
                timestamp: blockResult.timestamp,
                imageID: blockResult.imageID,
                study: blockResult.study
            };
            return yield result;
        });
    }
    oneEntries(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.blockRepository.findOne(request.params.id, { relations: ["entries"] });
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const invalid = saveBlockSchema.validate(request.body, options);
            if (invalid.error) {
                return {
                    status: 400,
                    message: "An error occured when creating this block."
                };
            }
            else {
                return this.blockRepository.save(request.body);
            }
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const blockToRemove = yield this.blockRepository.findOne(request.params.id);
            return yield this.blockRepository.remove(blockToRemove);
        });
    }
    update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.blockRepository.update(request.params.id, request.body);
            return yield this.blockRepository.findOne(request.params.id, { relations: ["slides"] });
        });
    }
}
exports.BlockController = BlockController;
//# sourceMappingURL=BlockController.js.map