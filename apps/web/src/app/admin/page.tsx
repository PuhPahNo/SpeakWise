import { aiUsageSummary, listFeatureFlags, listPromptTemplates } from '@/server/services/admin';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const [prompts, flags, usage] = await Promise.all([
    listPromptTemplates(),
    listFeatureFlags(),
    aiUsageSummary(24),
  ]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="sect-title mb-3">AI usage (last 24h)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Calls" value={usage.totalCalls.toLocaleString()} />
          <Stat label="Tokens in" value={usage.totalTokensIn.toLocaleString()} />
          <Stat label="Tokens out" value={usage.totalTokensOut.toLocaleString()} />
          <Stat label="Failures" value={usage.failures.toLocaleString()} />
        </div>
      </section>

      <section>
        <h2 className="sect-title mb-3">Prompt templates</h2>
        <div className="card card-pad overflow-x-auto">
          <table className="w-full min-w-[480px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-ink-300">
              <tr>
                <th className="py-2">Key</th>
                <th>v</th>
                <th>Purpose</th>
                <th>Enabled</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((p) => (
                <tr key={p.id} className="border-t hairline">
                  <td className="py-2 font-mono text-ink-100">{p.key}</td>
                  <td className="text-ink-200">{p.version}</td>
                  <td className="text-ink-200">{p.purpose}</td>
                  <td className="text-ink-200">{p.isEnabled ? 'on' : 'off'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="sect-title mb-3">Feature flags</h2>
        {flags.length === 0 ? (
          <p className="text-sm text-ink-300">None.</p>
        ) : (
          <ul className="space-y-1 text-sm text-ink-200">
            {flags.map((f) => (
              <li key={f.id}>
                <code className="text-ink-100">{f.key}</code> · {f.enabled ? 'on' : 'off'} ·{' '}
                {f.rolloutPct}%
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card card-pad">
      <div className="eyebrow">{label}</div>
      <div className="mini-val mt-1 text-ink-50">{value}</div>
    </div>
  );
}
