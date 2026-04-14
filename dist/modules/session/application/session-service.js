"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCopy = exports.SessionService = void 0;
const node_crypto_1 = require("node:crypto");
const INTRODUCTION_MESSAGE = [
    "I am Gym Buddy, an AI guide for this workout session.",
    "This free version gives general, non-personalized workout guidance.",
    "It is not personalized coaching and it does not use progress from past sessions.",
    "Each session is independent, so there is no memory carried into a future workout.",
    "If you want to continue, tell me what you want from today's workout and we will start step by step."
].join(" ");
const NEXT_PROMPT = "What do you want from today's workout: a general warm-up, a quick full-body session, or help getting started?";
class SessionService {
    sessionStore;
    constructor(sessionStore) {
        this.sessionStore = sessionStore;
    }
    async startSession(channelUserId) {
        const now = new Date().toISOString();
        const session = {
            id: (0, node_crypto_1.randomUUID)(),
            channelUserId,
            stage: "guided_session_ready",
            startedAt: now,
            updatedAt: now
        };
        await this.sessionStore.create(session);
        return {
            session,
            message: INTRODUCTION_MESSAGE,
            nextPrompt: NEXT_PROMPT
        };
    }
}
exports.SessionService = SessionService;
exports.sessionCopy = {
    introductionMessage: INTRODUCTION_MESSAGE,
    nextPrompt: NEXT_PROMPT
};
//# sourceMappingURL=session-service.js.map