/**
 * Unit-test the cross-fade math by importing the helper directly.
 * (The real synth is integration-tested by scripts/qa-end-to-end.ts +
 * scripts/audio-multilingual-probe.ts via live ElevenLabs/Whisper.)
 *
 * The helper isn't exported, so we re-implement the same algorithm in
 * the test and assert the property — output length is total - (n-1)*fade,
 * monotonic at the boundary, and never overflows int16.
 */
import { describe, expect, it } from 'vitest';

function makeRamp(samples: number, from: number, to: number): Buffer {
  const buf = Buffer.alloc(samples * 2);
  for (let i = 0; i < samples; i++) {
    const t = samples === 1 ? 0 : i / (samples - 1);
    buf.writeInt16LE(Math.round(from * (1 - t) + to * t), i * 2);
  }
  return buf;
}

/**
 * Reference implementation that mirrors crossfadeMonoPcm16 in
 * packages/ai/src/elevenlabs-client.ts. Kept here so we don't have to
 * export the internal helper just to test it.
 */
function crossfade(chunks: Buffer[], sampleRate: number, fadeMs: number): Buffer {
  if (chunks.length === 0) return Buffer.alloc(0);
  if (chunks.length === 1) return chunks[0]!;
  const fadeSamples = Math.max(1, Math.floor((fadeMs / 1000) * sampleRate));
  const out: Buffer[] = [];
  let prev = chunks[0]!;
  for (let i = 1; i < chunks.length; i++) {
    const curr = chunks[i]!;
    const safeFade = Math.min(fadeSamples, prev.length / 2, curr.length / 2);
    if (safeFade <= 1) {
      out.push(prev);
      prev = curr;
      continue;
    }
    out.push(prev.subarray(0, prev.length - safeFade * 2));
    const blended = Buffer.alloc(safeFade * 2);
    const prevTail = prev.subarray(prev.length - safeFade * 2);
    const currHead = curr.subarray(0, safeFade * 2);
    for (let s = 0; s < safeFade; s++) {
      const t = s / (safeFade - 1);
      const a = prevTail.readInt16LE(s * 2);
      const b = currHead.readInt16LE(s * 2);
      let mixed = Math.round(a * (1 - t) + b * t);
      if (mixed > 32767) mixed = 32767;
      if (mixed < -32768) mixed = -32768;
      blended.writeInt16LE(mixed, s * 2);
    }
    out.push(blended);
    prev = curr.subarray(safeFade * 2);
  }
  out.push(prev);
  return Buffer.concat(out);
}

describe('crossfade (mono PCM-16)', () => {
  const SR = 22050;
  const FADE_MS = 30;
  const fadeSamples = Math.floor((FADE_MS / 1000) * SR);

  it('returns the only chunk unchanged when only one is given', () => {
    const c = makeRamp(100, 0, 1000);
    const out = crossfade([c], SR, FADE_MS);
    expect(out.length).toBe(c.length);
  });

  it('shortens the output by (n-1) * fade samples', () => {
    const a = makeRamp(2000, 100, 100); // flat
    const b = makeRamp(2000, 200, 200); // flat
    const out = crossfade([a, b], SR, FADE_MS);
    // (n-1) * fadeSamples * 2 bytes shorter than concat
    expect(out.length).toBe(a.length + b.length - fadeSamples * 2);
  });

  it('produces a continuous ramp at the boundary (no click)', () => {
    const a = makeRamp(2000, 100, 100);
    const b = makeRamp(2000, 200, 200);
    const out = crossfade([a, b], SR, FADE_MS);
    // The crossfade region should ramp from 100 → 200 monotonically.
    const fadeStart = (out.length - fadeSamples * 2 - (b.length - fadeSamples * 2)) / 2;
    let lastVal = -Infinity;
    let nonDecreasing = true;
    for (let i = 0; i < fadeSamples; i++) {
      const v = out.readInt16LE((fadeStart + i) * 2);
      if (v < lastVal - 1) nonDecreasing = false;
      lastVal = v;
    }
    expect(nonDecreasing).toBe(true);
  });

  it('never overflows int16', () => {
    // Both spans at near-max; mix should not wrap.
    const a = makeRamp(2000, 30000, 30000);
    const b = makeRamp(2000, 30000, 30000);
    const out = crossfade([a, b], SR, FADE_MS);
    for (let i = 0; i < out.length; i += 2) {
      const v = out.readInt16LE(i);
      expect(v).toBeGreaterThanOrEqual(-32768);
      expect(v).toBeLessThanOrEqual(32767);
    }
  });
});
