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
function parseSessionStoreMode(value) {
    if (!value || value === "memory") {
        return "memory";
    }
    if (value === "redis") {
        return "redis";
    }
    throw new Error("Invalid SESSION_STORE_MODE: expected \"memory\" or \"redis\".");
}
function loadConfig(env = process.env) {
    return {
        nodeEnv: env.NODE_ENV ?? "development",
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
            businessAccountId: env.WHATSAPP_BUSINESS_ACCOUNT_ID
        },
        sessionStoreMode: parseSessionStoreMode(env.SESSION_STORE_MODE),
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