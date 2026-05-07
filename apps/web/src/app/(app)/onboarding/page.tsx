'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { VoiceOrb } from '@/components/voice/voice-orb';
import { useVoiceTutor } from '@/hooks/use-voice-tutor';

export default function OnboardingPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [wiseLine, setWiseLine] = useState<string>('');
  const [userLine, setUserLine] = useState<string>('');
  const [done, setDone] = useState(false);
  const [showText, setShowText] = useState(false);
  const [textInput, setTextInput] = useState('');
  const startedRef = useRef(false);

  const tutor = useVoiceTutor({
    sttLanguage: 'en',
    ttsLanguage: 'en',
    onUserSpeech: async (text) => {
      setUserLine(text);
      await sendResponse(text);
    },
  });

  // Bootstrap onboarding session + speak greeting once
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    (async () => {
      try {
        const res = await fetch('/api/onboarding/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'voice' }),
        });
        const data = (await res.json()) as { sessionId: string; wiseMessage: string };
        setSessionId(data.sessionId);
        setWiseLine(data.wiseMessage);
        await tutor.speak(data.wiseMessage);
      } catch (e) {
        console.error('onboarding start failed', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendResponse(text: string) {
    if (!sessionId) return;
    try {
      const res = await fetch('/api/onboarding/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, inputType: 'voice', text }),
      });
      const data = (await res.json()) as { wiseMessage: string; nextStep: string };
      setWiseLine(data.wiseMessage);
      setUserLine('');

      if (data.nextStep === 'complete') {
        await fetch('/api/onboarding/complete', { method: 'POST' });
        await tutor.speak(data.wiseMessage);
        setDone(true);
      } else {
        await tutor.speak(data.wiseMessage);
      }
    } catch (e) {
      console.error('onboarding respond failed', e);
    }
  }

  function statusText(): string {
    if (done) return 'All set.';
    switch (tutor.state) {
      case 'speaking':
        return 'Wise is speaking…';
      case 'listening':
        return 'Listening — tap to stop';
      case 'processing_transcription':
        return 'Got it — transcribing…';
      case 'thinking':
        return 'Thinking…';
      case 'awaiting_user_response':
        return 'Tap the orb to reply';
      case 'error':
        return 'Microphone error — try again or use text below';
      default:
        return 'Tap the orb to reply';
    }
  }

  function onOrbTap() {
    if (done) {
      router.push('/command-center');
      return;
    }
    if (tutor.state === 'speaking') {
      tutor.cancel();
      return;
    }
    void tutor.toggleListen();
  }

  async function submitText() {
    const text = textInput.trim();
    if (!text || !sessionId || done) return;
    setUserLine(text);
    setTextInput('');
    setShowText(false);
    await sendResponse(text);
  }

  const orbAriaLabel = done
    ? 'Onboarding complete — tap to continue'
    : tutor.state === 'listening'
      ? 'Stop listening'
      : tutor.state === 'speaking'
        ? 'Stop Wise speaking'
        : 'Tap to speak';

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-between px-4 py-10 sm:py-16 max-w-2xl mx-auto">
      <div className="text-xs uppercase tracking-[0.2em] text-ink-200">
        {done ? 'Done' : 'Getting to know you'}
      </div>

      <div className="flex flex-col items-center gap-8 sm:gap-10 my-8 sm:my-12">
        <VoiceOrb
          state={tutor.state}
          size="xl"
          amplitude={tutor.amplitude}
          onTap={onOrbTap}
          ariaLabel={orbAriaLabel}
        />
        <div className="text-center min-h-[5rem]">
          <p
            key={wiseLine}
            className="font-display text-2xl sm:text-3xl text-ink-50 leading-snug animate-fade-up"
          >
            {wiseLine || ' '}
          </p>
          {userLine && (
            <p className="mt-3 text-sm sm:text-base text-ink-200 italic animate-fade-up">
              you: &ldquo;{userLine}&rdquo;
            </p>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-sm text-ink-200 text-center">{statusText()}</p>

        {done ? (
          <button
            onClick={() => router.push('/command-center')}
            className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-6 py-3 transition"
          >
            Take me to my first lesson →
          </button>
        ) : showText ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void submitText();
            }}
            className="w-full max-w-md flex gap-2"
          >
            <input
              autoFocus
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type your answer instead…"
              enterKeyHint="send"
              autoCapitalize="sentences"
              className="flex-1 min-w-0"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="rounded-lg bg-wise-500 hover:bg-wise-600 disabled:opacity-50 text-ink-900 font-medium px-4 shrink-0"
            >
              Send
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowText(true)}
            className="text-sm text-ink-200 hover:text-ink-50 underline-offset-4 hover:underline"
          >
            or type instead
          </button>
        )}
      </div>
    </div>
  );
}
