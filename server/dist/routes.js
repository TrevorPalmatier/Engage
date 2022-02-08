"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./controller/UserController");
const StudyController_1 = require("./controller/StudyController");
exports.Routes = [{
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all"
    }, {
        method: "get",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "one"
    }, {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save"
    }, {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "remove"
    }, {
        method: "get",
        route: "/studies",
        controller: StudyController_1.StudyController,
        action: "all"
    }, {
        method: "get",
        route: "/studies/:id",
        controller: StudyController_1.StudyController,
        action: "one"
    }, {
        method: "post",
        route: "/studies",
        controller: StudyController_1.StudyController,
        action: "save"
    }, {
        method: "delete",
        route: "/studies/:id",
        controller: StudyController_1.StudyController,
        action: "remove"
    }];
//# sourceMappingURL=routes.js.map