"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Block_1 = require("./Block");
const Entry_1 = require("./Entry");
const PromptMedia_1 = require("./PromptMedia");
const User_1 = require("./User");
let Prompt = class Prompt {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Prompt.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Prompt.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Prompt.prototype, "backgroundText", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Block_1.Block, block => block.prompts),
    __metadata("design:type", Number)
], Prompt.prototype, "block", void 0);
__decorate([
    typeorm_1.OneToMany(type => PromptMedia_1.PromptMedia, promptmedia => promptmedia.prompt),
    __metadata("design:type", Array)
], Prompt.prototype, "media", void 0);
__decorate([
    typeorm_1.OneToMany(type => Entry_1.Entry, entry => entry.prompt),
    __metadata("design:type", Array)
], Prompt.prototype, "entries", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_1.User, user => user.prompts),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Prompt.prototype, "users", void 0);
Prompt = __decorate([
    typeorm_1.Entity()
], Prompt);
exports.Prompt = Prompt;
//# sourceMappingURL=Prompt.js.map