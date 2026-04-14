import type { SessionStartResult } from "../domain/session.js";
import type { SessionStore } from "../infra/session-store.js";
export declare class SessionService {
    private readonly sessionStore;
    constructor(sessionStore: SessionStore);
    startSession(channelUserId: string): Promise<SessionStartResult>;
}
export declare const sessionCopy: {
    introductionMessage: string;
    nextPrompt: string;
};
