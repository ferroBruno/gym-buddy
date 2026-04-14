import type { Session } from "../domain/session.js";
import type { SessionStore } from "./session-store.js";

export class MemorySessionStore implements SessionStore {
  private readonly sessions = new Map<string, Session>();

  async create(session: Session): Promise<void> {
    this.sessions.set(session.id, session);
  }

  async get(sessionId: string): Promise<Session | null> {
    return this.sessions.get(sessionId) ?? null;
  }

  async close(): Promise<void> {
    this.sessions.clear();
  }
}
