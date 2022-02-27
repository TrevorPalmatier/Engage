"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("./controller/UserController");
const StudyController_1 = require("./controller/StudyController");
const SlideController_1 = require("./controller/SlideController");
const BlockController_1 = require("./controller/BlockController");
const PromptController_1 = require("./controller/PromptController");
const EntryController_1 = require("./controller/EntryController");
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
        route: "/prompts",
        controller: PromptController_1.PromptController,
        action: "all",
    },
    {
        method: "get",
        route: "/prompts/:id",
        controller: PromptController_1.PromptController,
        action: "one",
    },
    {
        method: "post",
        route: "/prompts",
        controller: PromptController_1.PromptController,
        action: "save",
    },
    {
        method: "delete",
        route: "/prompts/:id",
        controller: PromptController_1.PromptController,
        action: "remove",
    },
];
//# sourceMappingURL=routes.js.map