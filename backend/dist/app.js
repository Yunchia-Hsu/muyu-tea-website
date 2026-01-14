"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./swagger");
const express_1 = __importDefault(require("express"));
const authroutes_1 = __importDefault(require("./routes/authroutes"));
const courseroutes_1 = __importDefault(require("./routes/courseroutes"));
const errormiddleware_1 = require("./middlewares/errormiddleware");
const app = (0, express_1.default)();
app.use("/api-doc", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerSpec));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use("/api/auth", authroutes_1.default);
app.use("/api/courses", courseroutes_1.default);
//?? 健康檢查路由
app.get("/health/db", async (req, res, next) => {
    try {
        const result = await db_1.pool.query("SELECT 1 AS ok");
        res.json({ ok: result.rows[0].ok === 1 });
    }
    catch (err) {
        next(err);
    }
});
// 🔴 一定要在所有 routes 後面
app.use(errormiddleware_1.errorHandler);
exports.default = app;
