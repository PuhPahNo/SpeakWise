import { Suspense } from 'react';
import { SignInForm } from './sign-in-form';

export const metadata = { title: 'Sign in · Speakwise' };

export default function SignInPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10 bg-ink-50">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-3xl text-center mb-1">Speakwise</h1>
        <p className="text-center text-ink-600 text-sm mb-6">
          Sign in to continue.
        </p>
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}
