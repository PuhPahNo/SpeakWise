import { getOrCreateUser } from '@/lib/auth/current-user';
import { listVocabulary } from '@/server/services/vocabulary';
import Link from 'next/link';

export default async function VocabularyPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; dueForReview?: string }>;
}) {
  const params = await searchParams;
  const user = await getOrCreateUser();
  const items = await listVocabulary(user.id, {
    status: (params.status ?? undefined) as never,
    dueForReview: params.dueForReview === 'true',
  });
  const dueCount = (await listVocabulary(user.id, { dueForReview: true })).length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink-50">Vocabulary</h1>
          <p className="text-sm text-ink-200 mt-1">What Wise has put in your bank.</p>
        </div>
        {dueCount > 0 && (
          <Link
            href="/vocabulary/review"
            className="rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-5 py-2.5 text-sm whitespace-nowrap"
          >
            Review {dueCount} →
          </Link>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-ink-200 text-sm">
          No words yet. Complete a lesson and Wise will start building your bank.
        </p>
      ) : (
        <>
          {/* Card list — phones */}
          <ul className="sm:hidden space-y-2">
            {items.map((v) => (
              <li key={v.id} className="rounded-xl px-3 py-3 surface text-ink-50">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{v.targetText}</div>
                    <div className="text-sm text-ink-200 truncate">{v.nativeText}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-ink-200 shrink-0">
                    {v.status}
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden"
                  aria-label={`Mastery ${Math.round(Number(v.masteryScore) * 100)} percent`}
                >
                  <div
                    className="h-full bg-wise-500"
                    style={{ width: `${Number(v.masteryScore) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          {/* Table — tablets and up */}
          <table className="hidden sm:table w-full text-sm">
            <thead className="text-left text-ink-200 uppercase text-[11px] tracking-[0.15em]">
              <tr>
                <th className="py-2">Italian</th>
                <th>English</th>
                <th>Status</th>
                <th>Mastery</th>
              </tr>
            </thead>
            <tbody>
              {items.map((v) => (
                <tr key={v.id} className="border-t hairline">
                  <td className="py-2.5 font-medium text-ink-50">{v.targetText}</td>
                  <td className="text-ink-100">{v.nativeText}</td>
                  <td className="text-ink-200 capitalize">{v.status.replace(/_/g, ' ')}</td>
                  <td>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden w-32">
                      <div
                        className="h-full bg-wise-500 transition-all"
                        style={{ width: `${Number(v.masteryScore) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
