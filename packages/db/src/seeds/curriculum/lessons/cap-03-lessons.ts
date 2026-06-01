// Additional lesson templates for Capitolo 3 — Studiare in Italia.
//
// These EXTEND the five templates authored inline in units/cap-03-studiare-in-italia.ts.
// The index merges both sets. This file follows the same rules as SPEC.md:
// original content; every in-string apostrophe is the curly ' (U+2019);
// slugs are globally unique and must not collide with the inline template
// slugs (cap03-the-are-engine, cap03-four-rebels, cap03-my-family-tree,
// cap03-what-do-you-study, cap03-progress-check).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-03';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Focused drill: -care / -gare spelling rule ─────────────────────────
  {
    slug: 'cap03-drill-care-gare-spelling',
    title: 'cerchi o cerci? — the hard-sound spelling drill',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Lock in the h-insertion rule for -care and -gare verbs before -i endings. ' +
      'Short reps on cercare, pagare, giocare, and spiegare — the four that trip everyone up.',
    objectiveSkillSlugs: ['it-regular-are-verbs-present'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Why the h appears',
        prompt:
          'Cercare has a hard c. Before the -i ending (tu), the spelling must protect that sound: ' +
          'cerco → cerchi, not cerci. Same with pagare → paghi. The h is a spelling bridge, not a letter you hear.',
        notes:
          'Show the contrast with mangiare (no h needed) to close the loop on the two sub-rules.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Insert the h where needed',
        prompt:
          'Complete each form: "Tu ___ (cercare) un appartamento. ' +
          'Tu ___ (pagare) il conto. ' +
          'Tu ___ (mangiare) tardi."',
        exampleAnswer: 'cerchi, paghi, mangi',
        notes: 'The third item has no h — confirm the learner does not over-apply the rule.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Spot the wrong spelling',
        prompt:
          'Find and fix the error: "Il professore spieghi la grammatica ogni giorno." ' +
          '(Hint: this is the third-person singular, not tu.)',
        exampleAnswer: 'Il professore spiega la grammatica ogni giorno.',
        notes:
          'The h is only needed before -i (tu); the lui/lei ending is -a and needs no h. ' +
          'A classic over-correction error.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Full paradigm of pagare',
        prompt: 'Conjugate pagare for all six persons.',
        exampleAnswer: 'pago, paghi, paga, paghiamo, pagate, pagano',
        notes: 'Note that noi also takes h (paghiamo) — before -iamo the rule also applies.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The rule in one sentence',
        prompt: 'Complete: "-care and -gare verbs add ___ before endings that begin with ___."',
        notes: 'Expected: h / -i (or -iamo).',
      },
    ],
  },

  // ── 2. Focused drill: ciare / -giare no-double-i rule ─────────────────────
  {
    slug: 'cap03-drill-ciare-giare-no-double-i',
    title: 'mangi, non mangii — the -ciare/-giare rule',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Mangiare, cominciare, viaggiare — these verbs already carry the i in their stem, ' +
      'so the tu and noi forms never double it. A fast drill to stamp out the "mangii" mistake for good.',
    objectiveSkillSlugs: ['it-regular-are-verbs-present'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['food', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The stem already ends in i',
        prompt:
          'Mangiare → stem is mangi-. The tu ending is -i, but the stem already ends in i: ' +
          'mangi + i would give "mangii." Italian drops the extra i: tu mangi. ' +
          'Same for cominciare (cominci) and viaggiare (viaggi).',
        notes: 'Contrast with cercare (cerchi) so the learner sees the two rules side by side.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Which form is correct?',
        prompt:
          'Quale forma è corretta? "Tu ___ (viaggiare) molto per lavoro." — viaggi / viaggii / viagghii?',
        exampleAnswer: 'viaggi',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Noi form — same rule',
        prompt:
          'Complete: "Noi ___ (cominciare) il corso lunedì. Noi ___ (mangiare) insieme stasera."',
        exampleAnswer: 'cominciamo, mangiamo',
        notes:
          'The noi ending is -iamo; the stem already has i, so cominciare → cominci- + amo = cominciamo. ' +
          'Show the merge clearly.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Correct the double-i',
        prompt: 'Fix: "Noi mangiamo la pasta, ma tu mangii solo pizza?"',
        exampleAnswer: 'Noi mangiamo la pasta, ma tu mangi solo pizza?',
      },
      {
        taskType: TaskType.recap,
        focus: 'Rule summary',
        prompt:
          'Complete: "When a -are verb stem already ends in -i (like mangi-), ' +
          'the tu and noi endings ___ the extra i."',
        notes: 'Expected: drop / do not add.',
      },
    ],
  },

  // ── 3. Focused drill: dare / stare paradigms + idioms ─────────────────────
  {
    slug: 'cap03-drill-dare-stare',
    title: 'dare e stare — the calm irregulars',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Dare and stare are irregular but follow a clear pattern. ' +
      'Drill both paradigms and lock in the four key idioms: dare un esame, dare del tu, stare bene/male, stare attento.',
    objectiveSkillSlugs: ['it-dare-stare-andare-fare'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The paradigms side by side',
        prompt:
          'dare: do, dai, dà, diamo, date, danno. ' +
          'stare: sto, stai, sta, stiamo, state, stanno. ' +
          'Both look similar in noi/voi/loro — the surprise is the io form (do, sto) and the accent on dà.',
        notes: 'Flag the written accent on dà (to distinguish it from the preposition da).',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Complete the dare table',
        prompt: 'Give all six forms of dare.',
        exampleAnswer: 'do, dai, dà, diamo, date, danno',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'dare un esame in context',
        prompt:
          'Complete: "Domani ___ (io, dare) l’esame di storia. ' +
          'I professori ___ (dare) sempre esami orali."',
        exampleAnswer: 'do, danno',
        notes:
          'dare un esame = to take an exam (false friend: "take" in English, "give" in Italian). ' +
          'Worth flagging the idiom explicitly.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'stare bene vs essere bene',
        prompt: '"Come ___?" — Which verb completes the standard greeting: A) sei  B) stai  C) hai',
        exampleAnswer: 'B) stai',
        notes:
          '"Sono bene" is a classic English-speaker error; stare handles ongoing states and health.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce both verbs',
        prompt: 'Translate: "I’m doing well and tomorrow I’m taking the economics exam."',
        exampleAnswer: 'Sto bene e domani do l’esame di economia.',
      },
    ],
  },

  // ── 4. Focused drill: andare / fare paradigms + constructions ─────────────
  {
    slug: 'cap03-drill-andare-fare',
    title: 'vado a fare — andare and fare in motion',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Master the full paradigms of andare and fare, then build fluency with the ' +
      '"andare a + infinitive" construction and high-value fare idioms: fare colazione, fare la spesa, fare una domanda.',
    objectiveSkillSlugs: ['it-dare-stare-andare-fare'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Two surprises: vado and faccio',
        prompt:
          'The io forms are the tricky ones: andare → vado (not "ando"), fare → faccio (not "faro"). ' +
          'The rest follows: vai/va/andiamo/andate/vanno; fai/fa/facciamo/fate/fanno.',
        notes: 'Anchor vado and faccio as the two "must memorize" forms before anything else.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'All six forms of andare',
        prompt: 'Conjugate andare for all six persons.',
        exampleAnswer: 'vado, vai, va, andiamo, andate, vanno',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'andare a + infinitive',
        prompt:
          'Complete with the right form of andare: ' +
          '"Io ___ a studiare dopo cena. Mia sorella ___ a fare la spesa. ' +
          'Noi ___ a mangiare in famiglia domenica."',
        exampleAnswer: 'vado, va, andiamo',
        notes:
          'Emphasize that andare a + infinitive signals a near-future plan — ' +
          'a frame the learner can re-use immediately.',
      },
      {
        taskType: TaskType.translation,
        focus: 'fare idiom in a sentence',
        prompt:
          'Translate: "Every morning my parents have breakfast together and my mother does the shopping."',
        exampleAnswer:
          'Ogni mattina i miei genitori fanno colazione insieme e mia madre fa la spesa.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your plan for later',
        prompt:
          'Using andare a + infinitive, tell me two things you are going to do today or tomorrow.',
        notes:
          'Pull the learner’s schedule or interests from the profile to personalize the prompt. ' +
          'Reward any correct vado/andiamo/va construction.',
      },
    ],
  },

  // ── 5. Focused drill: possessive adjectives + article agreement ───────────
  {
    slug: 'cap03-drill-possessive-adj-agreement',
    title: 'il mio / la mia — making possessives agree',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'The possessive agrees with the THING owned, not the owner — and it nearly always ' +
      'carries the definite article. Drill all four forms of mio, the invariable loro, and the suo ambiguity.',
    objectiveSkillSlugs: ['it-possessive-adjectives'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'travel', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The agreement rule',
        prompt:
          'The possessive adjective agrees in gender and number with the noun it modifies, not with the person. ' +
          'So a woman says "il mio zaino" (m) and "la mia borsa" (f). ' +
          'Suo means his or hers — context tells you which.',
        notes:
          'Emphasize that suo/sua/suoi/sue are the most common source of errors for English speakers.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose the right possessive form',
        prompt:
          'Complete: "___ (my, m) libro è qui. ___ (her) sorella studia medicina. ' +
          '___ (our, f) università è antica."',
        exampleAnswer:
          'Il mio libro, sua sorella (or la sua sorella outside family context), la nostra università',
        notes:
          'For "her sister," accept both "sua sorella" (family article-drop rule applies) and ' +
          '"la sua sorella" — the article-drop skill will clarify the family exception.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'loro is invariable',
        prompt:
          '"___ figli studiano a Bologna." — Their: A) il loro  B) la loro  C) i loro  D) le loro',
        exampleAnswer: 'C) i loro (figli is m pl → article is i, not la or il)',
        notes: 'loro itself never changes; only the article changes to match the noun.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the agreement mistake',
        prompt: 'Fix: "Ho dimenticato la mio zaino in biblioteca."',
        exampleAnswer: 'Ho dimenticato il mio zaino in biblioteca.',
        notes: 'zaino is masculine — article and possessive must both be masculine.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce possessives in a sentence',
        prompt: 'Translate: "My courses are interesting but their exams are difficult."',
        exampleAnswer: 'I miei corsi sono interessanti ma i loro esami sono difficili.',
      },
    ],
  },

  // ── 6. Focused drill: questo vs quello forms ──────────────────────────────
  {
    slug: 'cap03-drill-questo-quello-forms',
    title: 'questo è semplice, quello no — demonstrative deep-dive',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'Questo follows the basic -o/-a/-i/-e pattern. Quello mirrors the definite article — ' +
      'quel, quello, quell’, quella, quei, quegli, quelle. Drill both until choosing the right form is automatic.',
    objectiveSkillSlugs: ['it-questo-quello'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The asymmetry',
        prompt:
          'Questo is easy: questo libro, questa materia, questi corsi, queste studentesse. ' +
          'Quello copies the article: quel professore (like il), quello studente (like lo), ' +
          'quell’esame (like l’), quella biblioteca (like la), quei corsi (like i), ' +
          'quegli esami (like gli), quelle materie (like le).',
        notes:
          'Recommend generating a two-column chart (il/lo/l’/la/i/gli/le | quel/quello/quell’/quella/quei/quegli/quelle) ' +
          'so the parallel is visible at a glance.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'questo — straightforward forms',
        prompt:
          'Complete: "___ (this, m) corso inizia lunedì. ' +
          '___ (this, f) biblioteca è aperta fino alle venti. ' +
          '___ (these, m pl) esami sono difficili."',
        exampleAnswer: 'Questo corso, questa biblioteca, questi esami',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'quello — choose the right variant',
        prompt:
          'Complete with the correct form of quello: ' +
          '"___ professore insegna bene. ' +
          '___ studente si chiama Marco. ' +
          '___ esame è domani. ' +
          '___ materie sono obbligatorie."',
        exampleAnswer: 'quel professore, quello studente, quell’esame, quelle materie',
        notes:
          'The jump from quel to quello (s+cons trigger) is the most common error. ' +
          'Flag it explicitly if the learner gets quello studente wrong.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the wrong quello form',
        prompt:
          'Fix the errors: "Quello professore da spiegazioni chiare. Quelli corsi sono interessanti."',
        exampleAnswer: 'Quel professore dà spiegazioni chiare. Quei corsi sono interessanti.',
        notes:
          'Two errors: quello → quel (regular consonant); quelli does not exist as a demonstrative adjective — quei.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Use both demonstratives',
        prompt: 'Translate: "This exam is tomorrow; those libraries are closed on Sunday."',
        exampleAnswer: 'Questo esame è domani; quelle biblioteche sono chiuse domenica.',
      },
    ],
  },

  // ── 7. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap03-clinic-possessives-article',
    title: 'Article clinic: four classic possessive mistakes',
    lessonType: LessonType.grammar,
    level: CEFRLevel.beginner,
    summary:
      'A targeted error-correction session on the most common cap-03 slips: ' +
      'article with possessives, the family exception and its four restore-conditions, ' +
      'and questo/quello agreement. Fix sentences, explain why, and move on clean.',
    objectiveSkillSlugs: ['it-possessive-adjectives', 'it-possessives-family', 'it-questo-quello'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The three traps',
        prompt:
          'Three things trip up almost everyone in Capitolo 3: ' +
          '(1) forgetting the article before possessives, ' +
          '(2) mis-applying the family article-drop rule, ' +
          '(3) picking the wrong questo or quello form. ' +
          'Let’s fix them now so they don’t haunt you.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Missing article',
        prompt: 'Fix: "Ho dimenticato mia borsa e mio zaino."',
        exampleAnswer: 'Ho dimenticato la mia borsa e il mio zaino.',
        notes:
          'borsa and zaino are not family nouns, so the article is required. ' +
          'A frequent transfer error from learners who half-remember the family rule.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Family article-drop — wrong direction',
        prompt:
          'Fix the sentence where the rule is applied incorrectly: ' +
          '"La mia sorella lavora a Roma. I miei fratello studia lingue."',
        exampleAnswer:
          'Mia sorella lavora a Roma. (drop article — singular unmodified family noun) ' +
          'I miei fratelli studiano lingue. (plural → article stays; also fratello → fratelli)',
        notes:
          'Two different errors: article kept when it should drop; article correct but noun not pluralized.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Restore conditions for the article',
        prompt:
          'Which of these sentences is correct? Fix the wrong ones. ' +
          '"Mia mamma cucina bene." — "Il mio fratello maggiore abita a Napoli." — "Loro padre è avvocato."',
        exampleAnswer:
          'La mia mamma cucina bene. (affectionate form → article stays) ' +
          'Il mio fratello maggiore abita a Napoli. (modified → article stays — already correct) ' +
          'Il loro padre è avvocato. (loro → article always stays)',
        notes:
          'Three sentences; the middle one is already correct — tests discrimination, not just correction.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'questo/quello agreement',
        prompt: 'Fix: "Queste professore è bravissimo. Quello materie sono difficili."',
        exampleAnswer: 'Questo professore è bravissimo. Quelle materie sono difficili.',
        notes:
          'queste is f pl — professore is m sg (questo); ' +
          'quello is m sg — materie is f pl (quelle).',
      },
      {
        taskType: TaskType.recap,
        focus: 'The three rules in three lines',
        prompt:
          'Summarize: (1) Possessives normally ___ the article. ' +
          '(2) Singular unmodified family nouns ___ the article. ' +
          '(3) quello before a regular consonant is ___.',
        notes: 'Expected: take / drop / quel.',
      },
    ],
  },

  // ── 8. Scenario roleplay: introduce your family at dinner ─────────────────
  {
    slug: 'cap03-roleplay-family-dinner',
    title: 'A cena con la famiglia — introduce everyone',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.beginner,
    summary:
      'Your new Italian friend invites you to Sunday dinner and asks about your family back home. ' +
      'Navigate introductions, describe family members, use possessives correctly, and keep the conversation warm.',
    objectiveSkillSlugs: [
      'it-vocab-family',
      'it-possessives-family',
      'it-possessive-adjectives',
      'it-regular-are-verbs-present',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re at a Sunday dinner in Perugia. Your host, Signora Ferretti, asks about your family. ' +
          'Use what you know: family nouns, possessives, -are verbs. Be warm, be real.',
        notes:
          'Use the learner’s actual family details from their profile wherever available. ' +
          'If no details are known, use a plausible default (two siblings, parents abroad).',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Name and place a family member',
        prompt:
          'Signora Ferretti asks: "Hai fratelli?" Describe one sibling — name, where they live, what they do.',
        exampleAnswer:
          'Sì, ho un fratello. Si chiama Luca e abita a New York. Lavora in un’agenzia di comunicazione.',
        notes: 'Listen for correct article-drop (mio fratello, not il mio fratello).',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Describe parents',
        prompt: 'She asks: "E i tuoi genitori?" Tell her what your parents do and where they live.',
        exampleAnswer:
          'Mio padre insegna alla scuola media e mia madre lavora in ospedale. ' +
          'Abitano in periferia, non lontano da qui.',
        notes:
          'Watch for correct plural possessive (i miei genitori) and ' +
          'correct article-drop on padre/madre (singular unmodified).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Talk about grandparents or extended family',
        prompt:
          'She is curious: "E i nonni?" Tell her about a grandparent or an aunt/uncle. ' +
          'Try to include one questo or quello.',
        notes:
          'Credit any natural use of demonstratives, even if not perfectly placed. ' +
          'Encourage the learner to point to something at the table for context.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Notice what worked',
        prompt:
          'Which family member was easiest to talk about? Which grammar rule felt natural and which still felt forced?',
        notes: 'Use the reflection to flag any weak points for the next session recommendation.',
      },
    ],
  },

  // ── 9. Scenario roleplay: study schedule to a new classmate ──────────────
  {
    slug: 'cap03-roleplay-study-schedule',
    title: 'Il mio orario — describing your study week',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.beginner,
    summary:
      'It’s the first week at the Università di Perugia. A new classmate asks about your schedule, ' +
      'your courses, and your professors. Use -are verbs, university vocab, and irregular dare/andare/fare.',
    objectiveSkillSlugs: [
      'it-vocab-university',
      'it-regular-are-verbs-present',
      'it-dare-stare-andare-fare',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['family', 'culture', 'history'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'First week of university in Perugia. You meet a fellow student, Sofia, in the hallway. ' +
          'She wants to know your schedule and subjects. Real Italian, real conversation.',
        notes:
          'Personalize to the learner’s own field of study if known from the profile. ' +
          'Default to a plausible mix: storia, lingue, economia.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Say what you study',
        prompt:
          'Sofia asks: "Cosa studi?" Tell her your main subject and one other course you’re taking.',
        exampleAnswer:
          'Studio lingue straniere come materia principale. ' +
          'Seguo anche un corso di storia medievale.',
        notes:
          'Target: correct use of studiare (regular -are) and seguire; also accept frequentare.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Talk about your professors',
        prompt:
          'She asks: "Com’è il professore di storia?" Describe your professor — good, strict, interesting?',
        exampleAnswer:
          'Il professore di storia è molto esigente ma spiega benissimo. ' +
          'Le sue lezioni sono lunghe ma interessanti.',
        notes: 'Check for correct possessive agreement on sue lezioni (f pl).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Exams and grades',
        prompt:
          'Complete Sofia’s question and your answer: ' +
          '"Quando ___ (dare) il primo esame? — ___ (dare) l’esame di storia la settimana prossima."',
        exampleAnswer: 'dai, do',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your ideal study day',
        prompt:
          'Describe your perfect study day using at least one form of andare, fare, and stare.',
        exampleAnswer:
          'Di mattina faccio colazione e vado in biblioteca. ' +
          'Nel pomeriggio sto in aula a seguire le lezioni.',
        notes:
          'Reward andare a + infinitive and stare + gerund constructions; do not require the gerund.',
      },
    ],
  },

  // ── 10. Listening challenge: a family tree described ─────────────────────
  {
    slug: 'cap03-listening-family-tree',
    title: 'Listening gym: follow the family tree',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.beginner,
    summary:
      'A brief audio description of an Italian family, narrated by a student in Perugia. ' +
      'Train your ear to catch family nouns, possessives, and the article-drop pattern in natural speech.',
    objectiveSkillSlugs: ['it-vocab-family', 'it-possessives-family'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Listening strategy',
        prompt:
          'You will hear a short passage in which a student describes their family. ' +
          'Listen for three things: how many siblings, where the parents live, and what the grandparents do.',
        notes:
          'Engine script: a student named Giulia describes her family of five — ' +
          'her parents (an accountant and a teacher) in Foligno, one older brother in Milan, ' +
          'and maternal grandparents who run a small bakery in Assisi. ' +
          'Naturally drop articles on mio fratello, mia madre, etc. Use 90–110 words.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Capture the key facts',
        prompt:
          'Answer: (1) How many siblings does Giulia have? ' +
          '(2) Where do her parents live? ' +
          '(3) What do her grandparents do?',
        exampleAnswer: '(1) One brother. (2) In Foligno. (3) They run a bakery in Assisi.',
        notes: 'Allow approximate answers (e.g., "in a town in Umbria" for Foligno).',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Catch the possessive',
        prompt:
          'Which possessive phrase did you hear? ' +
          'A) la mia sorella  B) mio fratello  C) il mio fratello',
        exampleAnswer: 'B) mio fratello',
        notes:
          'Tests whether the learner notices the article-drop on the singular unmodified family noun.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening anchor',
        prompt:
          'What clue told you the grandmother — not the grandfather — runs the bakery? ' +
          '(i.e., which gender marker did you hear?)',
        notes: 'Expected: mia nonna / la mia nonna — the feminine possessive.',
      },
    ],
  },

  // ── 11. Speaking challenge: talk about your real family and studies ────────
  {
    slug: 'cap03-speaking-real-family-studies',
    title: 'Parla di te — your family and your studies, for real',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.beginner,
    summary:
      'No scripts. Describe your actual family and your studies (or work) in Italian. ' +
      'Six minutes of real output — possessives, family nouns, -are verbs, university vocab.',
    objectiveSkillSlugs: [
      'it-vocab-family',
      'it-vocab-university',
      'it-possessives-family',
      'it-regular-are-verbs-present',
      'it-dare-stare-andare-fare',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Open mic — just talk',
        prompt:
          'This session is all speaking. No fill-in-the-blanks, no multiple choice. ' +
          'Just you, Italian, and the topics you know best: your family and your studies.',
        notes: 'Load the learner’s profile to personalize every prompt that follows.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Describe your immediate family',
        prompt:
          'Tell me about the people you live with or your closest family members. ' +
          'Who are they, where do they live, what do they do?',
        notes:
          'Assess: correct article-drop on singular family nouns, correct possessive agreement, ' +
          'accurate use of -are verbs. Do not interrupt; note errors for the recap.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Your studies or field of work',
        prompt:
          'What do you study or what is your profession? ' +
          'Use at least one form each of fare, andare, and stare.',
        notes:
          'For learners still in school: use their actual subjects. ' +
          'For professionals: reframe as "Ho studiato... — I studied..." and encourage them to ' +
          'describe a former course or current learning goal.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Bring it together',
        prompt:
          'Tell me one thing a family member and you do differently — comparing routines, habits, or studies.',
        exampleAnswer:
          'Mio fratello fa sport ogni mattina, ma io faccio colazione tardi e poi vado subito in biblioteca.',
        notes:
          'Look for natural contrast structure (ma, invece) and correct verb agreement across subjects.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'What flows, what stalls',
        prompt:
          'Which sentence felt natural and which required you to pause and think? ' +
          'What would you want Wise to drill next?',
        notes:
          'Route the answer to the session-recommendation engine as a soft skill-priority signal.',
      },
    ],
  },

  // ── 12. Vocabulary review ─────────────────────────────────────────────────
  {
    slug: 'cap03-vocab-review-family-university',
    title: 'Flashcard sprint: famiglia e università',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.beginner,
    summary:
      'A fast-paced vocabulary sweep covering all core family members and university terms from cap-03 — ' +
      'with a special focus on the tricky ones: nipote, moglie, facoltà, and the subject-name words.',
    objectiveSkillSlugs: ['it-vocab-family', 'it-vocab-university'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Fast review',
        prompt:
          'A quick vocabulary sprint: family members first, then university life. ' +
          'I will ask for definitions, genders, and a sentence or two. Go.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'nipote — the ambiguous one',
        prompt:
          '"La nipote di Marco" refers to: ' +
          'A) Marco’s grandson  B) Marco’s granddaughter or niece  C) Marco’s nephew',
        exampleAnswer: 'B) granddaughter or niece (la nipote is feminine)',
        notes:
          'nipote is one of the most confusing family nouns for English speakers — ' +
          'gender determines the relationship (nephew/grandson vs niece/granddaughter).',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'University vocab in context',
        prompt:
          'Complete: "Voglio una ___ (degree) in medicina. ' +
          'Il ___ (grade) minimo per passare l’esame è 18. ' +
          'Studio in ___ (the library) ogni sera."',
        exampleAnswer: 'laurea, voto, biblioteca',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce family + university in one mini-paragraph',
        prompt:
          'Translate: "My cousin studies engineering at the faculty of sciences. ' +
          'Her professors give hard exams, but she always gets good grades."',
        exampleAnswer:
          'Mio cugino / mia cugina studia ingegneria alla facoltà di scienze. ' +
          'I suoi professori danno esami difficili, ma lei prende sempre buoni voti.',
        notes:
          'Accept mio cugino (m) or mia cugina (f) — prompt the learner to pick the one that matches their real cousin if known.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Tricky words check',
        prompt: 'Give the Italian with article for: wife, parents, nephew (m), faculty, oral exam.',
        exampleAnswer: 'la moglie, i genitori, il nipote, la facoltà, l’esame orale',
      },
    ],
  },
];

export default { unitCode, lessons };
