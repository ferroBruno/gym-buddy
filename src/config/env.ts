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

const DEFAULT_PORT = 3000;
const DEFAULT_REDIS_TTL_SECONDS = 1800;

function parseNumber(value: string | undefined, fallback: number, fieldName: string): number {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${fieldName}: expected a positive number.`);
  }

  return parsed;
}

function parseSessionStoreMode(value: string | undefined): SessionStoreMode {
  if (!value || value === "memory") {
    return "memory";
  }

  if (value === "redis") {
    return "redis";
  }

  throw new Error("Invalid SESSION_STORE_MODE: expected \"memory\" or \"redis\".");
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    nodeEnv: env.NODE_ENV ?? "development",
    port: parseNumber(env.PORT, DEFAULT_PORT, "PORT"),
    appBaseUrl: env.APP_BASE_URL ?? `http://localhost:${env.PORT ?? DEFAULT_PORT}`,
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
