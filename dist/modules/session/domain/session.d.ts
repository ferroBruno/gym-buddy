export type SessionStage = "introduction" | "guided_session_ready";
export type Session = {
    id: string;
    channelUserId: string;
    stage: SessionStage;
    startedAt: string;
    updatedAt: string;
};
export type SessionStartResult = {
    session: Session;
    message: string;
    nextPrompt: string;
};
