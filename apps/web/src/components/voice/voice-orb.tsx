'use client';

import type { VoiceState } from '@speakwise/types';
import { useEffect, useRef } from 'react';

interface Props {
  state: VoiceState;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onTap?: () => void;
  ariaLabel?: string;
  /** Real-time mic amplitude 0..1 for the listening state. Optional. */
  amplitude?: number;
}

// Square footprints — the waveform draws a centered particle field inside.
const SIZE: Record<NonNullable<Props['size']>, string> = {
  sm: 'h-24 w-24',
  md: 'h-40 w-40',
  lg: 'h-56 w-56',
  xl: 'h-72 w-72 sm:h-80 sm:w-80',
};

// Resolve a CSS color expression (var(--accent) / oklch(...)) to rgb() so the
// canvas alpha helper can parse it — paint onto a 1×1 canvas and read it back.
function makeResolver() {
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const cx = c.getContext('2d');
  return (expr: string): string => {
    const probe = document.createElement('span');
    probe.style.color = expr;
    probe.style.display = 'none';
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    try {
      if (!cx) return 'rgb(120,210,230)';
      cx.clearRect(0, 0, 1, 1);
      cx.fillStyle = '#000';
      cx.fillStyle = resolved || expr;
      cx.fillRect(0, 0, 1, 1);
      const d = cx.getImageData(0, 0, 1, 1).data;
      return `rgb(${d[0] ?? 0},${d[1] ?? 0},${d[2] ?? 0})`;
    } catch {
      return 'rgb(120,210,230)';
    }
  };
}

function withAlpha(rgb: string, a: number): string {
  const m = rgb.match(/rgba?\(([^)]+)\)/);
  if (!m?.[1]) return rgb;
  const p = m[1].split(',').map((s) => Number.parseFloat(s));
  return `rgba(${p[0] ?? 0},${p[1] ?? 0},${p[2] ?? 0},${a})`;
}

/**
 * Brina "voice presence" — an abstract reactive particle/constellation field
 * that replaces the old gold sphere. Reacts to the voice state (and live mic
 * amplitude while listening). Canvas-rendered; the whole footprint is the tap
 * target. Prop interface is unchanged so all callers keep working.
 */
export function VoiceOrb({ state, size = 'lg', onTap, ariaLabel, amplitude = 0 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef(state);
  const ampRef = useRef(amplitude);
  stateRef.current = state;
  ampRef.current = amplitude;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resolve = makeResolver();
    const colors = {
      a: resolve('var(--accent)'),
      b: resolve('var(--accent-2)'),
      err: 'rgb(220,90,90)',
    };

    let raf = 0;
    let t = 0;
    let energy = 0.12;
    let rot = 0;

    function resize() {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, r.width * dpr);
      canvas.height = Math.max(1, r.height * dpr);
    }
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw();
    });
    ro.observe(canvas);

    const N = 64;
    const parts = Array.from({ length: N }, (_, i) => {
      const ang = (i / N) * Math.PI * 2;
      const ringBias = 0.55 + (i % 3) * 0.14;
      // Deterministic-ish seed by index so SSR/CSR don't diverge visually.
      const seed = (i * 1.6180339887) % 6.28;
      return { ang, baseR: ringBias, seed, spd: 0.6 + ((i * 7) % 9) / 10 };
    });

    function targetEnergy(): number {
      switch (stateRef.current) {
        case 'listening':
          return Math.min(0.95, 0.45 + ampRef.current * 0.5);
        case 'thinking':
        case 'processing_transcription':
          return 0.4;
        case 'speaking':
          return 0.85;
        default:
          return 0.3;
      }
    }
    function envelope(): number {
      const s = stateRef.current;
      if (s === 'speaking')
        return (
          0.55 +
          0.45 *
            Math.abs(Math.sin(t * 7.3) * 0.6 + Math.sin(t * 12.7) * 0.3 + Math.sin(t * 19.1) * 0.2)
        );
      if (s === 'listening')
        return 0.5 + 0.5 * Math.abs(Math.sin(t * 3.1) + Math.sin(t * 5.7) * 0.5) * 0.6;
      if (s === 'thinking' || s === 'processing_transcription')
        return 0.5 + 0.3 * Math.sin(t * 2.2);
      return 0.5 + 0.12 * Math.sin(t * 0.9);
    }

    function draw() {
      if (!canvas || !ctx) return;
      const tgt = targetEnergy();
      energy += (tgt - energy) * 0.06;
      const env = envelope();
      const amp = energy * env;
      rot += (stateRef.current === 'thinking' ? 0.012 : 0.0025) + energy * 0.006;

      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const R = Math.min(W, H) * 0.4;
      const isErr = stateRef.current === 'error';
      const a = isErr ? colors.err : colors.a;
      const b = isErr ? colors.err : colors.b;

      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = 'round';

      // soft central glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * (1.1 + amp * 0.5));
      glow.addColorStop(0, withAlpha(a, 0.28 + amp * 0.28));
      glow.addColorStop(0.45, withAlpha(a, 0.1));
      glow.addColorStop(1, withAlpha(a, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // constellation field — dots oscillate radially + faint links
      const pts = parts.map((p) => {
        const wob = Math.sin(t * p.spd * 2 + p.seed) * 0.5 + 0.5;
        const rr = R * (p.baseR + amp * 0.5 * wob);
        const ang = p.ang + rot * (0.4 + p.baseR);
        return {
          x: cx + Math.cos(ang) * rr,
          y: cy + Math.sin(ang) * rr,
          r: (1.3 + wob * 2.4 + amp * 2) * dpr,
        };
      });
      ctx.lineWidth = 1 * dpr;
      for (let i = 0; i < pts.length; i++) {
        const pi = pts[i];
        if (!pi) continue;
        for (let j = i + 1; j < i + 4 && j < pts.length; j++) {
          const pj = pts[j];
          if (!pj) continue;
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const d = Math.hypot(dx, dy);
          if (d < R * 0.5) {
            ctx.strokeStyle = withAlpha(b, (1 - d / (R * 0.5)) * 0.22 * (0.4 + amp));
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        if (!p) continue;
        ctx.fillStyle = withAlpha(i % 4 === 0 ? b : a, 0.85);
        ctx.shadowColor = withAlpha(a, 0.7);
        ctx.shadowBlur = 8 * dpr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function loop() {
      t += 0.016;
      draw();
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const interactive = !!onTap;
  return (
    <button
      type="button"
      onClick={onTap}
      disabled={!onTap}
      aria-label={ariaLabel ?? `Voice presence, ${state.replace(/_/g, ' ')}`}
      className={`relative ${SIZE[size]} max-w-full rounded-full bg-transparent p-0 transition-transform duration-150 ${
        interactive ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'
      } focus:outline-none focus-visible:outline-none`}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </button>
  );
}
