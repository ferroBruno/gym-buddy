export type WhatsAppClientConfig = {
    accessToken: string;
    phoneNumberId: string;
};
export declare class WhatsAppClient {
    private readonly config;
    constructor(config: WhatsAppClientConfig);
    sendTextMessage(to: string, text: string): Promise<void>;
}
