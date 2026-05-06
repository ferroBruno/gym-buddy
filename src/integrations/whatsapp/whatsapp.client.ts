export type WhatsAppClientConfig = {
  accessToken: string;
  phoneNumberId: string;
};

export class WhatsAppClient {
  constructor(private readonly config: WhatsAppClientConfig) {}

  async sendTextMessage(to: string, text: string): Promise<void> {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${this.config.phoneNumberId}/messages`,
      {
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
      }
    );

    if (!response.ok) {
      throw new Error(`WhatsApp send failed with status ${response.status}.`);
    }
  }
}
