import type { FastifyInstance } from "fastify";

import { SessionMessageError, SessionService } from "../application/session-service.js";
import {
  FixedWindowRateLimiter,
  rateLimitKey,
  requireInternalApiToken
} from "../../../security/request-security.js";

type StartSessionBody = {
  channelUserId?: string;
};

type SessionMessageBody = {
  sessionId?: string;
  message?: string;
};

export async function registerSessionRoutes(
  app: FastifyInstance,
  dependencies: {
    internalApiToken: string;
    sessionService: SessionService;
  }
): Promise<void> {
  const sessionRateLimiter = new FixedWindowRateLimiter(30, 60_000);

  app.addHook("preHandler", async (request, reply) => {
    if (!request.url.startsWith("/session/")) {
      return;
    }

    if (!sessionRateLimiter.consume(rateLimitKey(request))) {
      return reply.status(429).send({
        error: "rate limit exceeded"
      });
    }

    if (!requireInternalApiToken(request, reply, dependencies.internalApiToken)) {
      return reply;
    }
  });

  app.post<{ Body: StartSessionBody }>(
    "/session/start",
    {
      schema: {
        body: {
          type: "object",
          required: ["channelUserId"],
          properties: {
            channelUserId: { type: "string", minLength: 1, maxLength: 128 }
          },
          additionalProperties: false
        }
      }
    },
    async (request, reply) => {
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
    }
  );

  app.post<{ Body: SessionMessageBody }>(
    "/session/message",
    {
      schema: {
        body: {
          type: "object",
          required: ["sessionId", "message"],
          properties: {
            sessionId: { type: "string", minLength: 1, maxLength: 64 },
            message: { type: "string", minLength: 1, maxLength: 1_000 }
          },
          additionalProperties: false
        }
      }
    },
    async (request, reply) => {
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
          message: result.message,
          nextPrompt: result.nextPrompt
        });
      } catch (error) {
        if (error instanceof SessionMessageError) {
          const statusCode = error.code === "session_not_found" ? 404 : 400;
          return reply.status(statusCode).send({
            error: error.message
          });
        }

        throw error;
      }
    }
  );
}
