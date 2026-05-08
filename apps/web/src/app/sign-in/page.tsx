import { VoiceOrb } from '@/components/voice/voice-orb';
import { Suspense } from 'react';
import { SignInForm } from './sign-in-form';

export const metadata = { title: 'Sign in · Speakwise' };

export default function SignInPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mb-8 sm:mb-10">
          <VoiceOrb state="idle" size="md" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-center text-ink-50">Speakwise</h1>
        <p className="text-center text-ink-200 text-sm mt-2 mb-7">Sign in to continue.</p>
        <Suspense fallback={null}>
          <div className="w-full">
            <SignInForm />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
