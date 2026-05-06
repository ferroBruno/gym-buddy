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
const whatsapp_routes_js_1 = require("./routes/whatsapp.routes.js");
async function createApp(config) {
    const app = (0, fastify_1.default)({
        bodyLimit: 128 * 1024,
        logger: config.nodeEnv !== "test"
    });
    app.removeContentTypeParser("application/json");
    app.addContentTypeParser("application/json", { parseAs: "buffer" }, (request, body, done) => {
        const rawBody = Buffer.isBuffer(body) ? body : Buffer.from(body);
        request.rawBody = rawBody;
        try {
            const text = rawBody.toString("utf8");
            done(null, text ? JSON.parse(text) : {});
        }
        catch (error) {
            done(error);
        }
    });
    app.setErrorHandler((error, request, reply) => {
        if (error.validation) {
            return reply.status(400).send({
                error: "invalid request"
            });
        }
        request.log.error(error);
        return reply.status(error.statusCode && error.statusCode < 500 ? error.statusCode : 500).send({
            error: error.statusCode && error.statusCode < 500 ? error.message : "internal server error"
        });
    });
    const sessionStore = createSessionStore(config);
    const sessionService = new session_service_js_1.SessionService(sessionStore);
    app.addHook("onClose", async () => {
        await sessionStore.close();
    });
    await (0, health_routes_js_1.registerHealthRoutes)(app);
    await (0, whatsapp_routes_js_1.registerWhatsAppRoutes)(app, {
        appSecret: config.whatsapp.appSecret,
        verifyToken: config.whatsapp.verifyToken
    });
    await (0, session_routes_js_1.registerSessionRoutes)(app, {
        internalApiToken: config.internalApiToken,
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