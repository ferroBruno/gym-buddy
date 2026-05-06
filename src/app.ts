import Fastify, { type FastifyError, type FastifyInstance } from "fastify";

import type { AppConfig } from "./config/env.js";
import { registerHealthRoutes } from "./modules/health/health.routes.js";
import { SessionService } from "./modules/session/application/session-service.js";
import { MemorySessionStore } from "./modules/session/infra/memory-session-store.js";
import { RedisSessionStore } from "./modules/session/infra/redis-session-store.js";
import type { SessionStore } from "./modules/session/infra/session-store.js";
import { registerSessionRoutes } from "./modules/session/api/session.routes.js";
import { registerWhatsAppRoutes } from "./routes/whatsapp.routes.js";
import type { RawBodyRequest } from "./security/request-security.js";

export async function createApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    bodyLimit: 128 * 1024,
    logger: config.nodeEnv !== "test"
  });

  app.removeContentTypeParser("application/json");
  app.addContentTypeParser("application/json", { parseAs: "buffer" }, (request, body, done) => {
    const rawBody = Buffer.isBuffer(body) ? body : Buffer.from(body);
    (request as RawBodyRequest).rawBody = rawBody;

    try {
      const text = rawBody.toString("utf8");
      done(null, text ? JSON.parse(text) : {});
    } catch (error) {
      done(error as Error);
    }
  });

  app.setErrorHandler((error: FastifyError, request, reply) => {
    if (error.validation) {
      return reply.status(400).send({
        error: "invalid request"
      });
    }

    request.log.error(error);
    return reply.status(error.statusCode && error.statusCode < 500 ? error.statusCode : 500).send({
      error: error.statusCode && error.statusCode < 500 ? error.message : "internal server error"
    });
  });

  const sessionStore = createSessionStore(config);
  const sessionService = new SessionService(sessionStore);

  app.addHook("onClose", async () => {
    await sessionStore.close();
  });

  await registerHealthRoutes(app);
  await registerWhatsAppRoutes(app, {
    appSecret: config.whatsapp.appSecret,
    verifyToken: config.whatsapp.verifyToken
  });
  await registerSessionRoutes(app, {
    internalApiToken: config.internalApiToken,
    sessionService
  });

  return app;
}

function createSessionStore(config: AppConfig): SessionStore {
  if (config.sessionStoreMode === "redis") {
    if (!config.redisUrl) {
      throw new Error("REDIS_URL is required when SESSION_STORE_MODE=redis.");
    }

    return new RedisSessionStore(config.redisUrl, config.redisTtlSeconds);
  }

  return new MemorySessionStore();
}
