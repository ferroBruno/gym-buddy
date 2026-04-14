"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const fastify_1 = __importDefault(require("fastify"));
const health_routes_js_1 = require("./modules/health/health.routes.js");
const session_service_js_1 = require("./modules/session/application/session-service.js");
const memory_session_store_js_1 = require("./modules/session/infra/memory-session-store.js");
const redis_session_store_js_1 = require("./modules/session/infra/redis-session-store.js");
const session_routes_js_1 = require("./modules/session/api/session.routes.js");
async function createApp(config) {
    const app = (0, fastify_1.default)({
        logger: config.nodeEnv !== "test"
    });
    const sessionStore = createSessionStore(config);
    const sessionService = new session_service_js_1.SessionService(sessionStore);
    app.addHook("onClose", async () => {
        await sessionStore.close();
    });
    await (0, health_routes_js_1.registerHealthRoutes)(app);
    await (0, session_routes_js_1.registerSessionRoutes)(app, {
        sessionService
    });
    return app;
}
function createSessionStore(config) {
    if (config.sessionStoreMode === "redis") {
        if (!config.redisUrl) {
            throw new Error("REDIS_URL is required when SESSION_STORE_MODE=redis.");
        }
        return new redis_session_store_js_1.RedisSessionStore(config.redisUrl, config.redisTtlSeconds);
    }
    return new memory_session_store_js_1.MemorySessionStore();
}
//# sourceMappingURL=app.js.map