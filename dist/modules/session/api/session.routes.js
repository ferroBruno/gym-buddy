"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSessionRoutes = registerSessionRoutes;
const session_service_js_1 = require("../application/session-service.js");
async function registerSessionRoutes(app, dependencies) {
    app.post("/session/start", async (request, reply) => {
        const channelUserId = request.body?.channelUserId?.trim();
        if (!channelUserId) {
            return reply.status(400).send({
                error: "channelUserId is required"
            });
        }
        const result = await dependencies.sessionService.startSession(channelUserId);
        return reply.status(201).send({
            sessionId: result.session.id,
            stage: result.session.stage,
            message: result.message,
            nextPrompt: result.nextPrompt
        });
    });
    app.post("/session/message", async (request, reply) => {
        const sessionId = request.body?.sessionId?.trim();
        const message = request.body?.message?.trim();
        if (!sessionId) {
            return reply.status(400).send({
                error: "sessionId is required"
            });
        }
        if (!message) {
            return reply.status(400).send({
                error: "message is required"
            });
        }
        try {
            const result = await dependencies.sessionService.handleMessage(sessionId, message);
            return reply.status(200).send({
                sessionId: result.session.id,
                stage: result.session.stage,
                context: result.session.context,
                message: result.message,
                nextPrompt: result.nextPrompt
            });
        }
        catch (error) {
            if (error instanceof session_service_js_1.SessionMessageError) {
                const statusCode = error.code === "session_not_found" ? 404 : 400;
                return reply.status(statusCode).send({
                    error: error.message
                });
            }
            throw error;
        }
    });
}
//# sourceMappingURL=session.routes.js.map