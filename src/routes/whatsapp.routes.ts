import type { FastifyInstance } from "fastify";

import { parseWhatsAppMessages } from "../integrations/whatsapp/whatsapp.parser.js";
import {
  FixedWindowRateLimiter,
  maskIdentifier,
  rateLimitKey,
  type RawBodyRequest,
  TtlSet,
  verifyMetaSignature
} from "../security/request-security.js";

type WhatsAppVerifyQuery = {
  "hub.mode"?: string;
  "hub.verify_token"?: string;
  "hub.challenge"?: string;
};

export async function registerWhatsAppRoutes(
  app: FastifyInstance,
  dependencies: {
    appSecret: string;
    verifyToken: string;
  }
): Promise<void> {
  const webhookRateLimiter = new FixedWindowRateLimiter(60, 60_000);
  const processedMessageIds = new TtlSet(24 * 60 * 60 * 1000);

  app.get<{ Querystring: WhatsAppVerifyQuery }>(
    "/webhooks/whatsapp",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            "hub.mode": { type: "string", maxLength: 64 },
            "hub.verify_token": { type: "string", maxLength: 256 },
            "hub.challenge": { type: "string", maxLength: 512 }
          },
          additionalProperties: true
        }
      }
    },
    async (request, reply) => {
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
    }
  );

  app.post("/webhooks/whatsapp", async (request, reply) => {
    if (!webhookRateLimiter.consume(rateLimitKey(request))) {
      return reply.status(429).send({
        error: "rate limit exceeded"
      });
    }

    const signature = request.headers["x-hub-signature-256"];
    const rawBody = (request as RawBodyRequest).rawBody;
    if (!verifyMetaSignature(rawBody, Array.isArray(signature) ? signature[0] : signature, dependencies.appSecret)) {
      request.log.warn({
        event: "whatsapp_webhook_signature_failed"
      });

      return reply.status(401).send({
        error: "invalid webhook signature"
      });
    }

    const messages = parseWhatsAppMessages(request.body);

    if (messages.length === 0) {
      request.log.info({
        event: "whatsapp_webhook_ignored"
      });

      return reply.status(200).send({
        status: "ignored"
      });
    }

    let receivedMessages = 0;
    for (const message of messages) {
      if (processedMessageIds.has(message.messageId)) {
        request.log.info({
          event: "whatsapp_message_duplicate",
          messageId: message.messageId
        });
        continue;
      }

      processedMessageIds.add(message.messageId);
      receivedMessages += 1;

      request.log.info({
        event: "whatsapp_message_received",
        messageId: message.messageId,
        fromHash: maskIdentifier(message.from, dependencies.appSecret),
        type: message.type,
        phoneNumberId: message.phoneNumberId
      });
    }

    return reply.status(200).send({
      status: receivedMessages > 0 ? "received" : "duplicate",
      messages: receivedMessages
    });
  });
}
