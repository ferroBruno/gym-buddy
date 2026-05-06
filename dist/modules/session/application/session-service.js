"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionCopy = exports.SessionService = exports.SessionMessageError = void 0;
const node_crypto_1 = require("node:crypto");
const INTRODUCTION_MESSAGE = [
    "I am Gym Buddy, an AI guide for this workout session.",
    "This free version gives general, non-personalized workout guidance.",
    "It is not personalized coaching and it does not use progress from past sessions.",
    "Each session is independent, so there is no memory carried into a future workout.",
    "I will guide this session step by step using only what you tell me right now."
].join(" ");
const GOAL_PROMPT = "For today's session, what fits best: a warm-up, a quick full-body session, or just getting moving?";
const TIME_PROMPT = "How many minutes do you have for this session today?";
const TIME_RETRY_PROMPT = "Tell me your available time in minutes for this session, like 10, 20, or 30.";
const CONTINUATION_PROMPT = "Reply 'done' when you finish, or tell me if you need a shorter version for this session.";
class SessionMessageError extends Error {
    code;
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
exports.SessionMessageError = SessionMessageError;
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
            stage: "collecting_goal",
            context: {},
            startedAt: now,
            updatedAt: now
        };
        await this.sessionStore.create(session);
        return {
            session,
            message: INTRODUCTION_MESSAGE,
            nextPrompt: GOAL_PROMPT
        };
    }
    async handleMessage(sessionId, message) {
        const session = await this.sessionStore.get(sessionId);
        if (!session) {
            throw new SessionMessageError("session_not_found", "sessionId was not found");
        }
        const trimmedMessage = message.trim();
        if (!trimmedMessage) {
            throw new SessionMessageError("invalid_message", "message is required");
        }
        if (session.stage === "collecting_goal") {
            return this.handleGoalMessage(session, trimmedMessage);
        }
        if (session.stage === "collecting_time") {
            return this.handleTimeMessage(session, trimmedMessage);
        }
        if (session.stage === "first_step_active") {
            return this.handleFirstStepFollowUp(session, trimmedMessage);
        }
        return this.handleContinuationMessage(session);
    }
    async handleGoalMessage(session, message) {
        const nextSession = this.updateSession(session, {
            stage: "collecting_time",
            context: {
                ...session.context,
                broadGoal: inferGoal(message)
            }
        });
        await this.sessionStore.update(nextSession);
        return {
            session: nextSession,
            message: buildGoalAcknowledgement(nextSession.context.broadGoal),
            nextPrompt: TIME_PROMPT
        };
    }
    async handleTimeMessage(session, message) {
        const availableTimeMinutes = parseAvailableTimeMinutes(message);
        if (!availableTimeMinutes) {
            return {
                session,
                message: "I still need the time for this session before I can start the guided workout.",
                nextPrompt: TIME_RETRY_PROMPT
            };
        }
        const nextSession = this.updateSession(session, {
            stage: "first_step_active",
            context: {
                ...session.context,
                availableTimeMinutes
            }
        });
        await this.sessionStore.update(nextSession);
        return {
            session: nextSession,
            message: buildFirstStepMessage(nextSession.context.broadGoal, availableTimeMinutes),
            nextPrompt: CONTINUATION_PROMPT
        };
    }
    async handleFirstStepFollowUp(session, message) {
        if (!isCompletionMessage(message)) {
            return {
                session,
                message: "Stay with step 1 for now. When you finish it, reply 'done' and I will move you forward.",
                nextPrompt: CONTINUATION_PROMPT
            };
        }
        const nextSession = this.updateSession(session, {
            stage: "continuation_step_active"
        });
        await this.sessionStore.update(nextSession);
        return {
            session: nextSession,
            message: buildContinuationStepMessage(nextSession.context.broadGoal, nextSession.context.availableTimeMinutes ?? 10),
            nextPrompt: "Reply 'done' when you finish step 2."
        };
    }
    async handleContinuationMessage(session) {
        return {
            session,
            message: "This slice stops after proving the next guided step. The session is still using only today's context, and deeper progression comes in the next implementation slice.",
            nextPrompt: "Start a new session if you want to repeat the current guided flow."
        };
    }
    updateSession(session, updates) {
        return {
            ...session,
            ...updates,
            updatedAt: new Date().toISOString()
        };
    }
}
exports.SessionService = SessionService;
exports.sessionCopy = {
    introductionMessage: INTRODUCTION_MESSAGE,
    goalPrompt: GOAL_PROMPT,
    timePrompt: TIME_PROMPT
};
function inferGoal(message) {
    const normalized = message.toLowerCase();
    if (normalized.includes("warm")) {
        return "warm_up";
    }
    if (normalized.includes("full")) {
        return "quick_full_body";
    }
    return "get_moving";
}
function parseAvailableTimeMinutes(message) {
    const match = message.match(/\d{1,3}/);
    if (!match) {
        return null;
    }
    const minutes = Number.parseInt(match[0], 10);
    if (!Number.isFinite(minutes) || minutes <= 0) {
        return null;
    }
    return minutes;
}
function isCompletionMessage(message) {
    const normalized = message.toLowerCase();
    return ["done", "completed", "finished", "ok", "ready"].some((value) => normalized.includes(value));
}
function buildGoalAcknowledgement(goal) {
    if (goal === "warm_up") {
        return "Good. I will keep this session focused on getting you warm and moving.";
    }
    if (goal === "quick_full_body") {
        return "Good. I will keep this session focused on a quick full-body effort.";
    }
    return "Good. I will keep this session focused on getting you moving without overcomplicating it.";
}
function buildFirstStepMessage(goal, availableTimeMinutes) {
    const shortSession = availableTimeMinutes <= 15;
    if (goal === "warm_up") {
        return shortSession
            ? "Step 1: Do 2 minutes of easy marching in place, shoulder rolls, and hip circles. Keep the pace light and continuous."
            : "Step 1: Do 4 minutes of easy marching in place, shoulder rolls, hip circles, and bodyweight good mornings. Keep the pace light and continuous.";
    }
    if (goal === "quick_full_body") {
        return shortSession
            ? "Step 1: Start with 2 minutes of brisk marching, arm swings, and 10 controlled bodyweight squats to wake up your full body."
            : "Step 1: Start with 4 minutes of brisk marching, arm swings, 10 controlled bodyweight squats, and 8 incline push-ups to wake up your full body.";
    }
    return shortSession
        ? "Step 1: Do 2 minutes of continuous movement: march in place, reach overhead, and alternate reverse lunges at an easy pace."
        : "Step 1: Do 4 minutes of continuous movement: march in place, reach overhead, alternate reverse lunges, and add light torso rotations.";
}
function buildContinuationStepMessage(goal, availableTimeMinutes) {
    const shortSession = availableTimeMinutes <= 15;
    if (goal === "warm_up") {
        return shortSession
            ? "Step 2: Do 2 rounds of 8 slow squats and 6 wall push-ups. Rest only long enough to keep moving."
            : "Step 2: Do 3 rounds of 8 slow squats and 6 wall push-ups. Rest only long enough to keep moving.";
    }
    if (goal === "quick_full_body") {
        return shortSession
            ? "Step 2: Do 2 rounds of 10 squats, 8 incline push-ups, and 20 seconds of plank."
            : "Step 2: Do 3 rounds of 10 squats, 8 incline push-ups, and 20 seconds of plank.";
    }
    return shortSession
        ? "Step 2: Do 2 rounds of 8 sit-to-stands, 20 seconds of marching fast, and 20 seconds of high reach holds."
        : "Step 2: Do 3 rounds of 8 sit-to-stands, 20 seconds of marching fast, and 20 seconds of high reach holds.";
}
//# sourceMappingURL=session-service.js.map