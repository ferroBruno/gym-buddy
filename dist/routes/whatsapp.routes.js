"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWhatsAppRoutes = registerWhatsAppRoutes;
const whatsapp_parser_js_1 = require("../integrations/whatsapp/whatsapp.parser.js");
async function registerWhatsAppRoutes(app, dependencies) {
    app.get("/webhooks/whatsapp", async (request, reply) => {
        const mode = request.query["hub.mode"];
        const token = request.query["hub.verify_token"];
        const challenge = request.query["hub.challenge"];
        if (mode === "subscribe" && token === dependencies.verifyToken && challenge) {
            return reply.type("text/plain").send(challenge);
        }
        request.log.warn({
            event: "whatsapp_webhook_verification_failed",
            mode
        });
        return reply.status(403).send({
            error: "webhook verification failed"
        });
    });
    app.post("/webhooks/whatsapp", async (request, reply) => {
        const messages = (0, whatsapp_parser_js_1.parseWhatsAppMessages)(request.body);
        if (messages.length === 0) {
            request.log.info({
                event: "whatsapp_webhook_ignored"
            });
            return reply.status(200).send({
                status: "ignored"
            });
        }
        for (const message of messages) {
            request.log.info({
                event: "whatsapp_message_received",
                messageId: message.messageId,
                from: message.from,
                type: message.type,
                phoneNumberId: message.phoneNumberId
            });
        }
        return reply.status(200).send({
            status: "received",
            messages: messages.length
        });
    });
}
//# sourceMappingURL=whatsapp.routes.js.map