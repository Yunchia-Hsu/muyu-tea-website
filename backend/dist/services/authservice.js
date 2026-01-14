"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let fakeUserId = 1;
const users = [];
const register = async (email, password, username) => {
    // business logic
    if (!email || !password || !username) {
        throw new Error("Email , username and password are required");
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    //hash password
    const hashedpassword = await bcrypt_1.default.hash(password, 10);
    try {
        const result = await db_1.pool.query(`INSERT INTO users (username, email, hashed_password)
    VALUES ($1, $2, $3)
    RETURNING id, username, email`, [username, email, hashedpassword]);
        //error check
        console.log("Saving user to DB:", {
            email,
            hashedpassword,
        });
        // users.push(userRecord); // for mock db
        return result.rows[0];
    }
    catch (error) {
        if (error?.code === "23505") {
            throw new Error("Email already in use");
        }
        throw error;
    }
};
exports.register = register;
//login 驗證身分，發 token
const login = async (email, password) => {
    // find user in the data base by email
    const matchUser = await db_1.pool.query(`SELECT id, email, username, hashed_password FROM users 
    WHERE email =$1`, [email]);
    if (matchUser.rows.length === 0) {
        throw new Error("Invalid email or password");
    }
    //bcrypt compare
    const isPasswordValid = await bcrypt_1.default.compare(password, matchUser.rows[0].hashed_password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    //generate JWT
    const token = jsonwebtoken_1.default.sign({
        userId: matchUser.rows[0].id,
        email: matchUser.rows[0].email,
    }, process.env.JWT_SECRET || "supersecretkey", {
        expiresIn: "100h",
    });
    //return token user
    return {
        token,
        user: {
            id: matchUser.rows[0].id,
            email: matchUser.rows[0].email,
            username: matchUser.rows[0].username,
        },
    };
};
exports.login = login;
