import { CommandCenter } from '@/components/wise/command-center';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { ensureProfile } from '@/server/services/profile';
import { getTtsAvailability } from '@speakwise/ai';
import { redirect } from 'next/navigation';

export default async function CommandCenterPage() {
  const user = await getOrCreateUser();
  // Tutors don't have a learner experience — punt them to their classroom.
  // Admin URL-bar typing on a learner page just routes to the right home.
  if (user.role === 'tutor') redirect('/classroom');
  const profile = await ensureProfile(user.id);
  if (!profile.onboardingCompleted) redirect('/onboarding');

  const firstName = user.name.split(' ')[0] ?? user.name;

  // Default-mode rule:
  //   - User explicitly prefers chat → always chat.
  //   - Else voice if it actually works from the server (paid ElevenLabs),
  //     otherwise chat (free-tier TTS is blocked from Render's IP).
  const voice = await getTtsAvailability();
  const prefersText = profile.preferredInteractionMode === 'text';
  const defaultMode: 'voice' | 'text' = prefersText || !voice.available ? 'text' : 'voice';

  return (
    <CommandCenter
      firstName={firstName}
      sessionMinutes={profile.preferredSessionLengthMinutes ?? 10}
      defaultMode={defaultMode}
      voiceAvailable={voice.available}
    />
  );
}
