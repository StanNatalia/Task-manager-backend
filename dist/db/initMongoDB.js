"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const getEnvVar_1 = require("../utils/getEnvVar");
const logger_1 = __importDefault(require("../utils/logger"));
const initMongoDB = async () => {
    try {
        const user = (0, getEnvVar_1.getEnvVar)("MONGODB_USER");
        const pwd = (0, getEnvVar_1.getEnvVar)("MONGODB_PASSWORD");
        const url = (0, getEnvVar_1.getEnvVar)("MONGODB_URL");
        const db = (0, getEnvVar_1.getEnvVar)("MONGODB_DB");
        logger_1.default.info({ user, url, db }, "Connecting to MongoDB...");
        await mongoose_1.default.connect(`mongodb+srv://${user}:${pwd}@${url}/${db}?appName=kamban`);
        logger_1.default.info(" MongoDB connected successfully!");
    }
    catch (e) {
        logger_1.default.error(e, " MongoDB connection error");
        throw e;
    }
};
exports.initMongoDB = initMongoDB;
//# sourceMappingURL=initMongoDB.js.map