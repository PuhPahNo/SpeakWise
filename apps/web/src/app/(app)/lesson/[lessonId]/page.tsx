import { notFound } from 'next/navigation';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { getLesson } from '@/server/services/lesson';
import { LessonPlayer } from '@/components/lesson/lesson-player';

export default async function LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
  const { lessonId } = await params;
  const user = await getOrCreateUser();
  const lesson = await getLesson(user.id, lessonId);
  if (!lesson) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider text-ink-500">{lesson.lessonType.replace(/_/g, ' ')}</div>
        <h1 className="font-display text-3xl mt-1">{lesson.title}</h1>
        <p className="text-ink-600 mt-3">
          {(lesson.content as { briefing?: string }).briefing}
        </p>
      </div>
      <LessonPlayer lesson={lesson} tasks={lesson.tasks} />
    </div>
  );
}
