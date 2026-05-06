"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisSessionStore = void 0;
const redis_1 = require("redis");
class RedisSessionStore {
    ttlSeconds;
    client;
    constructor(redisUrl, ttlSeconds) {
        this.ttlSeconds = ttlSeconds;
        this.client = (0, redis_1.createClient)({
            url: redisUrl
        });
    }
    async connect() {
        if (!this.client.isOpen) {
            await this.client.connect();
        }
    }
    async create(session) {
        await this.connect();
        await this.client.set(this.buildKey(session.id), JSON.stringify(session), {
            EX: this.ttlSeconds
        });
    }
    async get(sessionId) {
        await this.connect();
        const payload = await this.client.get(this.buildKey(sessionId));
        if (!payload) {
            return null;
        }
        try {
            const parsed = JSON.parse(payload);
            return isSession(parsed) ? parsed : null;
        }
        catch {
            return null;
        }
    }
    async update(session) {
        await this.create(session);
    }
    async close() {
        if (this.client.isOpen) {
            await this.client.quit();
        }
    }
    buildKey(sessionId) {
        return `gym-buddy:session:${sessionId}`;
    }
}
exports.RedisSessionStore = RedisSessionStore;
function isSession(value) {
    if (!value || typeof value !== "object") {
        return false;
    }
    const session = value;
    return (typeof session.id === "string" &&
        typeof session.channelUserId === "string" &&
        typeof session.stage === "string" &&
        typeof session.startedAt === "string" &&
        typeof session.updatedAt === "string" &&
        typeof session.context === "object" &&
        session.context !== null);
}
//# sourceMappingURL=redis-session-store.js.map