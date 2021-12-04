import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "typeorm";

import { UserController } from "../controller/UserController";
import { User } from "../entity/User";
const repo = getConnection().getRepository(User);

const signup = (req: Request, res: Response, next: NextFunction) => {
	// checks if email already exists

	repo.findOne({
		where: {
			emailAddress: req.body.email,
		},
	})
		.then((dbUser: User) => {
			if (dbUser) {
				return res.status(409).json({ message: "email already exists" });
			} else if (req.body.email && req.body.password) {
				// password hash
				bcrypt.hash(req.body.password, 12, (err: Error, passwordHash: any) => {
					if (err) {
						return res.status(500).json({ message: "couldnt hash the password" });
					} else if (passwordHash) {
						return repo
							.save({
								emailAddress: req.body.email,
								firstName: req.body.firstName,
								lastName: req.body.lastName,
								password: passwordHash,
							})
							.then(() => {
								res.status(200).json({ message: "user created" });
							})
							.catch((err: Error) => {
								// tslint:disable-next-line:no-console
								console.log(err);
								res.status(502).json({ message: "error while creating the user" });
							});
					}
				});
			} else if (!req.body.password) {
				return res.status(400).json({ message: "password not provided" });
			} else if (!req.body.email) {
				return res.status(400).json({ message: "email not provided" });
			}
		})
		.catch((err: Error) => {
			// tslint:disable-next-line:no-console
			console.log("error", err);
		});
};

const login = (req: Request, res: Response, next: NextFunction) => {
	// checks if email exists
	repo.findOne({
		where: {
			emailAddress: req.body.email,
		},
	})
		.then((dbUser: User) => {
			if (!dbUser) {
				return res.status(404).json({ message: "user not found" });
			} else {
				// password hash
				bcrypt.compare(req.body.password, dbUser.password, (err: Error, compareRes: Boolean) => {
					if (err) {
						// error while comparing
						res.status(502).json({ message: "error while checking user password" });
					} else if (compareRes) {
						// password match
						const token = jwt.sign({ email: req.body.email }, "secret", { expiresIn: "1h" });
						res.status(200).json({ message: "user logged in", token });
					} else {
						// password doesnt match
						res.status(401).json({ message: "invalid credentials" });
					}
				});
			}
		})
		.catch((err: Error) => {
			// tslint:disable-next-line:no-console
			console.log("error", err);
		});
};

const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		return res.status(401).json({ message: "not authenticated" });
	}
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "secret");
	} catch (err) {
		return res.status(500).json({ message: err.message || "could not decode the token" });
	}
	if (!decodedToken) {
		res.status(401).json({ message: "unauthorized" });
	} else {
		res.status(200).json({ message: "here is your resource" });
	}
};

export { signup, login, isAuth };

// export default (passport: PassportStatic) => {
// 	passport.serializeUser((user, done) => {
// 		done(null, user);
// 	});
// 	passport.deserializeUser((user, done) => {
// 		done(null, user);
// 	});
// 	passport.use(
// 		new GoogleStrategy(
// 			{
// 				clientID: "293066331831-69iro16m32tme7jcfqchiancv9habper.apps.googleusercontent.com",
// 				clientSecret: "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",
// 				callbackURL: "https://localhost:3000/auth/google/callback",
// 			},
// 			(token, refreshToken, profile, done) => {
// 				return done(null, {
// 					profile,
// 					token,
// 					refreshToken,
// 				});
// 			}
// 		)
// 	);
// };
