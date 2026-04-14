import { randomUUID } from "node:crypto";

import type { Session, SessionStartResult } from "../domain/session.js";
import type { SessionStore } from "../infra/session-store.js";

const INTRODUCTION_MESSAGE = [
  "I am Gym Buddy, an AI guide for this workout session.",
  "This free version gives general, non-personalized workout guidance.",
  "It is not personalized coaching and it does not use progress from past sessions.",
  "Each session is independent, so there is no memory carried into a future workout.",
  "If you want to continue, tell me what you want from today's workout and we will start step by step."
].join(" ");

const NEXT_PROMPT =
  "What do you want from today's workout: a general warm-up, a quick full-body session, or help getting started?";

export class SessionService {
  constructor(private readonly sessionStore: SessionStore) {}

  async startSession(channelUserId: string): Promise<SessionStartResult> {
    const now = new Date().toISOString();
    const session: Session = {
      id: randomUUID(),
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

export const sessionCopy = {
  introductionMessage: INTRODUCTION_MESSAGE,
  nextPrompt: NEXT_PROMPT
};
