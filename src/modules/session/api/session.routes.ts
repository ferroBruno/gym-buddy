import type { FastifyInstance } from "fastify";

import { SessionService } from "../application/session-service.js";

type StartSessionBody = {
  channelUserId?: string;
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
}
