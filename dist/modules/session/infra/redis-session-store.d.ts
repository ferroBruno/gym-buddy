import type { Session } from "../domain/session.js";
import type { SessionStore } from "./session-store.js";
export declare class RedisSessionStore implements SessionStore {
    private readonly ttlSeconds;
    private readonly client;
    constructor(redisUrl: string, ttlSeconds: number);
    connect(): Promise<void>;
    create(session: Session): Promise<void>;
    get(sessionId: string): Promise<Session | null>;
    update(session: Session): Promise<void>;
    close(): Promise<void>;
    private buildKey;
}
