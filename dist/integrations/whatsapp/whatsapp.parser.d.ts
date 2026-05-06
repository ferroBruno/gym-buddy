export type NormalizedWhatsAppMessage = {
    messageId: string;
    from: string;
    timestamp: string;
    type: "text";
    text: string;
    phoneNumberId?: string;
};
export declare function parseWhatsAppMessages(payload: unknown): NormalizedWhatsAppMessage[];
