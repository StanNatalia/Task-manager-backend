"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = void 0;
require("dotenv/config");
const getEnvVar = (name, defaultValue) => {
    const value = process.env[name];
    if (value)
        return value;
    if (defaultValue)
        return defaultValue;
    throw new Error(`Cannot find process.env[${name}]`);
};
exports.getEnvVar = getEnvVar;
//# sourceMappingURL=getEnvVar.js.map