/* eslint-disable no-console */
/**
 * Smoke test: verify that OPENAI_API_KEY and ELEVENLABS_API_KEY work.
 *
 * Costs roughly $0.0002 per run (one cheap chat completion + one ~6-second
 * TTS). Does NOT touch the database.
 *
 * Run from the monorepo root (no installs needed on Node 20+):
 *   node --experimental-strip-types --env-file=.env scripts/smoke-test.ts
 *
 * Or via pnpm once dependencies are installed:
 *   pnpm smoke
 *
 * Add `--no-tts` to skip the ElevenLabs audio generation (just probes /v1/user
 * to verify the key works). Useful if you want zero ElevenLabs char usage.
 */

import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const skipTts = process.argv.includes('--no-tts');

const colors = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  dim: (s: string) => `\x1b[2m${s}\x1b[0m`,
  bold: (s: string) => `\x1b[1m${s}\x1b[0m`,
};

let pass = 0;
let fail = 0;

async function step<T>(name: string, fn: () => Promise<T>): Promise<T | null> {
  process.stdout.write(`▶ ${name}…`);
  const start = Date.now();
  try {
    const result = await fn();
    process.stdout.write(
      `\r${colors.green('✓')} ${name} ${colors.dim(`(${Date.now() - start}ms)`)}\n`,
    );
    pass++;
    return result;
  } catch (e) {
    process.stdout.write(`\r${colors.red('✗')} ${name}\n`);
    console.error(`  ${colors.red(e instanceof Error ? e.message : String(e))}`);
    fail++;
    return null;
  }
}

async function main() {
  console.log(colors.bold('\nSpeakwise smoke test\n'));

  // ── 1. OpenAI chat ────────────────────────────────────────────────────
  await step('OpenAI chat completion (gpt-4o-mini)', async () => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY not set');
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL_FAST ?? 'gpt-4o-mini',
        max_tokens: 8,
        messages: [{ role: 'user', content: 'Reply with exactly: PONG' }],
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }
    const data = (await res.json()) as { choices: Array<{ message: { content: string } }> };
    const reply = data.choices[0]?.message?.content?.trim();
    if (!reply) throw new Error('Empty completion');
    return reply;
  });

  // ── 2. OpenAI embeddings ──────────────────────────────────────────────
  await step('OpenAI embeddings (text-embedding-3-small)', async () => {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY not set');
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL_EMBEDDING ?? 'text-embedding-3-small',
        input: 'speakwise smoke test',
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as { data: Array<{ embedding: number[] }> };
    const dim = data.data[0]?.embedding.length ?? 0;
    if (dim !== 1536) throw new Error(`unexpected embedding dim: ${dim}`);
    return dim;
  });

  // ── 3. ElevenLabs key probe ───────────────────────────────────────────
  await step('ElevenLabs key probe (/v1/user)', async () => {
    const key = process.env.ELEVENLABS_API_KEY;
    if (!key) throw new Error('ELEVENLABS_API_KEY not set');
    const res = await fetch('https://api.elevenlabs.io/v1/user', {
      headers: { 'xi-api-key': key },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = (await res.json()) as {
      subscription?: { tier?: string; character_limit?: number };
    };
    return data.subscription?.tier ?? 'unknown';
  });

  // ── 4. ElevenLabs TTS (default voice = Bill) ──────────────────────────
  if (!skipTts) {
    const audio = await step('ElevenLabs TTS — default voice (Bill) speaking Italian', async () => {
      const key = process.env.ELEVENLABS_API_KEY;
      if (!key) throw new Error('ELEVENLABS_API_KEY not set');
      const voiceId = 'pqHfZKP75CvOlQylNhV4'; // Bill — premade, free-tier accessible
      const model = process.env.ELEVENLABS_MODEL_ID ?? 'eleven_turbo_v2_5';
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': key,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
          },
          body: JSON.stringify({
            text: 'Ciao, sono Wise. Iniziamo la lezione.',
            model_id: model,
            voice_settings: { stability: 0.45, similarity_boost: 0.75 },
          }),
        },
      );
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
      }
      return new Uint8Array(await res.arrayBuffer());
    });

    if (audio) {
      const outPath = resolve(process.cwd(), 'scripts/.smoke-output.mp3');
      try {
        await mkdir(resolve(process.cwd(), 'scripts'), { recursive: true });
        await writeFile(outPath, audio);
        console.log(
          `  ${colors.dim(`audio saved → ${outPath} (${audio.byteLength} bytes; play to verify)`)}`,
        );
      } catch {
        // non-fatal
      }
    }
  } else {
    console.log(colors.dim('  skipping TTS (--no-tts flag)'));
  }

  // ── Summary ───────────────────────────────────────────────────────────
  console.log();
  if (fail === 0) {
    console.log(colors.green(colors.bold(`✓ all ${pass} checks passed`)));
    process.exit(0);
  } else {
    console.log(colors.red(colors.bold(`✗ ${fail} of ${pass + fail} failed`)));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('unexpected error:', e);
  process.exit(2);
});
