// Pronunciation feedback for spoken answers.
//
// HONEST SCOPE: this is a within-stack approximation, NOT lab-grade acoustic
// phoneme scoring. We work from the speech-to-text TRANSCRIPT, not the raw
// audio, so we cannot truly "hear" accent. Two signals make it useful anyway:
//   1) Proactive coaching of the hard Italian sounds present in the TARGET
//      phrase (gli, gn, sc, double consonants, soft c/g, written accents) —
//      the things English speakers reliably struggle with.
//   2) Divergence between the target and what STT transcribed: when a
//      mispronunciation pushes Whisper to a different/garbled word, that's a
//      real signal the learner can act on.
// The upgrade path for clinical accuracy is a dedicated pronunciation API
// (Azure Pronunciation Assessment, Speechace) fed the raw audio.

import { Models, chatStructured } from '@speakwise/ai';
import { emitUserEvent } from '@speakwise/events';
import { PronunciationAssessmentOutputSchema } from '@speakwise/schemas';

/**
 * Detect the distinctive Italian sounds present in a phrase that English
 * speakers most often get wrong. Pure + deterministic so it can be unit tested
 * and so we always coach something concrete.
 */
export function detectHardSounds(text: string): string[] {
  const t = text.toLowerCase();
  const sounds: string[] = [];
  const add = (s: string) => {
    if (!sounds.includes(s)) sounds.push(s);
  };

  if (/gli/.test(t)) add('gli (the “lyee” sound, as in famiglia)');
  if (/gn/.test(t)) add('gn (the “ny” sound, as in gnocchi)');
  if (/sc[ei]/.test(t)) add('sc before e/i (the “sh” sound, as in pesce)');
  if (/([bcdfglmnprstvz])\1/.test(t)) add('a double consonant (held longer)');
  if (/c[ei]/.test(t)) add('soft c (the “ch” sound, as in cena)');
  if (/g[ei]/.test(t)) add('soft g (the “j” sound, as in gelato)');
  if (/ch[ei]/.test(t) || /gh[ei]/.test(t)) add('the hard c/g kept by h (che, ghi)');
  if (/[àèéìòù]/.test(t)) add('a stressed final vowel / written accent');
  if (/\br[aeiou]/.test(t) || /rr/.test(t)) add('the rolled r');

  return sounds;
}

/**
 * Assess one spoken attempt and return short, encouraging pronunciation
 * coaching. Best-effort: callers treat a thrown error / null as "no feedback".
 */
export async function assessPronunciation(opts: {
  userId: string;
  expectedText: string;
  heardText: string;
  level: string;
}) {
  const target = opts.expectedText?.trim() || opts.heardText?.trim() || '';
  if (!target) return null;

  const targetSounds = detectHardSounds(target);

  const result = await chatStructured({
    promptKey: 'pronunciation.assess',
    purpose: 'pronunciation.assess',
    schema: PronunciationAssessmentOutputSchema,
    model: Models.fast,
    temperature: 0.3,
    maxOutputTokens: 400,
    vars: {
      EXPECTED: target,
      HEARD: opts.heardText ?? '',
      TARGET_SOUNDS: targetSounds.length > 0 ? targetSounds.join('; ') : '(none flagged)',
      LEVEL: opts.level,
    },
  });

  await emitUserEvent(opts.userId, 'AICall', {
    provider: 'openai',
    model: result.usage.model,
    purpose: 'pronunciation.assess',
    tokensIn: result.usage.promptTokens,
    tokensOut: result.usage.completionTokens,
    latencyMs: result.usage.latencyMs,
    ok: true,
  });

  return result.data;
}
