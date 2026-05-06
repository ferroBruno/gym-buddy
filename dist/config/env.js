"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = loadConfig;
const DEFAULT_PORT = 3000;
const DEFAULT_REDIS_TTL_SECONDS = 1800;
const TEST_SECRET = "test-secret";
function requiredString(env, fieldName, options = {}) {
    const value = env[fieldName]?.trim();
    if (value) {
        return value;
    }
    if (options.allowTestDefault && env.NODE_ENV === "test") {
        return TEST_SECRET;
    }
    throw new Error(`Missing required environment variable: ${fieldName}.`);
}
function parseNumber(value, fallback, fieldName) {
    if (!value) {
        return fallback;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error(`Invalid ${fieldName}: expected a positive number.`);
    }
    return parsed;
}
function parseSessionStoreMode(value, nodeEnv) {
    if (!value || value === "memory") {
        if (nodeEnv === "production") {
            throw new Error("SESSION_STORE_MODE=redis is required in production.");
        }
        return "memory";
    }
    if (value === "redis") {
        return "redis";
    }
    throw new Error("Invalid SESSION_STORE_MODE: expected \"memory\" or \"redis\".");
}
function loadConfig(env = process.env) {
    const nodeEnv = env.NODE_ENV ?? "development";
    const sessionStoreMode = parseSessionStoreMode(env.SESSION_STORE_MODE, nodeEnv);
    if (nodeEnv === "production" && sessionStoreMode === "redis") {
        const redisUrl = env.REDIS_URL?.trim();
        if (!redisUrl) {
            throw new Error("REDIS_URL is required in production.");
        }
        if (!redisUrl.startsWith("rediss://")) {
            throw new Error("REDIS_URL must use rediss:// in production.");
        }
    }
    return {
        nodeEnv,
        port: parseNumber(env.PORT, DEFAULT_PORT, "PORT"),
        appBaseUrl: env.APP_BASE_URL ?? `http://localhost:${env.PORT ?? DEFAULT_PORT}`,
        whatsapp: {
            verifyToken: requiredString(env, "WHATSAPP_VERIFY_TOKEN", {
                allowTestDefault: true
            }),
            accessToken: requiredString(env, "WHATSAPP_ACCESS_TOKEN", {
                allowTestDefault: true
            }),
            phoneNumberId: requiredString(env, "WHATSAPP_PHONE_NUMBER_ID", {
                allowTestDefault: true
            }),
            appSecret: requiredString(env, "WHATSAPP_APP_SECRET", {
                allowTestDefault: true
            }),
            businessAccountId: env.WHATSAPP_BUSINESS_ACCOUNT_ID
        },
        internalApiToken: requiredString(env, "INTERNAL_API_TOKEN", {
            allowTestDefault: true
        }),
        sessionStoreMode,
        redisUrl: env.REDIS_URL,
        redisTtlSeconds: parseNumber(env.REDIS_TTL_SECONDS, DEFAULT_REDIS_TTL_SECONDS, "REDIS_TTL_SECONDS"),
        supabase: {
            url: env.SUPABASE_URL,
            projectRef: env.SUPABASE_PROJECT_REF,
            dbHost: env.SUPABASE_DB_HOST,
            dbPort: env.SUPABASE_DB_PORT ? parseNumber(env.SUPABASE_DB_PORT, 5432, "SUPABASE_DB_PORT") : undefined,
            dbName: env.SUPABASE_DB_NAME,
            dbUser: env.SUPABASE_DB_USER,
            dbPassword: env.SUPABASE_DB_PASSWORD,
            dbSslMode: env.SUPABASE_DB_SSLMODE,
            databaseUrl: env.SUPABASE_DATABASE_URL
        }
    };
}
//# sourceMappingURL=env.js.map