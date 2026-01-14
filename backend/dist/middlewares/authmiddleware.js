"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    //1. 從 request 拿 token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    //2. 驗證 token 是不是真的
    const token = authHeader.split(" ")[1]; //delete Bearer
    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "supersecretkey");
        //3. 把使用者身分放進 req.user
        req.user = decoded; //typescript 不認識 user 屬性 as any 是一種「先跳過型別檢查」
        //4.決定要不要放行 request
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authMiddleware = authMiddleware;
