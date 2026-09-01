/**
 * In-memory sliding-window rate limiter for the public lead endpoint.
 *
 * Deliberately not backed by Redis: the site runs as a single long-lived Node
 * process on shared hosting, so process memory is the right scope and adds no
 * infrastructure. It resets on restart, which is acceptable for spam control.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
/** Stop the map growing without bound on a long-running process. */
const MAX_TRACKED_KEYS = 10_000;

const hits = new Map<string, number[]>();

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the caller may retry — for the Retry-After header. */
  retryAfterSeconds: number;
}

export function checkRateLimit(key: string, now = Date.now()): RateLimitResult {
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = recent[0];
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) {
    for (const [k, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

/** Test seam — the limiter is module-level state shared across requests. */
export function resetRateLimit(): void {
  hits.clear();
}
