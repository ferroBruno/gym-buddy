import type { Session } from "../domain/session.js";

export interface SessionStore {
  create(session: Session): Promise<void>;
  get(sessionId: string): Promise<Session | null>;
  close(): Promise<void>;
}
