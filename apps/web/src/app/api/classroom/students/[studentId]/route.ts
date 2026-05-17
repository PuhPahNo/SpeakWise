import { withTutorAuth } from '@/lib/api/route-handler';
import { getStudentDetailForTutor } from '@/server/services/classroom';

export async function GET(_req: Request, { params }: { params: Promise<{ studentId: string }> }) {
  const { studentId } = await params;
  return withTutorAuth(async ({ userId }) => {
    return getStudentDetailForTutor(userId, studentId);
  });
}
