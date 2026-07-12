/* eslint-disable no-console */
/**
 * Verify that the multilingual TTS pipeline actually produces Italian
 * phonetics. Synthesizes a known mixed phrase via /api/voice/speak,
 * transcribes the resulting audio back through /api/voice/transcribe (or
 * Whisper directly), and asserts both Italian and English content survive.
 *
 * Requires the dev server running on :3001 and a signed-in admin user
 * (TEST_USERNAME / TEST_PASSWORD are required).
 *
 *   node --experimental-strip-types --env-file=.env scripts/audio-multilingual-probe.ts
 */
import { writeFileSync } from 'node:fs';

const BASE = process.env.APP_URL ?? 'http://localhost:3001';
const TEST_USER = {
  username: process.env.TEST_USERNAME ?? '',
  password: process.env.TEST_PASSWORD ?? '',
};

const PHRASE =
  "Ciao Anthony! Welcome back. Vorrei una pasta — let's practice ordering at the trattoria.";

async function signIn(): Promise<string> {
  const res = await fetch(`${BASE}/api/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(TEST_USER),
  });
  if (!res.ok) {
    throw new Error(
      `sign-in failed (${res.status}); is ${TEST_USER.username}/${TEST_USER.password} provisioned?`,
    );
  }
  const setCookie = res.headers.get('set-cookie') ?? '';
  const m = setCookie.match(/sw_session=([^;]+)/);
  if (!m) throw new Error('no sw_session cookie');
  return `sw_session=${m[1]}`;
}

async function main() {
  if (!TEST_USER.username || !TEST_USER.password) {
    throw new Error('TEST_USERNAME and TEST_PASSWORD are required');
  }
  console.log(`probe: signing in as ${TEST_USER.username}…`);
  const cookie = await signIn();

  console.log(`probe: synthesizing "${PHRASE}"`);
  const ttsRes = await fetch(`${BASE}/api/voice/speak`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ text: PHRASE, language: 'auto' }),
  });
  if (!ttsRes.ok) {
    const err = await ttsRes.text().catch(() => '');
    throw new Error(`tts failed ${ttsRes.status}: ${err.slice(0, 300)}`);
  }
  const ctype = ttsRes.headers.get('content-type') ?? 'audio/mpeg';
  const audio = await ttsRes.arrayBuffer();
  const ext = ctype.includes('wav') ? 'wav' : 'mp3';
  const path = `/tmp/sw-multilingual-probe.${ext}`;
  writeFileSync(path, Buffer.from(audio));
  console.log(`  bytes: ${audio.byteLength}, content-type: ${ctype}`);
  console.log(`  wrote: ${path}`);

  // Transcribe back via auto-detect (no language param). Verifies that
  // /api/voice/transcribe correctly omits the language hint when not
  // forced and that Whisper can pick out a mixed phrase.
  console.log('probe: transcribing back via auto-detect…');
  const fd = new FormData();
  const blob = new Blob([audio], { type: ctype });
  fd.append('audio', blob, `probe.${ext}`);
  // Intentionally NOT setting `language` so the route omits the hint.
  const sttRes = await fetch(`${BASE}/api/voice/transcribe`, {
    method: 'POST',
    headers: { Cookie: cookie },
    body: fd,
  });
  if (!sttRes.ok) {
    const err = await sttRes.text().catch(() => '');
    throw new Error(`transcribe failed ${sttRes.status}: ${err.slice(0, 300)}`);
  }
  const stt = (await sttRes.json()) as { text: string; language?: string };
  console.log(`  detected language: ${stt.language ?? '(unset)'}`);
  console.log(`  transcript: "${stt.text}"`);

  // Also probe a forced-Italian-only path: send the same audio with
  // language='it' and verify it still transcribes (used by lesson-player
  // for Italian-only roleplay tasks).
  console.log('probe: transcribing back with language=it forced…');
  const fd2 = new FormData();
  fd2.append('audio', new Blob([audio], { type: ctype }), `probe.${ext}`);
  fd2.append('language', 'it');
  const sttRes2 = await fetch(`${BASE}/api/voice/transcribe`, {
    method: 'POST',
    headers: { Cookie: cookie },
    body: fd2,
  });
  const stt2 = (await sttRes2.json()) as { text: string; language?: string };
  console.log(`  forced-IT detected: ${stt2.language ?? '(unset)'}`);
  console.log(`  forced-IT transcript: "${stt2.text}"`);

  const transcript = stt.text.toLowerCase();
  const italianHit =
    /ciao/.test(transcript) ||
    /vorrei/.test(transcript) ||
    /pasta/.test(transcript) ||
    /trattoria/.test(transcript);
  const englishHit = /welcome|practice|let'?s|ordering/.test(transcript);

  console.log('');
  console.log('assertions:');
  console.log(`  italian content present: ${italianHit ? '✓' : '✗'}`);
  console.log(`  english content present: ${englishHit ? '✓' : '✗'}`);
  console.log(`  forced-it transcribe ok:  ${stt2.text.length > 5 ? '✓' : '✗'}`);
  process.exit(italianHit && englishHit && stt2.text.length > 5 ? 0 : 1);
}

main().catch((e) => {
  console.error('probe crashed:', e);
  process.exit(2);
});
