import { UserController } from "./controller/UserController";
import { StudyController } from "./controller/StudyController";
import { SlideController } from "./controller/SlideController";
import { BlockController } from "./controller/BlockController";
import { EntryController } from "./controller/EntryController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "get",
    route: "/studies",
    controller: StudyController,
    action: "all"
}, {
    method: "get",
    route: "/studies/:id",
    controller: StudyController,
    action: "one"
}, {
    method: "post",
    route: "/studies",
    controller: StudyController,
    action: "save"
}, {
    method: "delete",
    route: "/studies/:id",
    controller: StudyController,
    action: "remove"
},{
    method: "put",
    route: "/studies/:id",
    controller: StudyController,
    action: "update"
},
 {
    method: "get",
    route: "/slides",
    controller: SlideController,
    action: "all"
}, {
    method: "get",
    route: "/slides/:id",
    controller: SlideController,
    action: "one"
}, {
    method: "post",
    route: "/slides",
    controller: SlideController,
    action: "save"
}, {
    method: "delete",
    route: "/slides/:id",
    controller: SlideController,
    action: "remove"
}, {
    method: "get",
    route: "/blocks",
    controller: BlockController,
    action: "all"
}, {
    method: "get",
    route: "/blocks/:id",
    controller: BlockController,
    action: "one"
}, {
    method: "post",
    route: "/blocks",
    controller: BlockController,
    action: "save"
}, {
    method: "delete",
    route: "/blocks/:id",
    controller: BlockController,
    action: "remove"
}, {
    method: "get",
    route: "/entries",
    controller: EntryController,
    action: "all"
}, {
    method: "get",
    route: "/entries/:id",
    controller: EntryController,
    action: "one"
}, {
    method: "post",
    route: "/entries",
    controller: EntryController,
    action: "save"
}, {
    method: "delete",
    route: "/entries/:id",
    controller: EntryController,
    action: "remove"
}
];