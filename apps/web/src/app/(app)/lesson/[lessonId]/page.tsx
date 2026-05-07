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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
      <div className="mb-5 sm:mb-6">
        <div className="text-xs uppercase tracking-wider text-ink-500">
          {lesson.lessonType.replace(/_/g, ' ')}
        </div>
        <h1 className="font-display text-2xl sm:text-3xl mt-1 leading-tight">{lesson.title}</h1>
        <p className="text-sm sm:text-base text-ink-600 mt-2 sm:mt-3">
          {(lesson.content as { briefing?: string }).briefing}
        </p>
      </div>
      <LessonPlayer lesson={lesson} tasks={lesson.tasks} />
    </div>
  );
}
