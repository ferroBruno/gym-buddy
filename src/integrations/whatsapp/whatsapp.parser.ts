type WhatsAppMessagePayload = {
  id?: string;
  from?: string;
  timestamp?: string;
  type?: string;
  text?: {
    body?: string;
  };
};

type WhatsAppWebhookPayload = {
  entry?: Array<{
    changes?: Array<{
      value?: {
        metadata?: {
          phone_number_id?: string;
        };
        messages?: WhatsAppMessagePayload[];
      };
    }>;
  }>;
};

export type NormalizedWhatsAppMessage = {
  messageId: string;
  from: string;
  timestamp: string;
  type: "text";
  text: string;
  phoneNumberId?: string;
};

export function parseWhatsAppMessages(payload: unknown): NormalizedWhatsAppMessage[] {
  const webhookPayload = payload as WhatsAppWebhookPayload;
  const entries = Array.isArray(webhookPayload.entry) ? webhookPayload.entry : [];
  const messages: NormalizedWhatsAppMessage[] = [];

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

function normalizeTextMessage(
  message: WhatsAppMessagePayload,
  phoneNumberId: string | undefined
): NormalizedWhatsAppMessage | null {
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
