export type ActiveSessionStatus = "active" | "expired" | "finished";
export type ActiveSession = {
    phone: string;
    status: ActiveSessionStatus;
    state: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
};
