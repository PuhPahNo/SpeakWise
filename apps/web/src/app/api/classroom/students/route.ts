import { withTutorAuth } from '@/lib/api/route-handler';
import { listStudentsForTutor } from '@/server/services/classroom';

export async function GET() {
  return withTutorAuth(async ({ userId }) => {
    const students = await listStudentsForTutor(userId);
    return { students };
  });
}
