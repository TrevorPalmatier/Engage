"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const UserController_1 = require("./controller/UserController");
const StudyController_1 = require("./controller/StudyController");
const SlideController_1 = require("./controller/SlideController");
const BlockController_1 = require("./controller/BlockController");
const EntryController_1 = require("./controller/EntryController");
const SlideMediaController_1 = require("./controller/SlideMediaController");
exports.Routes = [
    {
        method: "get",
        route: "/users",
        controller: UserController_1.UserController,
        action: "all",
    },
    {
        method: "get",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "one",
    },
    {
        method: "get",
        route: "/users/studies/:id",
        controller: UserController_1.UserController,
        action: "studies",
    },
    {
        method: "post",
        route: "/users",
        controller: UserController_1.UserController,
        action: "save",
    },
    {
        method: "delete",
        route: "/users/:id",
        controller: UserController_1.UserController,
        action: "remove",
    },
    {
        method: "get",
        route: "/studies",
        controller: StudyController_1.StudyController,
        action: "all",
    },
    {
        method: "get",
        route: "/studies/:id",
        controller: StudyController_1.StudyController,
        action: "one",
    },
    {
        method: "get",
        route: "/studies/blocks/:id",
        controller: StudyController_1.StudyController,
        action: "blocks",
    },
    {
        method: "post",
        route: "/studies",
        controller: StudyController_1.StudyController,
        action: "save",
    },
    {
        method: "delete",
        route: "/studies/:id",
        controller: StudyController_1.StudyController,
        action: "remove",
    },
    {
        method: "put",
        route: "/studies/:id",
        controller: StudyController_1.StudyController,
        action: "update",
    },
    {
        method: "post",
        route: "/studies/addUser",
        controller: StudyController_1.StudyController,
        action: "addUser",
    },
    {
        method: "get",
        route: "/slides",
        controller: SlideController_1.SlideController,
        action: "all",
    },
    {
        method: "get",
        route: "/slides/:id",
        controller: SlideController_1.SlideController,
        action: "one",
    },
    {
        method: "get",
        route: "/slides/media/:id",
        controller: SlideController_1.SlideController,
        action: "media",
    },
    {
        method: "post",
        route: "/slides",
        controller: SlideController_1.SlideController,
        action: "save",
    },
    {
        method: "delete",
        route: "/slides/:id",
        controller: SlideController_1.SlideController,
        action: "remove",
    },
    {
        method: "put",
        route: "/slides/:id",
        controller: SlideController_1.SlideController,
        action: "update",
    },
    {
        method: "get",
        route: "/blocks",
        controller: BlockController_1.BlockController,
        action: "all",
    },
    {
        method: "get",
        route: "/blocks/:id",
        controller: BlockController_1.BlockController,
        action: "one",
    },
    {
        method: "get",
        route: "/blocks/slides/:id",
        controller: BlockController_1.BlockController,
        action: "slides",
    },
    {
        method: "get",
        route: "/blocks/entries/:id",
        controller: BlockController_1.BlockController,
        action: "oneEntries",
    },
    {
        method: "post",
        route: "/blocks",
        controller: BlockController_1.BlockController,
        action: "save",
    },
    {
        method: "delete",
        route: "/blocks/:id",
        controller: BlockController_1.BlockController,
        action: "remove",
    },
    {
        method: "put",
        route: "/blocks/:id",
        controller: BlockController_1.BlockController,
        action: "update",
    },
    {
        method: "get",
        route: "/entries",
        controller: EntryController_1.EntryController,
        action: "all",
    },
    {
        method: "get",
        route: "/entries/:id",
        controller: EntryController_1.EntryController,
        action: "one",
    },
    {
        method: "get",
        route: "/entries/user/:id",
        controller: EntryController_1.EntryController,
        action: "allUser",
    },
    {
        method: "post",
        route: "/entries",
        controller: EntryController_1.EntryController,
        action: "save",
    },
    {
        method: "delete",
        route: "/entries/:id",
        controller: EntryController_1.EntryController,
        action: "remove",
    },
    {
        method: "get",
        route: "/slidemedia",
        controller: SlideMediaController_1.SlideMediaController,
        action: "all",
    },
    {
        method: "get",
        route: "/slidemedia/:id",
        controller: SlideMediaController_1.SlideMediaController,
        action: "one",
    },
    {
        method: "post",
        route: "/slidemedia",
        controller: SlideMediaController_1.SlideMediaController,
        action: "save",
    },
    {
        method: "delete",
        route: "/slidemedia/:id",
        controller: SlideMediaController_1.SlideMediaController,
        action: "remove",
    },
    {
        method: "put",
        route: "/slidemedia/:id",
        controller: SlideMediaController_1.SlideMediaController,
        action: "update",
    },
];
//# sourceMappingURL=routes.js.map