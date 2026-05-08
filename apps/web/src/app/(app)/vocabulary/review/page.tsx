import { VocabReview } from '@/components/vocabulary/vocab-review';
import { getOrCreateUser } from '@/lib/auth/current-user';
import { listVocabulary } from '@/server/services/vocabulary';
import Link from 'next/link';

export default async function VocabReviewPage() {
  const user = await getOrCreateUser();
  // Pull due items first; if none, fall back to "learning" status.
  let items = await listVocabulary(user.id, { dueForReview: true });
  if (items.length === 0) {
    items = await listVocabulary(user.id, { status: 'learning' });
  }

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 py-10 text-center">
        <h1 className="font-display text-2xl text-ink-50">Nothing due</h1>
        <p className="text-sm text-ink-200 mt-3">
          You&apos;re caught up on reviews. Come back tomorrow, or run today&apos;s mission to add
          new words.
        </p>
        <Link
          href="/command-center"
          className="mt-8 inline-flex rounded-full bg-wise-500 hover:bg-wise-600 text-ink-900 font-medium px-6 py-3"
        >
          Back home
        </Link>
      </div>
    );
  }

  const cards = items.slice(0, 20).map((v) => ({
    id: v.id,
    targetText: v.targetText,
    nativeText: v.nativeText,
    exampleSentence: v.exampleSentence,
    exampleTranslation: v.exampleTranslation,
  }));

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      <VocabReview cards={cards} />
    </div>
  );
}
