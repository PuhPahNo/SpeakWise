import { prisma } from '@speakwise/db';

export async function listPromptTemplates() {
  return prisma.promptTemplate.findMany({ orderBy: [{ key: 'asc' }, { version: 'desc' }] });
}

export async function togglePromptTemplate(id: string, enabled: boolean) {
  return prisma.promptTemplate.update({ where: { id }, data: { isEnabled: enabled } });
}

export async function listFeatureFlags() {
  return prisma.featureFlag.findMany({ orderBy: { key: 'asc' } });
}

export async function setFeatureFlag(key: string, enabled: boolean, rolloutPct = 100) {
  return prisma.featureFlag.upsert({
    where: { key },
    create: { key, enabled, rolloutPct },
    update: { enabled, rolloutPct },
  });
}

export async function aiUsageSummary(sinceHours = 24) {
  const since = new Date(Date.now() - sinceHours * 60 * 60 * 1000);
  const events = await prisma.userEvent.findMany({
    where: { eventType: 'AICall', createdAt: { gte: since } },
    select: { payload: true, createdAt: true },
  });
  let totalCalls = 0;
  let totalTokensIn = 0;
  let totalTokensOut = 0;
  let failures = 0;
  const byPurpose: Record<string, number> = {};
  for (const e of events) {
    totalCalls++;
    const p = e.payload as Record<string, unknown>;
    totalTokensIn += Number(p.tokensIn ?? 0);
    totalTokensOut += Number(p.tokensOut ?? 0);
    if (p.ok === false) failures++;
    const purpose = String(p.purpose ?? 'unknown');
    byPurpose[purpose] = (byPurpose[purpose] ?? 0) + 1;
  }
  return { totalCalls, totalTokensIn, totalTokensOut, failures, byPurpose };
}
