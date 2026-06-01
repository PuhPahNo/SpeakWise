// Deterministic grader for objective task types.
//
// The LLM corrector occasionally mis-grades — telling a learner their exactly
// correct answer is wrong (false-incorrect), or worse, that a wrong answer is
// right (false-correct). For a no-tutor beginner that teaches the wrong thing.
//
// For task types with a knowable answer we grade by normalized matching FIRST
// and let that verdict win. The LLM still writes the friendly explanation; we
// only override its true/false verdict (and reconcile the text when they
// disagree). Open-ended types (speaking_prompt, roleplay, error_correction,
// reflection) are left entirely to the LLM — there is no single right answer.

/** Accent-fold: "caffè" → "caffe" (so a missing accent never fails a learner). */
function stripDiacritics(s: string): string {
  return s.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

/** Normalize for comparison: lowercase, unify quotes, collapse + trim edges. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[\s.,!?;:"']+|[\s.,!?;:"']+$/g, '');
}

function answersEqual(a: string, b: string): boolean {
  const na = norm(a);
  const nb = norm(b);
  if (na === nb) return true;
  return stripDiacritics(na) === stripDiacritics(nb);
}

/** Split an answer string into explicit alternatives ("venti / trenta", "a | in"). */
function splitAlternatives(s: string): string[] {
  return s
    .split(/\s*\/\s*|\s*\|\s*|\s+\bor\b\s+/i)
    .map((x) => x.trim())
    .filter(Boolean);
}

/**
 * Pull the set of acceptable answer strings out of a task's expectedAnswer,
 * which Prisma stores as Json and may be: a string (possibly with "/"
 * alternatives), an array, a {value}/{answer}/{text} object, or a primitive.
 */
export function acceptableAnswers(expected: unknown): string[] {
  if (expected == null) return [];
  if (typeof expected === 'string') return splitAlternatives(expected);
  if (typeof expected === 'number' || typeof expected === 'boolean') return [String(expected)];
  if (Array.isArray(expected)) return expected.flatMap((e) => acceptableAnswers(e));
  if (typeof expected === 'object') {
    const o = expected as Record<string, unknown>;
    const v = o.value ?? o.answer ?? o.text ?? o.correct;
    return v != null ? acceptableAnswers(v) : [];
  }
  return [];
}

/** First acceptable answer in its original form, for user-facing messaging. */
export function firstAcceptableDisplay(expected: unknown): string | null {
  if (typeof expected === 'string') {
    const alts = splitAlternatives(expected);
    return alts[0] ?? expected.trim() ?? null;
  }
  if (Array.isArray(expected) && expected.length > 0) return firstAcceptableDisplay(expected[0]);
  if (expected && typeof expected === 'object') {
    const o = expected as Record<string, unknown>;
    const v = o.value ?? o.answer ?? o.text ?? o.correct;
    if (v != null) return firstAcceptableDisplay(v);
  }
  if (typeof expected === 'number' || typeof expected === 'boolean') return String(expected);
  return null;
}

type Option = { value?: unknown; label?: unknown };

/** True if the answer matches the LABEL of the option whose value is the expected one. */
function matchesExpectedOptionLabel(options: unknown, expected: unknown, answer: string): boolean {
  if (!Array.isArray(options)) return false;
  const accepted = acceptableAnswers(expected);
  for (const opt of options as Option[]) {
    const val = opt?.value != null ? String(opt.value) : '';
    const label = opt?.label != null ? String(opt.label) : '';
    if (accepted.some((a) => answersEqual(a, val)) && label && answersEqual(label, answer)) {
      return true;
    }
  }
  return false;
}

/**
 * Grade an objective task deterministically.
 *
 * Returns `{ correct }` when we are confident, or `null` to defer to the LLM.
 * - multiple_choice / tense_selection: authoritative BOTH ways (a closed set
 *   with one known-correct option) — kills false-correct and false-incorrect.
 * - fill_blank / conjugation / pronoun_replacement / translation: override to
 *   `correct` on a confident match (kills the painful false-incorrect), but a
 *   non-match returns `null` — an unlisted-but-valid alternative shouldn't be
 *   auto-failed; the LLM decides.
 * - anything else: `null` (open-ended; LLM only).
 */
export function gradeObjective(input: {
  taskType: string;
  expectedAnswer: unknown;
  options?: unknown;
  answer: string;
}): { correct: boolean } | null {
  const answer = input.answer?.trim() ?? '';
  if (!answer) return null;

  const accepted = acceptableAnswers(input.expectedAnswer);
  if (accepted.length === 0) return null;

  const isMatch =
    accepted.some((a) => answersEqual(a, answer)) ||
    matchesExpectedOptionLabel(input.options, input.expectedAnswer, answer);

  switch (input.taskType) {
    case 'multiple_choice':
    case 'tense_selection':
      return { correct: isMatch };
    case 'fill_blank':
    case 'conjugation':
    case 'pronoun_replacement':
    case 'translation':
      return isMatch ? { correct: true } : null;
    default:
      return null;
  }
}
