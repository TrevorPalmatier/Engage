import "reflect-metadata";
import bodyParser from "body-parser";
import { login, signup, isAuth } from "./auth/auth";
import {cloudinary2} from './utils/cloudinary';
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import {  createConnection } from "typeorm";
import dotenv from "dotenv";
import { UploadStream } from "cloudinary";
dotenv.config();

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		// const port = 3000; // default port to listen
		app.use(
			cors({
				origin: "*",
			})
		);
		app.use(bodyParser.json({limit: '50mb'}));
		app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));


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


		app.post("/uploadimage", async (req, res, next) => {
			console.log(req.body);
			try{
				const fileStr = req.body.file;
				const uploadedResponse = await cloudinary2.uploader.
				upload(fileStr, {
					upload_preset: "engageapp",
				});
				console.log(uploadedResponse.type);
				res.json({publicId: uploadedResponse.public_id, imageURL: uploadedResponse.secure_url, type: uploadedResponse.type, version: uploadedResponse.version, height: uploadedResponse.height, width: uploadedResponse.width});
			}catch(error){
				res.status(500).json({err: "Could not upload" + req.body.file.toString()})
			}
		})

		app.post("/deleteimage", async (req, res, next) => {
			try{
				const public_id = req.body.public_id;
				const deleteResponse = await cloudinary2.uploader.
				destroy(public_id);
				res.json({msg: "deleted the image"});
			}catch(error){
				res.status(500).json({err: "Could not delete"})
			}
		})

		app.get("/getimageurl/:publicid", async (req, res, next) => {
			try{
				const public_id = req.body.publicid;
				const getResponse = await cloudinary2.api.resource(public_id);
				return await getResponse;
			}catch(error) {
				res.status(500).json({error: "could not get the photo"})
			}
		})

		// start express server
		app.listen(process.env.PORT || 80, async () => {

			// tslint:disable-next-line:no-console
			console.log("Express server on https://ancient-ridge-25388.herokuapp.com/");
		});

	})
	.catch();
