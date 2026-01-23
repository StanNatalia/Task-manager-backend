"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_js_1 = require("server.js");
const initMongoDB_js_1 = require("./db/initMongoDB.js");
const bootstrap = async () => {
    await (0, initMongoDB_js_1.initMongoDB)();
    (0, server_js_1.startServer)();
};
bootstrap();
//# sourceMappingURL=index.js.map