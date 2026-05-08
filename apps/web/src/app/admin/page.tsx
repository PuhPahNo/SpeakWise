import { getOrCreateUser } from '@/lib/auth/current-user';
import { aiUsageSummary, listFeatureFlags, listPromptTemplates } from '@/server/services/admin';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const user = await getOrCreateUser();
  if (user.role !== 'admin') redirect('/command-center');

  const [prompts, flags, usage] = await Promise.all([
    listPromptTemplates(),
    listFeatureFlags(),
    aiUsageSummary(24),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10">
      <h1 className="font-display text-2xl sm:text-3xl">Admin</h1>

      <section>
        <h2 className="font-display text-lg sm:text-xl mb-3">AI usage (last 24h)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          <Stat label="Calls" value={usage.totalCalls.toString()} />
          <Stat label="Tokens in" value={usage.totalTokensIn.toString()} />
          <Stat label="Tokens out" value={usage.totalTokensOut.toString()} />
          <Stat label="Failures" value={usage.failures.toString()} />
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg sm:text-xl mb-3">Prompt templates</h2>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full text-sm min-w-[480px] px-4 sm:px-0">
            <thead className="text-left text-ink-500 uppercase text-xs">
              <tr>
                <th className="py-2">Key</th>
                <th>v</th>
                <th>Purpose</th>
                <th>Enabled</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((p) => (
                <tr key={p.id} className="border-t border-ink-100">
                  <td className="py-2 font-mono">{p.key}</td>
                  <td>{p.version}</td>
                  <td>{p.purpose}</td>
                  <td>{p.isEnabled ? 'on' : 'off'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-xl mb-3">Feature flags</h2>
        {flags.length === 0 ? (
          <p className="text-ink-500 text-sm">None.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {flags.map((f) => (
              <li key={f.id}>
                <code>{f.key}</code> · {f.enabled ? 'on' : 'off'} · {f.rolloutPct}%
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
    <div className="rounded-2xl border border-ink-200 bg-white p-3 sm:p-4">
      <div className="text-[10px] sm:text-xs uppercase tracking-wider text-ink-500">{label}</div>
      <div className="font-display text-xl sm:text-2xl mt-1">{value}</div>
    </div>
  );
}
