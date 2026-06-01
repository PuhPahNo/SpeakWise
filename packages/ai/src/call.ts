// Schema-validated AI calls. Per Tech Arch §3.4 / §10 every AI generation that
// affects product state must return validated structured output.
//
// All AI traffic should flow through `chatStructured()` so that:
//  - the prompt template is loaded by key (not inlined in app code)
//  - the response is JSON-mode parsed and Zod-validated
//  - failures throw AISchemaValidationError (do not silently degrade)
//  - usage is reported back so the caller can emit an AICall UserEvent

import type { ZodTypeAny, z } from 'zod';
import { AIError, AISchemaValidationError } from './errors';
import { Models } from './models';
import { getOpenAI } from './openai-client';
import { loadPrompt, renderPrompt } from './prompt-loader';

export interface ChatStructuredOptions<S extends ZodTypeAny> {
  promptKey: string;
  promptVersion?: number;
  vars: Record<string, string>;
  schema: S;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  purpose: string;
  userMessage?: string;
}

export interface ChatStructuredResult<S extends ZodTypeAny> {
  data: z.infer<S>;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
    latencyMs: number;
    model: string;
    promptVersion: number;
  };
}

export async function chatStructured<S extends ZodTypeAny>(
  opts: ChatStructuredOptions<S>,
): Promise<ChatStructuredResult<S>> {
  const start = Date.now();
  const tpl = await loadPrompt(opts.promptKey, opts.promptVersion);
  const systemBody = renderPrompt(tpl.body, opts.vars);
  const model = opts.model ?? Models.fast;

  const openai = getOpenAI();
  let raw = '';
  try {
    const completion = await openai.chat.completions.create({
      model,
      temperature: opts.temperature ?? 0.4,
      response_format: { type: 'json_object' },
      max_tokens: opts.maxOutputTokens ?? 2000,
      messages: [
        { role: 'system', content: systemBody },
        ...(opts.userMessage ? [{ role: 'user' as const, content: opts.userMessage }] : []),
      ],
    });

    raw = completion.choices[0]?.message?.content ?? '';
    if (!raw) {
      throw new AIError({
        provider: 'openai',
        purpose: opts.purpose,
        message: 'Empty completion from OpenAI',
      });
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(raw);
    } catch (e) {
      throw new AISchemaValidationError({
        provider: 'openai',
        purpose: opts.purpose,
        message: 'Model returned invalid JSON',
        raw,
        issues: { jsonParseError: String(e) },
      });
    }

    const validated = opts.schema.safeParse(parsedJson);
    if (!validated.success) {
      throw new AISchemaValidationError({
        provider: 'openai',
        purpose: opts.purpose,
        message: 'AI output failed schema validation',
        raw,
        issues: validated.error.flatten(),
      });
    }

    const usage = completion.usage;
    return {
      data: validated.data,
      usage: {
        promptTokens: usage?.prompt_tokens ?? 0,
        completionTokens: usage?.completion_tokens ?? 0,
        totalTokens: usage?.total_tokens ?? 0,
        latencyMs: Date.now() - start,
        model,
        promptVersion: tpl.version,
      },
    };
  } catch (err) {
    if (err instanceof AIError) throw err;
    throw new AIError({
      provider: 'openai',
      purpose: opts.purpose,
      message: err instanceof Error ? err.message : 'unknown OpenAI error',
      cause: err,
    });
  }
}

export interface ChatStreamOptions {
  promptKey: string;
  promptVersion?: number;
  vars: Record<string, string>;
  /** The running conversation (user/assistant turns), oldest first. */
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Stream a plain-text chat reply token-by-token. Unlike chatStructured (JSON
 * mode, awaited whole), this yields deltas as they arrive so the UI can render
 * them live — the difference between "instant-feeling" and a multi-second wait.
 * For conversational text only; structured/product-state outputs stay on
 * chatStructured.
 */
export async function* streamChat(opts: ChatStreamOptions): AsyncGenerator<string> {
  const tpl = await loadPrompt(opts.promptKey, opts.promptVersion);
  const system = renderPrompt(tpl.body, opts.vars);
  const openai = getOpenAI();
  const stream = await openai.chat.completions.create({
    model: opts.model ?? Models.fast,
    temperature: opts.temperature ?? 0.6,
    max_tokens: opts.maxOutputTokens ?? 800,
    stream: true,
    messages: [{ role: 'system', content: system }, ...opts.messages],
  });
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

export interface TranscribeInput {
  audio: ArrayBuffer | Blob;
  filename?: string;
  language?: 'en' | 'it';
  prompt?: string;
}

export interface TranscribeResult {
  text: string;
  language: string;
  durationSeconds?: number;
  latencyMs: number;
  model: string;
}

export async function transcribeAudio(input: TranscribeInput): Promise<TranscribeResult> {
  const start = Date.now();
  const openai = getOpenAI();
  const blob =
    input.audio instanceof Blob ? input.audio : new Blob([input.audio], { type: 'audio/webm' });
  const file = new File([blob], input.filename ?? 'audio.webm', {
    type: blob.type || 'audio/webm',
  });

  const res = await openai.audio.transcriptions.create({
    file,
    model: Models.stt,
    language: input.language,
    prompt: input.prompt,
    response_format: 'verbose_json',
  });

  return {
    text: (res as { text: string }).text,
    language: (res as { language?: string }).language ?? input.language ?? 'unknown',
    durationSeconds: (res as { duration?: number }).duration,
    latencyMs: Date.now() - start,
    model: Models.stt,
  };
}

export async function embed(text: string): Promise<number[]> {
  const openai = getOpenAI();
  const res = await openai.embeddings.create({
    model: Models.embedding,
    input: text,
  });
  const vec = res.data[0]?.embedding;
  if (!vec)
    throw new AIError({
      provider: 'openai',
      purpose: 'embedding',
      message: 'No embedding returned',
    });
  return vec;
}
