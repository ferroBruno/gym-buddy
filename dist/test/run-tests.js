"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const app_js_1 = require("../app.js");
const env_js_1 = require("../config/env.js");
async function run(name, fn) {
    try {
        await fn();
        console.log(`PASS ${name}`);
    }
    catch (error) {
        console.error(`FAIL ${name}`);
        throw error;
    }
}
async function createTestApp() {
    return (0, app_js_1.createApp)((0, env_js_1.loadConfig)({
        NODE_ENV: "test",
        SESSION_STORE_MODE: "memory"
    }));
}
async function main() {
    await run("GET /health returns ok", async () => {
        const app = await createTestApp();
        const response = await app.inject({
            method: "GET",
            url: "/health"
        });
        strict_1.default.equal(response.statusCode, 200);
        strict_1.default.deepEqual(response.json(), {
            status: "ok"
        });
        await app.close();
    });
    await run("POST /session/start returns the opening session payload", async () => {
        const app = await createTestApp();
        const response = await app.inject({
            method: "POST",
            url: "/session/start",
            payload: {
                channelUserId: "whatsapp:+5511999999999"
            }
        });
        const body = response.json();
        strict_1.default.equal(response.statusCode, 201);
        strict_1.default.equal(typeof body.sessionId, "string");
        strict_1.default.equal(body.stage, "guided_session_ready");
        strict_1.default.match(body.message, /AI guide/i);
        strict_1.default.match(body.message, /general, non-personalized workout guidance/i);
        strict_1.default.match(body.message, /not personalized coaching/i);
        strict_1.default.match(body.message, /no memory carried into a future workout/i);
        strict_1.default.match(body.nextPrompt, /today's workout/i);
        await app.close();
    });
    await run("POST /session/start rejects requests without channelUserId", async () => {
        const app = await createTestApp();
        const response = await app.inject({
            method: "POST",
            url: "/session/start",
            payload: {}
        });
        strict_1.default.equal(response.statusCode, 400);
        strict_1.default.deepEqual(response.json(), {
            error: "channelUserId is required"
        });
        await app.close();
    });
}
void main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
//# sourceMappingURL=run-tests.js.map