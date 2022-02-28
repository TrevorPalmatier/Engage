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
const Slide_1 = require("./Slide");
let SlideMedia = class SlideMedia {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], SlideMedia.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SlideMedia.prototype, "mediaUrl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], SlideMedia.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Slide_1.Slide, slide => slide.medias, {
        onUpdate: 'CASCADE', onDelete: 'CASCADE'
    }),
    __metadata("design:type", Number)
], SlideMedia.prototype, "slide", void 0);
SlideMedia = __decorate([
    typeorm_1.Entity()
], SlideMedia);
exports.SlideMedia = SlideMedia;
//# sourceMappingURL=SlideMedia.js.map