"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const boards_routes_1 = __importDefault(require("./routes/boards.routes"));
const tasks_routers_1 = __importDefault(require("./routes/tasks.routers"));
const logger_1 = __importDefault(require("./utils/logger"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    logger_1.default.info({ method: req.method, url: req.url }, "Incoming request");
    next();
});
mongoose_1.default.set("autoIndex", false);
app.use("/api/boards", boards_routes_1.default);
app.use("/api/boards/:boardId/tasks", tasks_routers_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map