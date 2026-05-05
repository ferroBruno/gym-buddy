import type { RedisClientType } from "redis";

import type { ActiveSession } from "./session.types.js";

export const REDIS_SESSION_KEY_PREFIX = "gymbuddy:session";

export function buildSessionKey(phone: string): string {
  return `${REDIS_SESSION_KEY_PREFIX}:${phone}`;
}

export class SessionStore {
  constructor(
    private readonly redis: RedisClientType,
    private readonly ttlSeconds: number
  ) {}

  async createSession(session: ActiveSession): Promise<void> {
    await this.writeSession(session);
  }

  async getSession(phone: string): Promise<ActiveSession | null> {
    const payload = await this.redis.get(buildSessionKey(phone));
    return payload ? (JSON.parse(payload) as ActiveSession) : null;
  }

  async updateSession(phone: string, state: Record<string, unknown>): Promise<ActiveSession | null> {
    const currentSession = await this.getSession(phone);
    if (!currentSession) {
      return null;
    }

    const nextSession: ActiveSession = {
      ...currentSession,
      state,
      updatedAt: new Date().toISOString()
    };

    await this.writeSession(nextSession);
    return nextSession;
  }

  async expireSession(phone: string): Promise<ActiveSession | null> {
    const currentSession = await this.getSession(phone);
    if (!currentSession) {
      return null;
    }

    const expiredSession: ActiveSession = {
      ...currentSession,
      status: "expired",
      updatedAt: new Date().toISOString()
    };

    await this.writeSession(expiredSession);
    return expiredSession;
  }

  async finishSession(phone: string): Promise<void> {
    await this.redis.del(buildSessionKey(phone));
  }

  private async writeSession(session: ActiveSession): Promise<void> {
    await this.redis.set(buildSessionKey(session.phone), JSON.stringify(session), {
      EX: this.ttlSeconds
    });
  }
}
