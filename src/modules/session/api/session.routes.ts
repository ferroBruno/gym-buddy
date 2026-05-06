import type { FastifyInstance } from "fastify";

import { SessionMessageError, SessionService } from "../application/session-service.js";

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
    sessionService: SessionService;
  }
): Promise<void> {
  app.post<{ Body: StartSessionBody }>("/session/start", async (request, reply) => {
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

  app.post<{ Body: SessionMessageBody }>("/session/message", async (request, reply) => {
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
    } catch (error) {
      if (error instanceof SessionMessageError) {
        const statusCode = error.code === "session_not_found" ? 404 : 400;
        return reply.status(statusCode).send({
          error: error.message
        });
      }

      throw error;
    }
  });
}
