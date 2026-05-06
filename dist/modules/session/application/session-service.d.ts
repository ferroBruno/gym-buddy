import type { SessionMessageResult, SessionStartResult } from "../domain/session.js";
import type { SessionStore } from "../infra/session-store.js";
type SessionMessageErrorCode = "session_not_found" | "invalid_message";
export declare class SessionMessageError extends Error {
    readonly code: SessionMessageErrorCode;
    constructor(code: SessionMessageErrorCode, message: string);
}
export declare class SessionService {
    private readonly sessionStore;
    constructor(sessionStore: SessionStore);
    startSession(channelUserId: string): Promise<SessionStartResult>;
    handleMessage(sessionId: string, message: string): Promise<SessionMessageResult>;
    private handleGoalMessage;
    private handleTimeMessage;
    private handleFirstStepFollowUp;
    private handleContinuationMessage;
    private updateSession;
}
export declare const sessionCopy: {
    introductionMessage: string;
    goalPrompt: string;
    timePrompt: string;
};
export {};
