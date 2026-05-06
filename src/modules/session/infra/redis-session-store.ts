import { createClient, type RedisClientType } from "redis";

import type { Session } from "../domain/session.js";
import type { SessionStore } from "./session-store.js";

export class RedisSessionStore implements SessionStore {
  private readonly client: RedisClientType;

  constructor(
    redisUrl: string,
    private readonly ttlSeconds: number
  ) {
    this.client = createClient({
      url: redisUrl
    });
  }

  async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  async create(session: Session): Promise<void> {
    await this.connect();
    await this.client.set(this.buildKey(session.id), JSON.stringify(session), {
      EX: this.ttlSeconds
    });
  }

  async get(sessionId: string): Promise<Session | null> {
    await this.connect();
    const payload = await this.client.get(this.buildKey(sessionId));
    if (!payload) {
      return null;
    }

    try {
      const parsed = JSON.parse(payload) as unknown;
      return isSession(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  async update(session: Session): Promise<void> {
    await this.create(session);
  }

  async close(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

  private buildKey(sessionId: string): string {
    return `gym-buddy:session:${sessionId}`;
  }
}

function isSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<Session>;
  return (
    typeof session.id === "string" &&
    typeof session.channelUserId === "string" &&
    typeof session.stage === "string" &&
    typeof session.startedAt === "string" &&
    typeof session.updatedAt === "string" &&
    typeof session.context === "object" &&
    session.context !== null
  );
}
