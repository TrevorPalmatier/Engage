"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const joi_1 = __importDefault(require("joi"));
const typeorm_1 = require("typeorm");
const User_1 = require("../entity/User");
const signupSchema = joi_1.default
    .object({
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9_!@#$%*&^.,?><+=~(){}\\hjb[\\]]{8,50}$")),
    // repeatPassword: joi.ref('password'),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } }),
    repassword: joi_1.default.ref("password"),
})
    .with("password", "repassword");
const loginSchema = joi_1.default.object({
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9_!@#$%*&^.,?><+=~(){}\\hjb[\\]]{8,50}$")),
    // repeatPassword: joi.ref('password'),
    email: joi_1.default.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } }),
});
const signup = (req, res, next) => {
    const repo = typeorm_1.getConnection().getRepository(User_1.User);
    console.log(req.body);
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
                message: "Passwords need 8 or more characters and can only contain letters, numbers, and special characters ",
            });
        }
        else if (invalid === "string.empty") {
            return res.status(400).json({ message: "All fields must be filled" });
        }
        else if (invalid === "string.email") {
            return res.status(400).json({ message: "Please provide a valid email" });
        }
        else if (invalid === "any.only") {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        else {
            return res.status(400).json({ message: "An unknown error occured" });
        }
    }
    repo.findOne({
        where: {
            emailAddress: req.body.email,
        },
    })
        .then((dbUser) => {
        if (dbUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        else if (req.body.email && req.body.password) {
            // password hash
            bcryptjs_1.default.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({ message: "Couldn't hash the password" });
                }
                else if (passwordHash) {
                    return repo
                        .save({
                        emailAddress: req.body.email,
                        password: passwordHash,
                    })
                        .then(() => {
                        res.status(200).json({ message: "User created" });
                    })
                        .catch((err) => {
                        // tslint:disable-next-line:no-console
                        console.log(err);
                        res.status(502).json({ message: "Error while creating the user" });
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
    const repo = typeorm_1.getConnection().getRepository(User_1.User);
    console.log(req.body);
    // checks if email exists
    const inputValid = loginSchema.validate({
        password: req.body.password,
        email: req.body.email,
    });
    if (inputValid.error) {
        const invalid = inputValid.error.details[0].type;
        if (invalid === "string.empty") {
            return res.status(400).json({ message: "All fields must be filled" });
        }
        else {
            return res.status(400).json({ message: "Email or Password is incorrect" });
        }
    }
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
                    const user = {
                        id: dbUser.id,
                        email: dbUser.emailAddress,
                    };
                    res.status(200).json({ user, token });
                }
                else {
                    // password doesnt match
                    res.status(401).json({ message: "Email or Password is incorrect" });
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
//# sourceMappingURL=auth.js.map