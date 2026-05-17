import { withAuth, withAuthAndJson } from '@/lib/api/route-handler';
import {
  InviteCodeNotFoundError,
  disconnectTutor,
  getActiveTutorForStudent,
  linkStudentByCode,
} from '@/server/services/classroom';
import { ConnectTutorRequestSchema } from '@speakwise/schemas';
import { NextResponse } from 'next/server';

/** Returns the student's currently-linked tutor (or null). */
export async function GET() {
  return withAuth(async ({ userId }) => {
    const link = await getActiveTutorForStudent(userId);
    return { tutor: link };
  });
}

/** Student-side action: redeem invite code to connect. */
export async function POST(req: Request) {
  // Normalize the code to uppercase before validation so the user can
  // type it lowercase if they want.
  return withAuthAndJson(ConnectTutorRequestSchema, req, async ({ userId }, body) => {
    try {
      const result = await linkStudentByCode(userId, body.code.toUpperCase());
      return { connected: true, ...result };
    } catch (e) {
      if (e instanceof InviteCodeNotFoundError) {
        return NextResponse.json(
          { error: 'invite_code_not_found' },
          { status: 404 },
        ) as unknown as { connected: false };
      }
      throw e;
    }
  });
}

/** Student-side action: disconnect from current tutor. */
export async function DELETE() {
  return withAuth(async ({ userId }) => {
    await disconnectTutor(userId);
    return { disconnected: true };
  });
}
