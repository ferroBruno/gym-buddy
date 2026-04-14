import Fastify, { type FastifyInstance } from "fastify";

import type { AppConfig } from "./config/env.js";
import { registerHealthRoutes } from "./modules/health/health.routes.js";
import { SessionService } from "./modules/session/application/session-service.js";
import { MemorySessionStore } from "./modules/session/infra/memory-session-store.js";
import { RedisSessionStore } from "./modules/session/infra/redis-session-store.js";
import type { SessionStore } from "./modules/session/infra/session-store.js";
import { registerSessionRoutes } from "./modules/session/api/session.routes.js";

export async function createApp(config: AppConfig): Promise<FastifyInstance> {
  const app = Fastify({
    logger: config.nodeEnv !== "test"
  });

  const sessionStore = createSessionStore(config);
  const sessionService = new SessionService(sessionStore);

  app.addHook("onClose", async () => {
    await sessionStore.close();
  });

  await registerHealthRoutes(app);
  await registerSessionRoutes(app, {
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
