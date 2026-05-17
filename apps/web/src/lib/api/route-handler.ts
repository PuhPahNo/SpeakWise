import { UnauthenticatedError, getOrCreateUser } from '@/lib/auth/current-user';
import { AIError, AISchemaValidationError } from '@speakwise/ai';
import { NextResponse } from 'next/server';
import type { ZodTypeAny, z } from 'zod';

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export interface AuthedContext {
  userId: string;
  user: Awaited<ReturnType<typeof getOrCreateUser>>;
}

export interface TutorContext extends AuthedContext {
  /** Role-narrowed: this user is guaranteed to be a tutor. */
  user: AuthedContext['user'] & { role: 'tutor' };
}

export async function withAuth<T>(
  handler: (ctx: AuthedContext) => Promise<T>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const result = await handler({ userId: user.id, user });
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function withAuthAndJson<S extends ZodTypeAny, T>(
  schema: S,
  req: Request,
  handler: (ctx: AuthedContext, body: z.infer<S>) => Promise<T>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    const json = await req.json().catch(() => ({}));
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'invalid_request', issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const result = await handler({ userId: user.id, user }, parsed.data);
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
  handler: (ctx: TutorContext) => Promise<T>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
    if (user.role !== 'tutor') throw new ForbiddenError('Tutor access only');
    const result = await handler({
      userId: user.id,
      user: user as TutorContext['user'],
    });
    return NextResponse.json(result);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function withTutorAuthAndJson<S extends ZodTypeAny, T>(
  schema: S,
  req: Request,
  handler: (ctx: TutorContext, body: z.infer<S>) => Promise<T>,
): Promise<NextResponse> {
  try {
    const user = await getOrCreateUser();
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
  if (err instanceof AISchemaValidationError) {
    // Log the full raw and full issues — truncating either makes it
    // impossible to debug schema regressions in dev.
    console.error('AI schema validation error');
    console.error('  purpose:', err.purpose);
    console.error('  issues:', JSON.stringify(err.issues, null, 2));
    console.error('  raw (full):', err.raw);
    return NextResponse.json(
      { error: 'ai_output_invalid', message: err.message, purpose: err.purpose },
      { status: 502 },
    );
  }
  if (err instanceof AIError) {
    console.error('AI error', err);
    return NextResponse.json(
      { error: 'ai_failure', message: err.message, purpose: err.purpose },
      { status: 502 },
    );
  }
  console.error('API error', err);
  return NextResponse.json(
    { error: 'internal', message: err instanceof Error ? err.message : 'unknown' },
    { status: 500 },
  );
}
