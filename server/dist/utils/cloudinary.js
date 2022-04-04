"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary2 = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary2 = cloudinary_1.default.v2;
exports.cloudinary2 = cloudinary2;
cloudinary2.config({
    cloud_name: 'engageapp',
    api_key: '883373832996248',
    api_secret: 'R0DGtSHL4J_S_5r_-p6ZiIiKSIE'
});
//# sourceMappingURL=cloudinary.js.map