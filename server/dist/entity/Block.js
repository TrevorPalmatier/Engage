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
const Study_1 = require("./Study");
const Entry_1 = require("./Entry");
const Slide_1 = require("./Slide");
let Block = class Block {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Block.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "imageID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "imgOrientation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "promptTitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Block.prototype, "promptText", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Study_1.Study, study => study.blocks, {
        onUpdate: 'CASCADE', onDelete: 'CASCADE', eager: true
    }),
    __metadata("design:type", Study_1.Study)
], Block.prototype, "study", void 0);
__decorate([
    typeorm_1.OneToMany(type => Slide_1.Slide, slide => slide.block, { cascade: true }),
    __metadata("design:type", Array)
], Block.prototype, "slides", void 0);
__decorate([
    typeorm_1.OneToMany(type => Entry_1.Entry, entry => entry.block),
    __metadata("design:type", Array)
], Block.prototype, "entries", void 0);
Block = __decorate([
    typeorm_1.Entity()
], Block);
exports.Block = Block;
//# sourceMappingURL=Block.js.map