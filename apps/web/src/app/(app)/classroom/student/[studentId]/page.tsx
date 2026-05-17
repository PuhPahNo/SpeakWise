import { StudentDetail } from '@/components/classroom/student-detail';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { StudentNotLinkedError, getStudentDetailForTutor } from '@/server/services/classroom';
import { prisma } from '@speakwise/db';
import { notFound, redirect } from 'next/navigation';

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;
  const user = await getOrCreateUser();
  if (user.role !== 'tutor') redirect('/command-center');

  let detail: Awaited<ReturnType<typeof getStudentDetailForTutor>>;
  try {
    detail = await getStudentDetailForTutor(user.id, studentId);
  } catch (e) {
    if (e instanceof StudentNotLinkedError) notFound();
    throw e;
  }

  // Pull the curriculum skill list so the directive composer can offer
  // skill-pinning. Bound by language so multi-language is future-proof.
  const allSkills = await prisma.curriculumSkill.findMany({
    where: { language: 'it', isActive: true },
    orderBy: [{ level: 'asc' }, { name: 'asc' }],
    select: { id: true, slug: true, name: true, category: true, level: true },
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <StudentDetail detail={detail} allSkills={allSkills} />
    </div>
  );
}
