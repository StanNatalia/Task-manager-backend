"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const boards_1 = __importDefault(require("./routes/boards"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger_1.default.info({ method: req.method, url: req.url }, "Incoming request");
    next();
});
app.use("/api/boards", boards_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map