"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_js_1 = require("./app.js");
const env_js_1 = require("./config/env.js");
async function main() {
    const config = (0, env_js_1.loadConfig)();
    const app = await (0, app_js_1.createApp)(config);
    try {
        await app.listen({
            host: "0.0.0.0",
            port: config.port
        });
    }
    catch (error) {
        app.log.error(error);
        process.exitCode = 1;
    }
}
void main();
//# sourceMappingURL=server.js.map