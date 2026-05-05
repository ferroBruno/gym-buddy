"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseWhatsAppMessages = parseWhatsAppMessages;
function parseWhatsAppMessages(payload) {
    const webhookPayload = payload;
    const entries = Array.isArray(webhookPayload.entry) ? webhookPayload.entry : [];
    const messages = [];
    for (const entry of entries) {
        const changes = Array.isArray(entry.changes) ? entry.changes : [];
        for (const change of changes) {
            const value = change.value;
            const rawMessages = Array.isArray(value?.messages) ? value.messages : [];
            for (const rawMessage of rawMessages) {
                const normalized = normalizeTextMessage(rawMessage, value?.metadata?.phone_number_id);
                if (normalized) {
                    messages.push(normalized);
                }
            }
        }
    }
    return messages;
}
function normalizeTextMessage(message, phoneNumberId) {
    if (message.type !== "text") {
        return null;
    }
    const messageId = message.id?.trim();
    const from = message.from?.trim();
    const text = message.text?.body?.trim();
    if (!messageId || !from || !text) {
        return null;
    }
    return {
        messageId,
        from,
        timestamp: message.timestamp ?? new Date().toISOString(),
        type: "text",
        text,
        phoneNumberId
    };
}
//# sourceMappingURL=whatsapp.parser.js.map