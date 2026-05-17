import { ClassroomHome } from '@/components/classroom/classroom-home';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { getTutorProfile, listStudentsForTutor } from '@/server/services/classroom';
import { redirect } from 'next/navigation';

export default async function ClassroomPage() {
  const user = await getOrCreateUser();
  // Hard role gate: a learner typing /classroom in the URL bar ends up
  // back at the learner home. Mirrors the inverse gate on
  // /command-center → /classroom for tutors.
  if (user.role !== 'tutor') redirect('/command-center');

  const [profile, students] = await Promise.all([
    getTutorProfile(user.id),
    listStudentsForTutor(user.id),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <ClassroomHome
        initialProfile={{
          displayName: profile.displayName,
          bio: profile.bio,
          specialties: profile.specialties,
          inviteCode: profile.inviteCode,
        }}
        initialStudents={students}
      />
    </div>
  );
}
