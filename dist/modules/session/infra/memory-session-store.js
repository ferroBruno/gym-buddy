"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorySessionStore = void 0;
class MemorySessionStore {
    sessions = new Map();
    async create(session) {
        this.sessions.set(session.id, session);
    }
    async get(sessionId) {
        return this.sessions.get(sessionId) ?? null;
    }
    async close() {
        this.sessions.clear();
    }
}
exports.MemorySessionStore = MemorySessionStore;
//# sourceMappingURL=memory-session-store.js.map