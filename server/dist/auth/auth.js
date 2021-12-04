"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const repo = typeorm_1.getConnection().getRepository(User_1.User);
const signup = (req, res, next) => {
    // checks if email already exists
    repo.findOne({
        where: {
            emailAddress: req.body.email,
        },
    })
        .then((dbUser) => {
        if (dbUser) {
            return res.status(409).json({ message: "email already exists" });
        }
        else if (req.body.email && req.body.password) {
            // password hash
            bcryptjs_1.default.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({ message: "couldnt hash the password" });
                }
                else if (passwordHash) {
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
                        .catch((err) => {
                        // tslint:disable-next-line:no-console
                        console.log(err);
                        res.status(502).json({ message: "error while creating the user" });
                    });
                }
            });
        }
        else if (!req.body.password) {
            return res.status(400).json({ message: "password not provided" });
        }
        else if (!req.body.email) {
            return res.status(400).json({ message: "email not provided" });
        }
    })
        .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log("error", err);
    });
};
exports.signup = signup;
const login = (req, res, next) => {
    // checks if email exists
    repo.findOne({
        where: {
            emailAddress: req.body.email,
        },
    })
        .then((dbUser) => {
        if (!dbUser) {
            return res.status(404).json({ message: "user not found" });
        }
        else {
            // password hash
            bcryptjs_1.default.compare(req.body.password, dbUser.password, (err, compareRes) => {
                if (err) {
                    // error while comparing
                    res.status(502).json({ message: "error while checking user password" });
                }
                else if (compareRes) {
                    // password match
                    const token = jsonwebtoken_1.default.sign({ email: req.body.email }, "secret", { expiresIn: "1h" });
                    res.status(200).json({ message: "user logged in", token });
                }
                else {
                    // password doesnt match
                    res.status(401).json({ message: "invalid credentials" });
                }
            });
        }
    })
        .catch((err) => {
        // tslint:disable-next-line:no-console
        console.log("error", err);
    });
};
exports.login = login;
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "not authenticated" });
    }
    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, "secret");
    }
    catch (err) {
        return res.status(500).json({ message: err.message || "could not decode the token" });
    }
    if (!decodedToken) {
        res.status(401).json({ message: "unauthorized" });
    }
    else {
        res.status(200).json({ message: "here is your resource" });
    }
};
exports.isAuth = isAuth;
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
//# sourceMappingURL=auth.js.map