"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionStore = exports.REDIS_SESSION_KEY_PREFIX = void 0;
exports.buildSessionKey = buildSessionKey;
exports.REDIS_SESSION_KEY_PREFIX = "gymbuddy:session";
function buildSessionKey(phone) {
    return `${exports.REDIS_SESSION_KEY_PREFIX}:${phone}`;
}
class SessionStore {
    redis;
    ttlSeconds;
    constructor(redis, ttlSeconds) {
        this.redis = redis;
        this.ttlSeconds = ttlSeconds;
    }
    async createSession(session) {
        await this.writeSession(session);
    }
    async getSession(phone) {
        const payload = await this.redis.get(buildSessionKey(phone));
        return payload ? JSON.parse(payload) : null;
    }
    async updateSession(phone, state) {
        const currentSession = await this.getSession(phone);
        if (!currentSession) {
            return null;
        }
        const nextSession = {
            ...currentSession,
            state,
            updatedAt: new Date().toISOString()
        };
        await this.writeSession(nextSession);
        return nextSession;
    }
    async expireSession(phone) {
        const currentSession = await this.getSession(phone);
        if (!currentSession) {
            return null;
        }
        const expiredSession = {
            ...currentSession,
            status: "expired",
            updatedAt: new Date().toISOString()
        };
        await this.writeSession(expiredSession);
        return expiredSession;
    }
    async finishSession(phone) {
        await this.redis.del(buildSessionKey(phone));
    }
    async writeSession(session) {
        await this.redis.set(buildSessionKey(session.phone), JSON.stringify(session), {
            EX: this.ttlSeconds
        });
    }
}
exports.SessionStore = SessionStore;
//# sourceMappingURL=session.store.js.map