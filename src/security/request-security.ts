import { createHmac, timingSafeEqual } from "node:crypto";

import type { FastifyReply, FastifyRequest } from "fastify";

const MAX_RATE_LIMIT_KEYS = 1_000;

export type RawBodyRequest = FastifyRequest & {
  rawBody?: Buffer;
};

export class FixedWindowRateLimiter {
  private readonly hits = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number
  ) {}

  consume(key: string, now = Date.now()): boolean {
    const current = this.hits.get(key);
    if (!current || current.resetAt <= now) {
      this.prune(now);
      this.hits.set(key, {
        count: 1,
        resetAt: now + this.windowMs
      });
      return true;
    }

    if (current.count >= this.maxRequests) {
      return false;
    }

    current.count += 1;
    return true;
  }

  private prune(now: number): void {
    if (this.hits.size < MAX_RATE_LIMIT_KEYS) {
      return;
    }

    for (const [key, value] of this.hits) {
      if (value.resetAt <= now) {
        this.hits.delete(key);
      }
    }
  }
}

export class TtlSet {
  private readonly values = new Map<string, number>();

  constructor(private readonly ttlMs: number) {}

  has(value: string, now = Date.now()): boolean {
    const expiresAt = this.values.get(value);
    if (!expiresAt || expiresAt <= now) {
      this.values.delete(value);
      return false;
    }

    return true;
  }

  add(value: string, now = Date.now()): void {
    this.prune(now);
    this.values.set(value, now + this.ttlMs);
  }

  private prune(now: number): void {
    if (this.values.size < MAX_RATE_LIMIT_KEYS) {
      return;
    }

    for (const [key, expiresAt] of this.values) {
      if (expiresAt <= now) {
        this.values.delete(key);
      }
    }
  }
}

export function verifyMetaSignature(rawBody: Buffer | undefined, signature: string | undefined, appSecret: string): boolean {
  if (!rawBody || !signature?.startsWith("sha256=")) {
    return false;
  }

  const expected = `sha256=${createHmac("sha256", appSecret).update(rawBody).digest("hex")}`;
  const received = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (received.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(received, expectedBuffer);
}

export function maskIdentifier(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex").slice(0, 16);
}

export function requireInternalApiToken(
  request: FastifyRequest,
  reply: FastifyReply,
  expectedToken: string
): boolean {
  const authorization = getHeaderValue(request.headers.authorization);
  const internalToken = getHeaderValue(request.headers["x-internal-api-token"]);
  const bearerToken = authorization?.startsWith("Bearer ") ? authorization.slice("Bearer ".length) : undefined;
  const providedToken = internalToken ?? bearerToken;

  if (!secureCompare(providedToken, expectedToken)) {
    reply.status(401).send({
      error: "unauthorized"
    });
    return false;
  }

  return true;
}

export function rateLimitKey(request: FastifyRequest, fallback = "unknown"): string {
  return request.ip || fallback;
}

function getHeaderValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function secureCompare(received: string | undefined, expected: string): boolean {
  if (!received) {
    return false;
  }

  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
