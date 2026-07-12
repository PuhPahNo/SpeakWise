import { NextResponse } from 'next/server';

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

/**
 * Small single-process limiter for the current one-instance Render topology.
 * Keep the call-site contract stable so the storage can move to Redis when
 * the service scales horizontally.
 */
export function consumeRateLimit(
  scope: string,
  subject: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const key = `${scope}:${subject}`;
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }
  if (current.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }
  current.count += 1;
  if (buckets.size > 10_000) {
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimit(scope: string, subject: string) {
  buckets.delete(`${scope}:${subject}`);
}

export function getRequestIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || req.headers.get('x-real-ip') || 'unknown';
}

export function userRateLimitResponse(
  scope: string,
  userId: string,
  limit: number,
  windowMs: number,
): NextResponse | null {
  const result = consumeRateLimit(scope, userId, limit, windowMs);
  if (result.allowed) return null;
  return NextResponse.json(
    { error: 'too_many_requests' },
    { status: 429, headers: { 'Retry-After': String(result.retryAfterSeconds) } },
  );
}
