import { UserController } from "./controller/UserController";
import { StudyController } from "./controller/StudyController";
import { SlideController } from "./controller/SlideController";
import { BlockController } from "./controller/BlockController";
import { EntryController } from "./controller/EntryController";
import { SlideMediaController } from "./controller/SlideMediaController";

export const Routes = [
	{
		method: "get",
		route: "/users",
		controller: UserController,
		action: "all",
	},
	{
		method: "get",
		route: "/users/:id",
		controller: UserController,
		action: "one",
	},
	{
		method: "get",
		route: "/users/studies/:id",
		controller: UserController,
		action: "studies",
	},
	{
		method: "post",
		route: "/users",
		controller: UserController,
		action: "save",
	},
	{
		method: "delete",
		route: "/users/:id",
		controller: UserController,
		action: "remove",
	},
	{
		method: "get",
		route: "/studies",
		controller: StudyController,
		action: "all",
	},
	{
		method: "get",
		route: "/studies/:id",
		controller: StudyController,
		action: "one",
	},
	{
		method: "get",
		route: "/studies/blocks/:id",
		controller: StudyController,
		action: "blocks",
	},
	{
		method: "post",
		route: "/studies",
		controller: StudyController,
		action: "save",
	},
	{
		method: "delete",
		route: "/studies/:id",
		controller: StudyController,
		action: "remove",
	},
	{
		method: "put",
		route: "/studies/:id",
		controller: StudyController,
		action: "update",
	},
	{
		method: "post",
		route: "/studies/addUser",
		controller: StudyController,
		action: "addUser",
	},
	{
		method: "get",
		route: "/slides",
		controller: SlideController,
		action: "all",
	},
	{
		method: "get",
		route: "/slides/:id",
		controller: SlideController,
		action: "one",
	},
	{
		method: "get",
		route: "/slides/media/:id",
		controller: SlideController,
		action: "media",
	},
	{
		method: "post",
		route: "/slides",
		controller: SlideController,
		action: "save",
	},
	{
		method: "delete",
		route: "/slides/:id",
		controller: SlideController,
		action: "remove",
	},
	{
		method: "put",
		route: "/slides/:id",
		controller: SlideController,
		action: "update",
	},
	{
		method: "get",
		route: "/blocks",
		controller: BlockController,
		action: "all",
	},
	{
		method: "get",
		route: "/blocks/:id",
		controller: BlockController,
		action: "one",
	},
	{
		method: "get",
		route: "/blocks/slides/:id",
		controller: BlockController,
		action: "slides",
	},
	{
		method: "get",
		route: "/blocks/entries/:id",
		controller: BlockController,
		action: "oneEntries",
	},
	{
		method: "post",
		route: "/blocks",
		controller: BlockController,
		action: "save",
	},
	{
		method: "delete",
		route: "/blocks/:id",
		controller: BlockController,
		action: "remove",
	},
	{
		method: "put",
		route: "/blocks/:id",
		controller: BlockController,
		action: "update",
	},
	{
		method: "get",
		route: "/entries",
		controller: EntryController,
		action: "all",
	},
	{
		method: "get",
		route: "/entries/:id",
		controller: EntryController,
		action: "one",
	},
	{
		method: "get",
		route: "/entries/user/:id",
		controller: EntryController,
		action: "allUser",
	},
	{
		method: "post",
		route: "/entries",
		controller: EntryController,
		action: "save",
	},
	{
		method: "delete",
		route: "/entries/:id",
		controller: EntryController,
		action: "remove",
	},
	{
		method: "get",
		route: "/slidemedia",
		controller: SlideMediaController,
		action: "all",
	},
	{
		method: "get",
		route: "/slidemedia/:id",
		controller: SlideMediaController,
		action: "one",
	},
	{
		method: "post",
		route: "/slidemedia",
		controller: SlideMediaController,
		action: "save",
	},
	{
		method: "delete",
		route: "/slidemedia/:id",
		controller: SlideMediaController,
		action: "remove",
	},
	{
		method: "put",
		route: "/slidemedia/:id",
		controller: SlideMediaController,
		action: "update",
	},
];
