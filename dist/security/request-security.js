"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TtlSet = exports.FixedWindowRateLimiter = void 0;
exports.verifyMetaSignature = verifyMetaSignature;
exports.maskIdentifier = maskIdentifier;
exports.requireInternalApiToken = requireInternalApiToken;
exports.rateLimitKey = rateLimitKey;
const node_crypto_1 = require("node:crypto");
const MAX_RATE_LIMIT_KEYS = 1_000;
class FixedWindowRateLimiter {
    maxRequests;
    windowMs;
    hits = new Map();
    constructor(maxRequests, windowMs) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
    }
    consume(key, now = Date.now()) {
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
    prune(now) {
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
exports.FixedWindowRateLimiter = FixedWindowRateLimiter;
class TtlSet {
    ttlMs;
    values = new Map();
    constructor(ttlMs) {
        this.ttlMs = ttlMs;
    }
    has(value, now = Date.now()) {
        const expiresAt = this.values.get(value);
        if (!expiresAt || expiresAt <= now) {
            this.values.delete(value);
            return false;
        }
        return true;
    }
    add(value, now = Date.now()) {
        this.prune(now);
        this.values.set(value, now + this.ttlMs);
    }
    prune(now) {
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
exports.TtlSet = TtlSet;
function verifyMetaSignature(rawBody, signature, appSecret) {
    if (!rawBody || !signature?.startsWith("sha256=")) {
        return false;
    }
    const expected = `sha256=${(0, node_crypto_1.createHmac)("sha256", appSecret).update(rawBody).digest("hex")}`;
    const received = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expected);
    if (received.length !== expectedBuffer.length) {
        return false;
    }
    return (0, node_crypto_1.timingSafeEqual)(received, expectedBuffer);
}
function maskIdentifier(value, secret) {
    return (0, node_crypto_1.createHmac)("sha256", secret).update(value).digest("hex").slice(0, 16);
}
function requireInternalApiToken(request, reply, expectedToken) {
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
function rateLimitKey(request, fallback = "unknown") {
    return request.ip || fallback;
}
function getHeaderValue(value) {
    return Array.isArray(value) ? value[0] : value;
}
function secureCompare(received, expected) {
    if (!received) {
        return false;
    }
    const receivedBuffer = Buffer.from(received);
    const expectedBuffer = Buffer.from(expected);
    if (receivedBuffer.length !== expectedBuffer.length) {
        return false;
    }
    return (0, node_crypto_1.timingSafeEqual)(receivedBuffer, expectedBuffer);
}
//# sourceMappingURL=request-security.js.map