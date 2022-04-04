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
exports.EntryController = void 0;
const typeorm_1 = require("typeorm");
const Entry_1 = require("../entity/Entry");
class EntryController {
    constructor() {
        this.entryRepository = typeorm_1.getRepository(Entry_1.Entry);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.entryRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.entryRepository
                .createQueryBuilder("entry")
                .leftJoinAndSelect("entry.user", "user")
                .where("entry.id = :id", { id: request.params.id })
                .getOne();
            return yield result;
        });
    }
    allUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.entryRepository
                .createQueryBuilder("entry")
                .leftJoinAndSelect("entry.block", "block")
                .leftJoinAndSelect("entry.user", "user")
                .where("entry.userId = :id", { id: request.params.id })
                .getMany();
            const blocks = result.map((value) => {
                return value.block;
            });
            return blocks;
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request.body);
            // return { message: "you are a dumbo" };
            const entry = new Entry_1.Entry();
            const body = request.body;
            entry.user = body.userId;
            entry.block = body.blockId;
            entry.imageID = body.imageID;
            entry.text = body.text;
            return this.entryRepository.save(entry);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const entryToRemove = yield this.entryRepository.findOne(request.params.id);
            return yield this.entryRepository.remove(entryToRemove);
        });
    }
}
exports.EntryController = EntryController;
//# sourceMappingURL=EntryController.js.map