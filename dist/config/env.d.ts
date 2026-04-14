export type SessionStoreMode = "memory" | "redis";
export type AppConfig = {
    nodeEnv: string;
    port: number;
    appBaseUrl: string;
    sessionStoreMode: SessionStoreMode;
    redisUrl?: string;
    redisTtlSeconds: number;
    supabase: {
        url?: string;
        projectRef?: string;
        dbHost?: string;
        dbPort?: number;
        dbName?: string;
        dbUser?: string;
        dbPassword?: string;
        dbSslMode?: string;
        databaseUrl?: string;
    };
};
export declare function loadConfig(env?: NodeJS.ProcessEnv): AppConfig;
