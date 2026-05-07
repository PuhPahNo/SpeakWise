import { withAuth } from '@/lib/api/route-handler';
import { getLesson } from '@/server/services/lesson';

export async function GET(_req: Request, { params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  return withAuth(async ({ userId }) => {
    const lesson = await getLesson(userId, lessonId);
    if (!lesson) throw new Error('Lesson not found');
    return { lesson, tasks: lesson.tasks };
  });
}
