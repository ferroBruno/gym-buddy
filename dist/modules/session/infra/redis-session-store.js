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
        return payload ? JSON.parse(payload) : null;
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
//# sourceMappingURL=redis-session-store.js.map