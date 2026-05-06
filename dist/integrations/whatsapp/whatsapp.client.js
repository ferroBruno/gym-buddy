"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppClient = void 0;
class WhatsAppClient {
    config;
    constructor(config) {
        this.config = config;
    }
    async sendTextMessage(to, text) {
        const response = await fetch(`https://graph.facebook.com/v20.0/${this.config.phoneNumberId}/messages`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.config.accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: {
                    body: text
                }
            })
        });
        if (!response.ok) {
            throw new Error(`WhatsApp send failed with status ${response.status}.`);
        }
    }
}
exports.WhatsAppClient = WhatsAppClient;
//# sourceMappingURL=whatsapp.client.js.map