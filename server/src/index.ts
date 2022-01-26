import "reflect-metadata";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { login, signup, isAuth } from "./auth/auth";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { User } from "./entity/User";

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		const port = 3000; // default port to listen
		app.use(cors());
		app.use(bodyParser.json());

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
				const result = new (route.controller as any)()[route.action](req, res, next);
				if (result instanceof Promise) {
					result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
				} else if (result !== null && result !== undefined) {
					res.json(result);
				}
			});
		});

		app.get("/", (req, res) => {
			res.send("hello world");
		});

		app.post("/login", login);

		app.post("/signup", signup);

		app.post("/private", isAuth);

		// start express server
		app.listen(port, async () => {
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
		});
		// tslint:disable-next-line:no-console
	})
	.catch();
