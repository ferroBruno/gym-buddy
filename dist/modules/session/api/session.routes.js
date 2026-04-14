"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSessionRoutes = registerSessionRoutes;
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
}
//# sourceMappingURL=session.routes.js.map