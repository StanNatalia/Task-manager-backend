"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getEnvVar_1 = require("./utils/getEnvVar");
const app_1 = __importDefault(require("./app"));
const initMongoDB_1 = require("./db/initMongoDB");
const port = Number((0, getEnvVar_1.getEnvVar)("PORT", "3000"));
const startServer = () => {
    app_1.default.listen(port, () => {
        console.log(`🚀 Server started on port ${port}`);
    });
};
const bootstrap = async () => {
    try {
        await (0, initMongoDB_1.initMongoDB)();
        startServer();
    }
    catch (err) {
        console.error("❌ Failed to start server due to MongoDB error:", err.message);
        process.exit(1);
    }
};
bootstrap();
//# sourceMappingURL=server.js.map