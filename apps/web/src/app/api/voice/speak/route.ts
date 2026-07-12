import { withAuthAndJson } from '@/lib/api/route-handler';
import { userRateLimitResponse } from '@/lib/security/rate-limit';
import { ensureProfile } from '@/server/services/profile';
import { synthesizeSpeech } from '@speakwise/ai';
import { z } from 'zod';

const Schema = z.object({
  text: z.string().min(1).max(2000),
  // Default 'auto': segment the text and synthesize each phrase with the
  // right language hint. Passing 'en' or 'it' forces the whole utterance
  // to one language (used for things like a single Italian sample preview).
  language: z.enum(['en', 'it', 'auto']).default('auto'),
  /** Optional override for one-off previews. Falls back to profile default. */
  voiceId: z.string().min(8).max(64).optional(),
});

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  return withAuthAndJson(Schema, req, async ({ userId }, body) => {
    const limited = userRateLimitResponse('voice-speak', userId, 60, 15 * 60_000);
    if (limited) return limited;
    const profile = await ensureProfile(userId);
    const result = await synthesizeSpeech({
      text: body.text,
      language: body.language,
      voiceId: body.voiceId ?? profile.wiseVoiceId ?? undefined,
    });
    return new Response(result.audio, {
      headers: {
        'Content-Type': result.contentType,
        'Cache-Control': 'private, max-age=0, must-revalidate',
      },
    });
  });
}
