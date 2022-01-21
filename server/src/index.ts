import "reflect-metadata";
import bodyParser from "body-parser";
import { login, signup, isAuth } from "./auth/auth";
import { User } from "./entity/User";
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import { Routes } from "./routes";
import { getConnectionOptions, ConnectionOptions, createConnection} from "typeorm";
import dotenv from 'dotenv';
dotenv.config();

createConnection()
	.then(async (connection) => {
		// create express app
		const app = express();
		//const port = 3000; // default port to listen
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
		app.listen(process.env.PORT || 3000, async () => {
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


const getOptions = async () =>  {
    let connectionOptions: ConnectionOptions;
    connectionOptions = {
        type: 'postgres',
        synchronize: false,
        logging: false,
		migrationsRun: true,
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
      } else {
        // gets your default configuration
        // you could get a specific config by name getConnectionOptions('production')
        // or getConnectionOptions(process.env.NODE_ENV)
        connectionOptions = await getConnectionOptions();
      }

      return connectionOptions;
};

const connect2Database = async (): Promise<void> => {
    const typeormconfig = await getOptions();
    await createConnection(typeormconfig);
};

connect2Database().then(async () => {
    console.log('Connected to database');
});
