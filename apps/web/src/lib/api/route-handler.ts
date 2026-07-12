import { ConflictError, ForbiddenError, NotFoundError } from '@/lib/api/errors';
import { UnauthenticatedError, getOrCreateUser } from '@/lib/auth/current-user';
import { logger } from '@/lib/observability/logger';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { AIError, AISchemaValidationError } from '@speakwise/ai';
import { NextResponse } from 'next/server';
import type { ZodTypeAny, z } from 'zod';

export { ConflictError, ForbiddenError, NotFoundError } from '@/lib/api/errors';

export interface AuthedContext {
  userId: string;
  user: Awaited<ReturnType<typeof getOrCreateUser>>;
}

export interface TutorContext extends AuthedContext {
  /** Role-narrowed: this user is guaranteed to be a tutor. */
  user: AuthedContext['user'] & { role: 'tutor' };
}

export interface AdminContext extends AuthedContext {
  /** Role-narrowed: this user is guaranteed to be an admin. */
  user: AuthedContext['user'] & { role: 'admin' };
}

function globalUserLimit(userId: string) {
  return userRateLimitResponse('authenticated-api', userId, 600, 15 * 60_000);
}

export async function withAuth<T>(
  handler: (ctx: AuthedContext) => Promise<T | Response>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const limited = globalUserLimit(user.id);
    if (limited) return limited;
    const result = await handler({ userId: user.id, user });
    if (result instanceof Response) return result as NextResponse;
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function withAuthAndJson<S extends ZodTypeAny, T>(
  schema: S,
  req: Request,
  handler: (ctx: AuthedContext, body: z.infer<S>) => Promise<T | Response>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const limited = globalUserLimit(user.id);
    if (limited) return limited;
    const json = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'invalid_request', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const result = await handler({ userId: user.id, user }, parsed.data);
    if (result instanceof Response) return result as NextResponse;
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

/**
 * Wrapper that requires the caller to be a tutor. Mirrors withAuth but
 * adds a role gate. Used by every /api/classroom/* route.
 */
export async function withTutorAuth<T>(
  handler: (ctx: TutorContext) => Promise<T | Response>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const limited = globalUserLimit(user.id);
    if (limited) return limited;
    if (user.role !== 'tutor') throw new ForbiddenError('Tutor access only');
    const result = await handler({
      userId: user.id,
      user: user as TutorContext['user'],
    });
    if (result instanceof Response) return result as NextResponse;
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function withTutorAuthAndJson<S extends ZodTypeAny, T>(
  schema: S,
  req: Request,
  handler: (ctx: TutorContext, body: z.infer<S>) => Promise<T | Response>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const limited = globalUserLimit(user.id);
    if (limited) return limited;
    if (user.role !== 'tutor') throw new ForbiddenError('Tutor access only');
    const json = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'invalid_request', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const result = await handler(
      { userId: user.id, user: user as TutorContext['user'] },
      parsed.data,
    );
    if (result instanceof Response) return result as NextResponse;
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

/**
 * Wrapper that requires the caller to be an admin. Mirrors withTutorAuth.
 * Used by every /api/admin/* route.
 */
export async function withAdminAuth<T>(
  handler: (ctx: AdminContext) => Promise<T | Response>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const limited = globalUserLimit(user.id);
    if (limited) return limited;
    if (user.role !== 'admin') throw new ForbiddenError('Admin access only');
    const result = await handler({ userId: user.id, user: user as AdminContext['user'] });
    if (result instanceof Response) return result as NextResponse;
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function withAdminAuthAndJson<S extends ZodTypeAny, T>(
  schema: S,
  req: Request,
  handler: (ctx: AdminContext, body: z.infer<S>) => Promise<T | Response>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const limited = globalUserLimit(user.id);
    if (limited) return limited;
    if (user.role !== 'admin') throw new ForbiddenError('Admin access only');
    const json = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'invalid_request', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const result = await handler(
      { userId: user.id, user: user as AdminContext['user'] },
      parsed.data,
    );
    if (result instanceof Response) return result as NextResponse;
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

function errorResponse(err: unknown) {
  if (err instanceof UnauthenticatedError) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  if (err instanceof ForbiddenError) {
    return NextResponse.json({ error: 'forbidden', message: err.message }, { status: 403 });
  }
  if (err instanceof NotFoundError) {
    return NextResponse.json({ error: 'not_found', message: err.message }, { status: 404 });
  }
  if (err instanceof ConflictError) {
    return NextResponse.json({ error: 'conflict', message: err.message }, { status: 409 });
  }
  if (err instanceof AISchemaValidationError) {
    logger.error('ai.schema_validation_failed', err, { purpose: err.purpose, issues: err.issues });
    if (process.env.NODE_ENV === 'development') {
      console.error('  raw:', err.raw.slice(0, 4000));
    }
    return NextResponse.json(
      { error: 'ai_output_invalid', message: 'Wise returned an invalid response. Please retry.' },
      { status: 502 },
    );
  }
  if (err instanceof AIError) {
    logger.error('ai.call_failed', err, { purpose: err.purpose });
    return NextResponse.json(
      { error: 'ai_failure', message: 'Wise is temporarily unavailable. Please retry.' },
      { status: 502 },
    );
  }
  logger.error('api.unhandled_error', err);
  return NextResponse.json(
    { error: 'internal', message: 'An unexpected error occurred.' },
    { status: 500 },
  );
}
