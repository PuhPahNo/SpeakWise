'use client';

import type { VoiceState } from '@speakwise/types';
import { useMemo } from 'react';

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

export function VoiceOrb({ state, size = 'lg', onTap, ariaLabel, amplitude = 0 }: Props) {
  // The orb only animates during ACTIVE states. At rest, it's perfectly
  // still — making it a reliable click target. The previous breathe-on-
  // idle made the hit target jitter (~2px every 2s) AND made Playwright
  // and real users miss clicks against the moving disc.
  const animation = useMemo(() => {
    switch (state) {
      case 'listening':
        return 'animate-orb-pulse';
      case 'thinking':
      case 'processing_transcription':
        return 'animate-orb-spin-slow';
      case 'speaking':
        return 'animate-orb-breathe';
      default:
        return ''; // idle, paused, awaiting_user_response, error → still
    }
  }, [state]);

  const isError = state === 'error';
  const interactive = !!onTap;

  // Dynamic outer glow scales with mic amplitude when listening
  const dynamicGlow = state === 'listening' ? Math.max(0, Math.min(1, amplitude)) : 0;

  // Wrap the button in a slightly larger flex container so we can render
  // halos as siblings WITHOUT them blocking the click. The halos use
  // `pointer-events: none` so 100% of taps in the orb area hit the button.
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        interactive ? 'cursor-pointer' : ''
      }`}
    >
      {/* Outer halo rings — purely decorative, never receive clicks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full transition-all duration-150"
        style={{
          transform: `scale(${1.15 + dynamicGlow * 0.25})`,
          background: isError
            ? 'radial-gradient(circle, rgba(220,38,38,0.30), transparent 70%)'
            : 'radial-gradient(circle, rgba(224,136,24,0.25), transparent 70%)',
          opacity: isError ? 0.6 : state === 'listening' ? 0.7 + dynamicGlow * 0.3 : 0.3,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          transform: `scale(${1.35 + dynamicGlow * 0.4})`,
          background: isError
            ? 'radial-gradient(circle, rgba(220,38,38,0.12), transparent 70%)'
            : 'radial-gradient(circle, rgba(224,136,24,0.10), transparent 70%)',
          opacity: isError ? 0.4 : state === 'listening' ? 0.6 : 0.2,
          transition: 'all 200ms ease-out',
        }}
      />

      {/* The actual click target — the visible orb plus a generous invisible
          padding ring. The :active state gives instant tactile feedback so
          the user feels the tap register before any network round-trip. */}
      <button
        type="button"
        onClick={onTap}
        disabled={!onTap}
        aria-label={ariaLabel ?? `Voice orb, ${state.replace(/_/g, ' ')}`}
        className={`relative ${SIZE[size]} rounded-full ${animation} ${
          interactive ? 'cursor-pointer hover:brightness-110 active:scale-[0.97]' : 'cursor-default'
        } ${isError ? '' : 'shadow-orb-glow'} focus:outline-none focus-visible:shadow-orb-glow-active transition-[transform,filter,box-shadow] duration-150`}
        style={{
          background: isError
            ? 'radial-gradient(circle at 32% 28%, rgba(120,40,40,0.85), rgba(70,20,20,0.95) 60%, rgba(30,10,10,1) 100%)'
            : 'radial-gradient(circle at 32% 28%, rgba(255,231,178,0.95), rgba(243,160,43,0.92) 38%, rgba(189,106,13,0.95) 70%, rgba(63,35,5,1) 100%)',
          opacity: isError ? 0.7 : 1,
        }}
      >
        {/* Inner highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[14%] rounded-full"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%)',
            mixBlendMode: 'screen',
          }}
        />
        {/* Inner shadow rim for depth */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            boxShadow:
              'inset 0 -16px 30px rgba(0,0,0,0.45), inset 0 12px 24px rgba(255,231,178,0.25)',
          }}
        />
      </button>
    </div>
  );
}
