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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="text-center mb-6 sm:mb-8">
        <div className="text-[11px] uppercase tracking-[0.2em] text-ink-200">
          {lesson.lessonType.replace(/_/g, ' ')}
        </div>
        <h1 className="font-display text-2xl sm:text-3xl mt-2 leading-tight text-ink-50">
          {lesson.title}
        </h1>
      </div>
      <LessonPlayer lesson={lesson} tasks={lesson.tasks} />
    </div>
  );
}
