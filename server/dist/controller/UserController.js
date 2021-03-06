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
exports.UserController = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
class UserController {
    constructor() {
        this.userRepository = typeorm_1.getRepository(User_1.User);
    }
    all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.find();
        });
    }
    one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOne(request.params.id, { relations: ["entries"] });
        });
    }
    studies(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = this.userRepository
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.studies", "study")
                .where("user.id = :id", { id: request.params.id })
                .getOne();
            return (yield result).studies;
        });
    }
    save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.save(request.body);
        });
    }
    remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToRemove = yield this.userRepository.findOne(request.params.id);
            yield this.userRepository.remove(userToRemove);
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map