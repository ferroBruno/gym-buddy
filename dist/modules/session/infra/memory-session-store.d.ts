import type { Session } from "../domain/session.js";
import type { SessionStore } from "./session-store.js";
export declare class MemorySessionStore implements SessionStore {
    private readonly sessions;
    create(session: Session): Promise<void>;
    get(sessionId: string): Promise<Session | null>;
    close(): Promise<void>;
}
