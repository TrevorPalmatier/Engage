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
const User_1 = require("./User");
const Block_1 = require("./Block");
let Study = class Study {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Study.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Study.prototype, "code", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Number)
], Study.prototype, "timestamp", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Study.prototype, "imageID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Study.prototype, "title", void 0);
__decorate([
    typeorm_1.OneToMany(type => Block_1.Block, block => block.study, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Study.prototype, "blocks", void 0);
__decorate([
    typeorm_1.ManyToMany(type => User_1.User, user => user.studies, { onUpdate: "CASCADE", onDelete: "CASCADE" }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Study.prototype, "users", void 0);
Study = __decorate([
    typeorm_1.Entity()
], Study);
exports.Study = Study;
//# sourceMappingURL=Study.js.map