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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const body_parser_1 = __importDefault(require("body-parser"));
const auth_1 = require("./auth/auth");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
typeorm_1.createConnection()
    .then((connection) => __awaiter(this, void 0, void 0, function* () {
    // create express app
    const app = express_1.default();
    const port = 3000; // default port to listen
    app.use(cors_1.default());
    app.use(body_parser_1.default.json());
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
    app.post("/signup", auth_1.signup);
    app.post("/private", auth_1.isAuth);
    // start express server
    app.listen(port, () => __awaiter(this, void 0, void 0, function* () {
        // insert new users for test
        // await connection.manager.save(
        // 	connection.manager.create(User, {
        // 		firstName: "Timber",
        // 		lastName: "Saw",
        // 		emailAddress: "timber.saw@gmail.com",
        // 		password: "orange",
        // 	})
        // );
        // await connection.manager.save(
        // 	connection.manager.create(User, {
        // 		firstName: "Phantom",
        // 		lastName: "Assassin",
        // 		emailAddress: "phantom.Assassin@gmail.com",
        // 		password: "cheese",
        // 	})
        // );
        // tslint:disable-next-line:no-console
        console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");
    }));
    // tslint:disable-next-line:no-console
}))
    .catch();
const getOptions = () => __awaiter(this, void 0, void 0, function* () {
    let connectionOptions;
    connectionOptions = {
        type: 'postgres',
        synchronize: false,
        logging: false,
        extra: {
            ssl: {
                rejectedUnautorized: false,
            },
        },
        entities: ['dist/entity/**/*.js'],
        migrations: ["dist/migration/**/*.js"],
        subscribers: ["dist/subscriber/**/*.js"],
        cli: {
            entitiesDir: "src/entity",
            migrationsDir: "src/migration",
            subscribersDir: "src/subscriber"
        }
    };
    if (process.env.DATABASE_URL) {
        Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
    }
    else {
        // gets your default configuration
        // you could get a specific config by name getConnectionOptions('production')
        // or getConnectionOptions(process.env.NODE_ENV)
        connectionOptions = yield typeorm_1.getConnectionOptions();
    }
    return connectionOptions;
});
const connect2Database = () => __awaiter(this, void 0, void 0, function* () {
    const typeormconfig = yield getOptions();
    yield typeorm_1.createConnection(typeormconfig);
});
connect2Database().then(() => __awaiter(this, void 0, void 0, function* () {
    console.log('Connected to database');
}));
//# sourceMappingURL=index.js.map