import { getOrCreateUser } from '@/lib/auth/current-user';
import { listVocabulary } from '@/server/services/vocabulary';

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

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl mb-6">Vocabulary</h1>
      {items.length === 0 ? (
        <p className="text-ink-600">
          No words yet. Complete a lesson and Wise will start building your bank.
        </p>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-left text-ink-500 uppercase text-xs">
            <tr>
              <th className="py-2">Italian</th>
              <th>English</th>
              <th>Status</th>
              <th>Mastery</th>
            </tr>
          </thead>
          <tbody>
            {items.map((v) => (
              <tr key={v.id} className="border-t border-ink-100">
                <td className="py-2 font-medium">{v.targetText}</td>
                <td>{v.nativeText}</td>
                <td className="text-ink-600">{v.status}</td>
                <td>
                  <div className="h-1.5 bg-ink-100 rounded-full overflow-hidden w-24">
                    <div
                      className="h-full bg-wise-500"
                      style={{ width: `${Number(v.masteryScore) * 100}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
