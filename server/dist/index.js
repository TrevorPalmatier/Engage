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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./auth/auth");
const cloudinary_1 = require("./utils/cloudinary");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// import { validationResult } from "express-validator";
dotenv_1.default.config();
function authCheck(req, res, next) {
    console.log(req.path);
    if (auth_1.isAuth(req, res, next) ||
        req.path === "/login" ||
        req.path === "/signup" ||
        req.path === "/login/admin" ||
        req.path === "/") {
        next();
    }
    else {
        res.status(403).json({ message: "unauthorized" });
    }
}
typeorm_1.createConnection()
    .then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    // create express app
    const app = express_1.default();
    // const port = 3000; // default port to listen
    app.use(cors_1.default({
        origin: "*",
    }));
    // app.use(authCheck);
    app.use(body_parser_1.default.json({ limit: "50mb" }));
    app.use(body_parser_1.default.urlencoded({ limit: "100mb", extended: true }));
    // register express routes from defined application routes
    routes_1.Routes.forEach((route) => {
        app[route.method](route.route, (req, res, next) => {
            const result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    app.get("/", (req, res) => {
        res.send("hello world");
    });
    app.post("/login", auth_1.login);
    app.post("/login/admin", auth_1.loginAdmin);
    app.post("/signup", auth_1.signup);
    app.get("/private", auth_1.isAuth);
    app.post("/uploadimage", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        try {
            const fileStr = req.body.file;
            const uploadedResponse = yield cloudinary_1.cloudinary2.uploader.upload(fileStr, {
                upload_preset: "engageapp",
            });
            console.log(uploadedResponse.type);
            res.json({
                publicId: uploadedResponse.public_id,
                imageURL: uploadedResponse.secure_url,
                type: uploadedResponse.type,
                version: uploadedResponse.version,
                height: uploadedResponse.height,
                width: uploadedResponse.width,
            });
        }
        catch (error) {
            res.status(500).json({ err: "Could not upload" + req.body.file.toString() });
        }
    }));
    app.post("/deleteimage", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const public_id = req.body.public_id;
            const deleteResponse = yield cloudinary_1.cloudinary2.uploader.destroy(public_id);
            res.json({ msg: "deleted the image" });
        }
        catch (error) {
            res.status(500).json({ err: "Could not delete" });
        }
    }));
    app.get("/getimageurl/:publicid", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const publicId = req.params.publicid;
            console.log(publicId);
            const getResponse = yield cloudinary_1.cloudinary2.api.resource(publicId);
            console.log("Found");
            res.json({ url: yield getResponse.secure_url });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "could not get the photo" });
        }
    }));
    // start express server
    app.listen(process.env.PORT || 80, () => __awaiter(void 0, void 0, void 0, function* () {
        // tslint:disable-next-line:no-console
        console.log("Express server on https://ancient-ridge-25388.herokuapp.com/");
    }));
}))
    .catch();
//# sourceMappingURL=index.js.map