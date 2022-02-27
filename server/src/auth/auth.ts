import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import joi from "joi";
import { getConnection } from "typeorm";
import { User } from "../entity/User";

const signupSchema = joi
	.object({
		password: joi.string().pattern(new RegExp("^[a-zA-Z0-9_!@#$%*&^.,?><+=~(){}\\hjb[\\]]{8,50}$")),
		// repeatPassword: joi.ref('password'),
		email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } }),
		repassword: joi.ref("password"),
	})
	.with("password", "repassword");

const loginSchema = joi.object({
	password: joi.string().pattern(new RegExp("^[a-zA-Z0-9_!@#$%*&^.,?><+=~(){}\\hjb[\\]]{8,50}$")),
	// repeatPassword: joi.ref('password'),
	email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } }),
});

const signup = (req: Request, res: Response, next: NextFunction) => {
	const repo = getConnection().getRepository(User);
	// checks if email already exists
	const inputValid = signupSchema.validate({
		password: req.body.password,
		email: req.body.email,
		repassword: req.body.repassword,
	});

	if (inputValid.error) {
		const invalid = inputValid.error.details[0].type;

		if (invalid === "string.pattern.base") {
			return res.status(400).json({
				message:
					"Passwords need 8 or more characters and can only contain letters, numbers, and special characters ",
			});
		} else if (invalid === "string.empty") {
			return res.status(400).json({ message: "All fields must be filled" });
		} else if (invalid === "string.email") {
			return res.status(400).json({ message: "Please provide a valid email" });
		} else if (invalid === "any.only") {
			return res.status(400).json({ message: "Passwords do not match" });
		} else {
			return res.status(400).json({ message: "An unknown error occured" });
		}
	}

	repo.findOne({
		where: {
			emailAddress: req.body.email,
		},
	})
		.then((dbUser: User) => {
			if (dbUser) {
				return res.status(409).json({ message: "Email already exists" });
			} else if (req.body.email && req.body.password) {
				// password hash
				bcrypt.hash(req.body.password, 12, (err: Error, passwordHash: any) => {
					if (err) {
						return res.status(500).json({ message: "Couldn't hash the password" });
					} else if (passwordHash) {
						return repo
							.save({
								emailAddress: req.body.email,
								password: passwordHash,
							})
							.then(() => {
								res.status(200).json({ message: "User created" });
							})
							.catch((err: Error) => {
								// tslint:disable-next-line:no-console
								console.log(err);
								res.status(502).json({ message: "Error while creating the user" });
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
	const repo = getConnection().getRepository(User);
	// checks if email exists
	const inputValid = loginSchema.validate({
		password: req.body.password,
		email: req.body.email,
	});

	if (inputValid.error) {
		const invalid = inputValid.error.details[0].type;
		if (invalid === "string.empty") {
			return res.status(400).json({ message: "All fields must be filled" });
		} else {
			return res.status(400).json({ message: "Email or Password is incorrect" });
		}
	}

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
						const user = {
							id: dbUser.id,
							email: dbUser.emailAddress,
						};
						res.status(200).json({ user, token });
					} else {
						// password doesnt match
						res.status(401).json({ message: "Email or Password is incorrect" });
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
