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
            return this.entryRepository.findOne(request.params.id);
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.entryRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const entryToRemove = yield this.entryRepository.findOne(request.params.id);
            yield this.entryRepository.remove(entryToRemove);
        });
    }
}
exports.EntryController = EntryController;
//# sourceMappingURL=EntryController.js.map