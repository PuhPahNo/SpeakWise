import { prisma } from '@speakwise/db';

export interface LoadedPrompt {
  key: string;
  version: number;
  body: string;
  inputs: string[];
}

const cache = new Map<string, LoadedPrompt>();

export async function loadPrompt(key: string, version?: number): Promise<LoadedPrompt> {
  const cacheKey = `${key}:${version ?? 'latest'}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const tpl = await prisma.promptTemplate.findFirst({
    where: { key, isEnabled: true, ...(version !== undefined ? { version } : {}) },
    orderBy: { version: 'desc' },
  });

  if (!tpl) throw new Error(`Prompt template not found: ${key}@${version ?? 'latest'}`);

  const loaded: LoadedPrompt = {
    key: tpl.key,
    version: tpl.version,
    body: tpl.body,
    inputs: tpl.inputs as string[],
  };
  cache.set(cacheKey, loaded);
  return loaded;
}

export function clearPromptCache() {
  cache.clear();
}

export function renderPrompt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, k: string) => {
    if (!(k in vars)) throw new Error(`Missing prompt variable: ${k}`);
    return vars[k] ?? '';
  });
}
