import type { RedisClientType } from "redis";
import type { ActiveSession } from "./session.types.js";
export declare const REDIS_SESSION_KEY_PREFIX = "gymbuddy:session";
export declare function buildSessionKey(phone: string): string;
export declare class SessionStore {
    private readonly redis;
    private readonly ttlSeconds;
    constructor(redis: RedisClientType, ttlSeconds: number);
    createSession(session: ActiveSession): Promise<void>;
    getSession(phone: string): Promise<ActiveSession | null>;
    updateSession(phone: string, state: Record<string, unknown>): Promise<ActiveSession | null>;
    expireSession(phone: string): Promise<ActiveSession | null>;
    finishSession(phone: string): Promise<void>;
    private writeSession;
}
