'use client';

import { useMemo } from 'react';
import type { VoiceState } from '@speakwise/types';

interface Props {
  state: VoiceState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onTap?: () => void;
  ariaLabel?: string;
  /** Real-time mic amplitude 0..1 for the listening state. Optional. */
  amplitude?: number;
}

const SIZE: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-24 w-24',
  md: 'h-40 w-40',
  lg: 'h-56 w-56',
  xl: 'h-72 w-72 sm:h-80 sm:w-80',
};

export function VoiceOrb({
  state,
  size = 'lg',
  onTap,
  ariaLabel,
  amplitude = 0,
}: Props) {
  const animation = useMemo(() => {
    switch (state) {
      case 'listening':
        return 'animate-orb-pulse';
      case 'thinking':
      case 'processing_transcription':
        return 'animate-orb-spin-slow';
      case 'speaking':
        return 'animate-orb-breathe';
      case 'awaiting_user_response':
      case 'idle':
      case 'paused':
      default:
        return 'animate-orb-breathe';
    }
  }, [state]);

  // Dynamic outer glow scales with mic amplitude when listening
  const dynamicGlow =
    state === 'listening' ? Math.max(0, Math.min(1, amplitude)) : 0;

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer halo rings — react to listening amplitude */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full transition-all duration-150"
        style={{
          transform: `scale(${1.15 + dynamicGlow * 0.25})`,
          background:
            'radial-gradient(circle, rgba(224,136,24,0.25), transparent 70%)',
          opacity: state === 'listening' ? 0.7 + dynamicGlow * 0.3 : 0.3,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          transform: `scale(${1.35 + dynamicGlow * 0.4})`,
          background:
            'radial-gradient(circle, rgba(224,136,24,0.10), transparent 70%)',
          opacity: state === 'listening' ? 0.6 : 0.2,
          transition: 'all 200ms ease-out',
        }}
      />

      {/* The orb itself */}
      <button
        type="button"
        onClick={onTap}
        disabled={!onTap}
        aria-label={ariaLabel ?? `Voice orb, ${state.replace(/_/g, ' ')}`}
        className={`relative ${SIZE[size]} rounded-full ${animation} ${
          onTap ? 'cursor-pointer' : 'cursor-default'
        } shadow-orb-glow focus:outline-none focus-visible:shadow-orb-glow-active`}
        style={{
          background:
            'radial-gradient(circle at 32% 28%, rgba(255,231,178,0.95), rgba(243,160,43,0.92) 38%, rgba(189,106,13,0.95) 70%, rgba(63,35,5,1) 100%)',
        }}
      >
        {/* Inner highlight */}
        <span
          aria-hidden
          className="absolute inset-[14%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Inner shadow rim for depth */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              'inset 0 -16px 30px rgba(0,0,0,0.45), inset 0 12px 24px rgba(255,231,178,0.25)',
          }}
        />
      </button>
    </div>
  );
}
