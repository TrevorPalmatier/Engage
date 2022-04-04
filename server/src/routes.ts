import { UserController } from "./controller/UserController";
import { StudyController } from "./controller/StudyController";
import { SlideController } from "./controller/SlideController";
import { BlockController } from "./controller/BlockController";
import { EntryController } from "./controller/EntryController";
import { SlideMediaController } from "./controller/SlideMediaController";
import { body  } from "express-validator";

export const Routes = [
	{
		method: "get",
		route: "/users",
		controller: UserController,
		action: "all",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/users/:id",
		controller: UserController,
		action: "one",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/users/studies/:id",
		controller: UserController,
		action: "studies",
		validation: new Array(),
	},
	{
		method: "post",
		route: "/users",
		controller: UserController,
		action: "save",
		validation: new Array(),
	},
	{
		method: "delete",
		route: "/users/:id",
		controller: UserController,
		action: "remove",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/studies",
		controller: StudyController,
		action: "all",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/studies/:id",
		controller: StudyController,
		action: "one",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/studies/blocks/:id",
		controller: StudyController,
		action: "blocks",
		validation: new Array(),
	},
	{
		method: "post",
		route: "/studies",
		controller: StudyController,
		action: "save",
		validation: new Array(),
	},
	{
		method: "delete",
		route: "/studies/:id",
		controller: StudyController,
		action: "remove",
		validation: new Array(),
	},
	{
		method: "put",
		route: "/studies/:id",
		controller: StudyController,
		action: "update",
		validation: new Array(),
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
		validation: new Array(),
	},
	{
		method: "get",
		route: "/slides/:id",
		controller: SlideController,
		action: "one",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/slides/media/:id",
		controller: SlideController,
		action: "media",
		validation: new Array(),
	},
	{
		method: "post",
		route: "/slides",
		controller: SlideController,
		action: "save",
		validation: new Array(),
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
		validation: new Array(),
	},
	{
		method: "get",
		route: "/blocks/:id",
		controller: BlockController,
		action: "one",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/blocks/slides/:id",
		controller: BlockController,
		action: "slides",
		validation: new Array(),
	},
	{
		method: "get",
		route: "/blocks/entries/:id",
		controller: BlockController,
		action: "oneEntries",
		validation: new Array(),
	},
	{
		method: "post",
		route: "/blocks",
		controller: BlockController,
		action: "save",
		validation: [
			body('title').isString().isLength({min: 1}).withMessage("Title is required"),
			body('promptTitle').isLength({min: 1}).withMessage("Prompt Title is required"),
			body('promptText').isLength({min: 1}).withMessage("Prompt is required"),
		],
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
		validation: new Array(),
	},
	{
		method: "get",
		route: "/entries/:id",
		controller: EntryController,
		action: "one",
		validation: new Array(),
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
		validation: new Array(),
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
