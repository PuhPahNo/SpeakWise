// Splits a mixed Italian/English string into phrase-level spans tagged with
// the dominant language. Used by the multilingual TTS pipeline so each
// span can be synthesized with the proper `language_code`, giving correct
// Italian phonetics on Italian phrases and natural English elsewhere —
// without splitting into two different voices.
//
// Heuristic, not perfect — it handles the realistic case (English carrier
// sentences with Italian phrases sprinkled in) extremely well. The gold
// path in Phase 2 will have the LLM emit explicit spans; this module is
// the fallback for un-tagged text and a safety net forever.

export type SpanLang = 'it' | 'en';
export interface Span {
  lang: SpanLang;
  text: string;
}

// Italian-distinguishing markers. We keep the list tight on purpose — false
// positives are worse than false negatives because mis-tagging an English
// fragment as Italian makes it sound mangled, while a missed Italian word
// just sounds like an English speaker pronouncing one Italian word (still
// fine — same TTS voice).
const ITALIAN_DIACRITICS = /[àèéìòùÀÈÉÌÒÙ]/;

// Words/tokens that almost never appear in English text. Lower-cased.
// Includes stopwords, function words, and the most common Italian-only
// content words. Curated rather than exhaustive.
const ITALIAN_STRONG_WORDS = new Set([
  // greetings / pleasantries
  'ciao',
  'salve',
  'arrivederci',
  'buongiorno',
  'buonasera',
  'buonanotte',
  'grazie',
  'prego',
  'scusa',
  'scusi',
  'mi dispiace',
  // articles + contractions
  'il',
  'lo',
  'la',
  'gli',
  'le',
  "l'",
  'un',
  'uno',
  'una',
  "un'",
  'del',
  'dello',
  'della',
  'dei',
  'degli',
  'delle',
  'al',
  'allo',
  'alla',
  'ai',
  'agli',
  'alle',
  'dal',
  'dallo',
  'dalla',
  'dai',
  'dagli',
  'dalle',
  'nel',
  'nello',
  'nella',
  'nei',
  'negli',
  'nelle',
  'sul',
  'sullo',
  'sulla',
  'sui',
  'sugli',
  'sulle',
  // pronouns
  'io',
  'tu',
  'lui',
  'lei',
  'noi',
  'voi',
  'loro',
  'mi',
  'ti',
  'ci',
  'vi',
  'si',
  // very common verbs (forms of essere/avere/fare/andare/volere/potere/dovere/dire)
  'sono',
  'sei',
  'è',
  'siamo',
  'siete',
  'ho',
  'hai',
  'ha',
  'abbiamo',
  'avete',
  'hanno',
  'faccio',
  'fai',
  'fa',
  'facciamo',
  'fate',
  'fanno',
  'vado',
  'vai',
  'va',
  'andiamo',
  'andate',
  'vanno',
  'voglio',
  'vuoi',
  'vuole',
  'vogliamo',
  'volete',
  'vogliono',
  'vorrei',
  'vorresti',
  'vorrebbe',
  'posso',
  'puoi',
  'può',
  'possiamo',
  'potete',
  'possono',
  'devo',
  'devi',
  'deve',
  'dobbiamo',
  'dovete',
  'devono',
  'dico',
  'dici',
  'dice',
  'diciamo',
  'dite',
  'dicono',
  // common adverbs / connectors / interjections
  'sì',
  'no',
  'non',
  'molto',
  'tanto',
  'poco',
  'bene',
  'male',
  'oggi',
  'ieri',
  'domani',
  'sempre',
  'mai',
  'già',
  'ancora',
  'anche',
  'allora',
  'però',
  'perché',
  'dove',
  'quando',
  'come',
  'cosa',
  'chi',
  'quale',
  'quali',
  'quanto',
  'quanti',
  // common nouns/adjectives that are hallmark Italian and rare in English
  'cosa',
  'casa',
  'giorno',
  'tempo',
  'volta',
  'gente',
  'ragazzo',
  'ragazza',
  'bambino',
  'amico',
  'amica',
  'famiglia',
  'lavoro',
  'scuola',
  'cibo',
  'acqua',
  'pasta',
  'vino',
  'caffè',
  'piacere',
  'pronto',
  'certo',
  'magari',
  'davvero',
  'forse',
  'dunque',
  'quindi',
  // Italian-only set phrases
  'va bene',
  "d'accordo",
  'per favore',
  'per piacere',
  'di niente',
  'mi chiamo',
]);

// Italian-only function words (subset of above) — used for short fragment
// scoring where the strong-words set might miss content nouns.
const ITALIAN_FUNCTION_TOKENS = new Set([
  'il',
  'la',
  'lo',
  'gli',
  'le',
  'un',
  'una',
  'di',
  'da',
  'in',
  'su',
  'per',
  'con',
  'che',
  'chi',
  'è',
  'sono',
  'non',
  'sì',
  'mi',
  'ti',
  'ci',
  'vi',
  'si',
  'al',
  'alla',
  'del',
  'della',
  'nel',
  'nella',
]);

// Italian morphology: typical word endings that English doesn't share.
// Used as a tiebreaker for unknown words.
const ITALIAN_ENDINGS = [
  'are',
  'ere',
  'ire', // infinitives
  'ato',
  'ata',
  'ati',
  'ate',
  'uto',
  'uta',
  'uti',
  'ute',
  'ito',
  'ita',
  'iti',
  'ite', // participles
  'ando',
  'endo', // gerunds
  'azione',
  'zione',
  'mente', // common derivations
  'aggio',
  'eggio', // common nominal endings
];

const TOKEN_RE = /[A-Za-zÀ-ÖØ-öø-ÿ']+/g;

function tokenize(text: string): string[] {
  const out: string[] = [];
  for (const match of text.matchAll(TOKEN_RE)) {
    out.push(match[0].toLowerCase());
  }
  return out;
}

/**
 * Score a fragment as Italian-likely. Higher = more Italian.
 * Range: 0..1 roughly.
 */
export function italianScore(text: string): number {
  if (!text.trim()) return 0;
  if (ITALIAN_DIACRITICS.test(text)) return 1; // hard signal
  const tokens = tokenize(text);
  if (tokens.length === 0) return 0;
  let italianHits = 0;
  let strongHits = 0;
  for (const t of tokens) {
    if (ITALIAN_STRONG_WORDS.has(t)) {
      italianHits++;
      strongHits++;
      continue;
    }
    if (ITALIAN_FUNCTION_TOKENS.has(t)) {
      italianHits++;
      continue;
    }
    if (ITALIAN_ENDINGS.some((suf) => t.length >= suf.length + 2 && t.endsWith(suf))) {
      // morphology hint — half-weight
      italianHits += 0.5;
    }
  }
  // Strong word presence is decisive even at 1/N density; otherwise look at
  // density of weaker hits.
  if (strongHits > 0) return Math.min(1, 0.7 + 0.1 * strongHits);
  return Math.min(1, italianHits / tokens.length);
}

/**
 * Phrase splitter — splits at strong punctuation while keeping the
 * punctuation attached to the preceding chunk so cadence is preserved.
 */
function splitPhrases(text: string): string[] {
  // Split at: . ! ? ; : — — and em-dash, but keep the delimiter on the prefix.
  // We DO NOT split on commas — too granular and breaks Italian/English
  // mixed clauses awkwardly.
  const parts: string[] = [];
  const re = /([^.!?;:—–]+[.!?;:—–]?)/g;
  for (const match of text.matchAll(re)) {
    const chunk = (match[1] ?? '').trim();
    if (chunk) parts.push(chunk);
  }
  return parts.length > 0 ? parts : [text];
}

/**
 * Split text into language-tagged spans.
 *
 * Algorithm: split into phrases by strong punctuation, score each, group
 * adjacent same-language phrases together. Threshold defaults to 0.3 —
 * conservative on calling something Italian, since misclassifying English
 * as Italian sounds worse than the reverse.
 */
export function segmentMixedText(text: string, opts: { italianThreshold?: number } = {}): Span[] {
  const threshold = opts.italianThreshold ?? 0.3;
  const phrases = splitPhrases(text);
  const tagged: Span[] = phrases.map((p) => ({
    lang: italianScore(p) >= threshold ? 'it' : 'en',
    text: p,
  }));
  // Merge adjacent same-language spans, separated by a single space, so
  // we make as few TTS calls as possible.
  const merged: Span[] = [];
  for (const s of tagged) {
    const last = merged[merged.length - 1];
    if (last && last.lang === s.lang) {
      last.text = `${last.text} ${s.text}`;
    } else {
      merged.push({ ...s });
    }
  }
  return merged;
}
