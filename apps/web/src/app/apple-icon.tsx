import { ImageResponse } from 'next/og';

// Apple touch icon — what shows up when someone adds SpeakWise to their
// iOS home screen. Apple requires a PNG-shaped 180×180 with a square
// background (it does its own rounding). We render the Wise orb on the
// app's dark theme color so it looks like a SpeakWise tile, not a
// transparent ball floating in space.
//
// This is dynamically generated via next/og at build/request time so
// we don't have to ship a binary PNG in the repo.

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#100e0c', // bg-ink-800 from tailwind config
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 28%, #ffe7b2 0%, #f3a02b 38%, #bd6a0d 70%, #3f2305 100%)',
          // Outer glow approximating the orb's shadow-orb-glow effect.
          boxShadow:
            '0 0 38px 6px rgba(224, 136, 24, 0.45), 0 0 80px 16px rgba(224, 136, 24, 0.15)',
        }}
      />
    </div>,
    { ...size },
  );
}
