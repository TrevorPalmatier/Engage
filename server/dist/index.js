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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const routes_1 = require("./routes");
const User_1 = require("./entity/User");
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    // create express app
    const app = express_1.default();
    const port = 3000; // default port to listen
    app.use(bodyParser.json());
    // register express routes from defined application routes
    routes_1.Routes.forEach(route => {
        app[route.method](route.route, (req, res, next) => {
            const result = (new route.controller)[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    // setup express app here
    app.get("/", (req, res) => {
        res.send("hello world");
    });
    // start express server
    app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
        // insert new users for test
        yield connection.manager.save(connection.manager.create(User_1.User, {
            firstName: "Timber",
            lastName: "Saw",
            emailAddress: "timber.saw@gmail.com"
        }));
        yield connection.manager.save(connection.manager.create(User_1.User, {
            firstName: "Phantom",
            lastName: "Assassin",
            emailAddress: "phantom.Assassin@gmail.com"
        }));
        // tslint:disable-next-line:no-console
        console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");
    }));
    // tslint:disable-next-line:no-console
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map