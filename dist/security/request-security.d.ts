import type { FastifyReply, FastifyRequest } from "fastify";
export type RawBodyRequest = FastifyRequest & {
    rawBody?: Buffer;
};
export declare class FixedWindowRateLimiter {
    private readonly maxRequests;
    private readonly windowMs;
    private readonly hits;
    constructor(maxRequests: number, windowMs: number);
    consume(key: string, now?: number): boolean;
    private prune;
}
export declare class TtlSet {
    private readonly ttlMs;
    private readonly values;
    constructor(ttlMs: number);
    has(value: string, now?: number): boolean;
    add(value: string, now?: number): void;
    private prune;
}
export declare function verifyMetaSignature(rawBody: Buffer | undefined, signature: string | undefined, appSecret: string): boolean;
export declare function maskIdentifier(value: string, secret: string): string;
export declare function requireInternalApiToken(request: FastifyRequest, reply: FastifyReply, expectedToken: string): boolean;
export declare function rateLimitKey(request: FastifyRequest, fallback?: string): string;
