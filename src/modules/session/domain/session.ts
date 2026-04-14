export type SessionStage =
  | "collecting_goal"
  | "collecting_time"
  | "first_step_active"
  | "continuation_step_active";

export type SessionGoal = "warm_up" | "quick_full_body" | "get_moving";

export type SessionContext = {
  broadGoal?: SessionGoal;
  availableTimeMinutes?: number;
};

export type Session = {
  id: string;
  channelUserId: string;
  stage: SessionStage;
  context: SessionContext;
  startedAt: string;
  updatedAt: string;
};

export type SessionStartResult = {
  session: Session;
  message: string;
  nextPrompt: string;
};

export type SessionMessageResult = {
  session: Session;
  message: string;
  nextPrompt?: string;
};
