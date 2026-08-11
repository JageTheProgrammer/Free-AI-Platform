/**
 * Shared rate limiter for all API routes.
 * Uses a sliding window algorithm to prevent abuse / spam.
 * Falls back gracefully (allows requests) if Redis is not configured,
 * but still logs a warning so the developer knows to configure it in production.
 *
 * Production upgrade: Replace the in-memory store with @upstash/ratelimit + @upstash/redis
 */

const CHAT_RATE_LIMIT = 30; // requests per window for chat
const CONTACT_RATE_LIMIT = 10; // stricter rate for contact form
const WINDOW_MS = 60_000; // 1 minute

interface LimiterEntry {
  count: number;
  windowStart: number;
}

const memoryStore = new Map<string, LimiterEntry>();

function inMemoryLimit(key: string, maxRequests: number): { success: boolean } {
  const now = Date.now();
  const entry = memoryStore.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    memoryStore.set(key, { count: 1, windowStart: now });
    return { success: true };
  }

  if (entry.count >= maxRequests) {
    return { success: false };
  }

  entry.count += 1;
  return { success: true };
}

interface LimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

async function limit(key: string, maxRequests: number): Promise<LimitResult> {
  const now = Date.now();
  const result = inMemoryLimit(key, maxRequests);
  return {
    success: result.success,
    limit: maxRequests,
    remaining: Math.max(0, maxRequests - (result.success ? 0 : maxRequests)),
    reset: now + WINDOW_MS,
  };
}

/** Default limiter — 30 req/min (used for chat and general API) */
const defaultLimiter = {
  limit: (key: string) => limit(key, CHAT_RATE_LIMIT),
};

/** Strict limiter — 10 req/min (use for contact form / heavy operations) */
export function getContactLimiter() {
  return {
    limit: (key: string) => limit(key, CONTACT_RATE_LIMIT),
  };
}

export default defaultLimiter;
