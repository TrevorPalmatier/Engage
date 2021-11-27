import "reflect-metadata";
import path from "path";
import {createConnection} from "typeorm";
import express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import {User} from "./entity/User";


createConnection().then(async connection => {

    // create express app
    const app = express();
    const port = 3000; // default port to listen
    app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here

    app.get( "/", (req, res ) => {
        res.send("hello world");
    });

    // start express server
    app.listen(port, async () => {

    // insert new users for test
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        emailAddress: "timber.saw@gmail.com"
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        emailAddress: "phantom.Assassin@gmail.com"
    })) ;
    // tslint:disable-next-line:no-console
    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results");
    });
    // tslint:disable-next-line:no-console
}).catch(error => console.log(error));
