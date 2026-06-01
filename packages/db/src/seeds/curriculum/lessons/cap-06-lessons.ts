// Additional lesson templates for Capitolo 6 — Buon appetito!
//
// These EXTEND the five templates authored inline in units/cap-06-buon-appetito.ts.
// The index merges both. This file follows SPEC.md exactly:
// — original content; every in-string apostrophe is the curly ' (U+2019);
// — slugs are globally unique and do NOT collide with the five inline slugs
//   (cap06-order-at-the-trattoria, cap06-mi-piace-mi-piacciono,
//    cap06-telling-the-waiter, cap06-lho-mangiata, cap06-a-tavola);
// — objectiveSkillSlugs reference real slugs from cap-06 or earlier chapters.

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-06';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Focused drill — gli vs le ──────────────────────────────────────────
  {
    slug: 'cap06-drill-gli-vs-le',
    title: 'Gli o le? — drilling him vs her (and them)',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'The single most common indirect-object-pronoun slip: using gli when you mean le and vice versa. ' +
      'This fast drill builds automatic gender awareness so you always know who you’re talking to.',
    objectiveSkillSlugs: ['it-indirect-object-pronouns'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'family', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'gli = to him / to them; le = to her',
        prompt:
          'Gli and le are mirror images: gli goes to a man (or a group), le goes to a woman. ' +
          'Both precede the verb. There is no "to him/her" confusion if you ask: woman or man?',
        notes:
          'Contrast with the direct object: lo (him) / la (her). The IOP pair is gli/le regardless of the direct-object pairing.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Choose the correct IOP',
        prompt:
          '___ porto il menù. (the customer is a woman)\n' +
          '___ consiglio il tiramisù. (talking about Marco)',
        exampleAnswer: 'Le porto il menù. / Gli consiglio il tiramisù.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Fix the gender error',
        prompt:
          'A learner wrote these two sentences — fix any that are wrong:\n' +
          '(a) Ho chiamato la chef e gli ho detto di aspettare.\n' +
          '(b) Il sommelier? Gli ho chiesto il conto.',
        exampleAnswer:
          '(a) Ho chiamato la chef e le ho detto di aspettare. (chef is female → le)\n' +
          '(b) Correct — il sommelier is male → gli is right.',
        notes: 'Force the learner to justify each answer, not just guess.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Replace a + person in four sentences',
        prompt:
          'Replace the underlined phrase with gli or le:\n' +
          '(a) Scrivo un messaggio a Giulia. → ___\n' +
          '(b) Porto il vino a Davide. → ___\n' +
          '(c) Dico la verità a loro. → ___\n' +
          '(d) Offro un caffè alla professoressa. → ___',
        exampleAnswer:
          '(a) Le scrivo un messaggio.\n' +
          '(b) Gli porto il vino.\n' +
          '(c) Gli dico la verità.\n' +
          '(d) Le offro un caffè.',
        notes:
          'Item (c) highlights that gli covers "them" as well — reinforce this after the learner answers.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The one question to ask',
        prompt: 'Before writing gli or le, what is the single question you must ask yourself?',
        exampleAnswer:
          'Is the person (or group) male/mixed or female? Male/mixed → gli; female → le.',
      },
    ],
  },

  // ── 2. Focused drill — piacere singular vs plural ────────────────────────
  {
    slug: 'cap06-piace-vs-piacciono',
    title: 'Piace o piacciono? — the agreement that trips everyone',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A tight drill on the piace / piacciono split: singular thing or activity → piace; plural thing → piacciono. ' +
      'Includes the past (è piaciuto/a/i/e) and dislike (non mi piace / non mi piacciono).',
    objectiveSkillSlugs: ['it-piacere'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'sports', 'music'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The subject — not the person — drives the verb',
        prompt:
          '"Mi piace il gelato" — il gelato is the grammatical subject; piace is third-person singular. ' +
          '"Mi piacciono i dolci" — i dolci is plural; the verb becomes piacciono. ' +
          'An infinitive always counts as singular: mi piace nuotare.',
        notes: 'Keep the explanation short; the drill that follows does the heavy lifting.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'piace or piacciono?',
        prompt:
          'Fill in the correct form:\n' +
          '(a) Mi ___ la bistecca ai ferri.\n' +
          '(b) Ti ___ i frutti di mare?\n' +
          '(c) A lei ___ cucinare il risotto.\n' +
          '(d) Non ci ___ le cipolle crude.\n' +
          '(e) Vi ___ il vino naturale?',
        exampleAnswer: '(a) piace; (b) piacciono; (c) piace; (d) piacciono; (e) piace',
        notes:
          'Item (e) is a trap: vino is singular even though it may feel "big" as a topic. Confirm after the answer.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce piace / piacciono from English',
        prompt:
          'Translate:\n' +
          '"Do you like grilled vegetables?" / "Yes, I love them — and I also like fish."',
        exampleAnswer:
          'Ti piacciono le verdure alla griglia? / Sì, mi piacciono molto — e mi piace anche il pesce.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Past tense agreement',
        prompt:
          'Complete with the past of piacere (è piaciut + correct ending):\n' +
          '(a) La zuppa? Mi ___ moltissimo.\n' +
          '(b) I tortellini? Ci ___ tantissimo.\n' +
          '(c) Il dolce? Non le ___ per niente.',
        exampleAnswer:
          '(a) è piaciuta (zuppa, f.); (b) sono piaciuti (tortellini, m. pl.); (c) è piaciuto (dolce, m.)',
        notes:
          'Reinforce: piacere uses essere in the past, and the participle agrees with the grammatical subject.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The decision tree',
        prompt:
          'Walk me through your decision: you want to say "I like the olives." What form do you choose and why?',
        exampleAnswer: 'Le olive → plural noun → piacciono; mi piacciono le olive.',
      },
    ],
  },

  // ── 3. Focused drill — interrogatives ─────────────────────────────────────
  {
    slug: 'cap06-drill-interrogatives',
    title: 'Chi, cosa, dove, quando, come, perché — question-word workout',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A rapid-fire drill across all eight Italian interrogatives, with special attention to com’è, ' +
      'quanto/quanta/quanti/quante agreement, and perché as both why and because.',
    objectiveSkillSlugs: ['it-interrogatives'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Eight words, unlimited questions',
        prompt:
          'Chi, cosa, dove, quando, come, perché, quanto, quale — these eight question words unlock ' +
          'every conversation. We’ll drill them fast and in context.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Choose the right interrogative',
        prompt:
          'Fill in the best question word:\n' +
          '(a) ___ costa il menù degustazione?\n' +
          '(b) ___ ha ordinato la bistecca? (asking who)\n' +
          '(c) ___ è buono, il pesce o la carne?\n' +
          '(d) ___ non hai finito il dolce?\n' +
          '(e) ___ arriva il cameriere?',
        exampleAnswer: '(a) Quanto; (b) Chi; (c) Quale; (d) Perché; (e) Quando',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'quanto agreement',
        prompt: 'Which is correct?\n' + '"___ acqua vuoi?" — Quanto / Quanta / Quanti',
        exampleAnswer: 'Quanta — acqua is feminine singular.',
        notes: 'Follow up with "quanti coperti?" and "quante portate?" to show all four forms.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Build questions from scratch',
        prompt:
          'Translate these restaurant questions into Italian:\n' +
          '(a) What is the soup like today?\n' +
          '(b) How much does a half-portion cost?\n' +
          '(c) Which dessert do you recommend?',
        exampleAnswer:
          '(a) Com’è la zuppa oggi?\n' +
          '(b) Quanto costa una mezza porzione?\n' +
          '(c) Quale dolce consiglia?',
        notes: 'Point out com’è as the standard elision — never "come è" in natural speech.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Rapid-fire at the table',
        prompt:
          'Ask me three quick questions about today’s specials using three different interrogatives.',
        notes: 'The engine plays the waiter; accept any three distinct question words.',
      },
    ],
  },

  // ── 4. Focused drill — pp agreement all four endings ─────────────────────
  {
    slug: 'cap06-drill-pp-agreement-endings',
    title: '-o, -a, -i, -e — past-participle agreement speed round',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A focused speed round drilling all four past-participle endings (-o/-a/-i/-e) triggered by a ' +
      'preceding direct object pronoun. Food nouns of every gender and number make the pattern concrete.',
    objectiveSkillSlugs: ['it-passato-prossimo-pp-agreement', 'it-direct-object-pronouns'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Four pronouns, four endings',
        prompt:
          'lo → participle ends in -o (l’ho mangiato)\n' +
          'la → participle ends in -a (l’ho mangiata)\n' +
          'li → participle ends in -i (li ho mangiati)\n' +
          'le → participle ends in -e (le ho mangiate)\n' +
          'The pronoun tells you the ending — no guessing needed.',
        notes:
          'Write the four rows on one visual. The agreement only fires when the DOP precedes the verb.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Supply the ending',
        prompt:
          'Add the correct participle ending:\n' +
          '(a) Il pane? L’ho comprat___.\n' +
          '(b) La mozzarella? L’ho assaggiat___.\n' +
          '(c) I funghi? Li ho troват___.\n' +
          '(d) Le zucchine? Le ho grigliат___.',
        exampleAnswer: '(a) -o; (b) -a; (c) -i; (d) -e',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Replace the object and adjust the ending',
        prompt:
          'Rewrite each sentence by replacing the direct object with a pronoun:\n' +
          '(a) Ho prenotato la sala privata.\n' +
          '(b) Abbiamo ordinato i vini bianchi.\n' +
          '(c) Ha cucinato le lasagne.',
        exampleAnswer:
          '(a) L’ho prenotata. (sala, f.)\n' +
          '(b) Li abbiamo ordinati. (vini, m. pl.)\n' +
          '(c) Le ha cucinate. (lasagne, f. pl.)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'No agreement when the object follows',
        prompt:
          'Mark each sentence C (correct) or F (fix it):\n' +
          '(a) Ho ordinata la bistecca.\n' +
          '(b) La bistecca? L’ho ordinata.\n' +
          '(c) Li ho mangiati tutti.',
        exampleAnswer:
          '(a) F → Ho ordinato la bistecca. (object after verb — no agreement)\n' +
          '(b) C\n' +
          '(c) C',
        notes:
          'Item (a) is the mirror error: adding agreement when the object is NOT a pronoun preceding the verb.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Trigger condition in one sentence',
        prompt:
          'Complete this rule: "A past participle with avere agrees in gender and number when ___."',
        exampleAnswer: 'when a direct object pronoun (lo, la, li, le) precedes the verb.',
      },
    ],
  },

  // ── 5. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap06-clinic-piacere-agreement-gli',
    title: 'Error clinic: piacere backwards, pp endings, gli vs le',
    lessonType: LessonType.grammar,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A targeted clinic on the three most common chapter errors: treating piacere like "like" in English, ' +
      'forgetting or misapplying past-participle agreement with pronouns, and swapping gli and le.',
    objectiveSkillSlugs: [
      'it-piacere',
      'it-passato-prossimo-pp-agreement',
      'it-indirect-object-pronouns',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three errors, one clinic',
        prompt:
          'This session targets the mistakes that survive even after drilling: piacere backwards, ' +
          'wrong participle endings, and gli for le. Fix each one and say why it was wrong.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Piacere — verb agreement with the subject',
        prompt:
          'Fix the following:\n' +
          '(a) Mi piacciono cucinare.\n' +
          '(b) A Marta piacciono il risotto.\n' +
          '(c) Le lasagne? Mi è piaciuto.',
        exampleAnswer:
          '(a) Mi piace cucinare. (infinitive → singular → piace)\n' +
          '(b) A Marta piace il risotto. (il risotto → singular → piace)\n' +
          '(c) Le lasagne? Mi sono piaciute. (le lasagne → f. pl. → sono piaciute)',
        notes: 'Each error type is distinct — discuss each fix individually before moving on.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Past-participle agreement with preceding DOP',
        prompt:
          'Fix if wrong:\n' +
          '(a) Le bruschette? Le ho mangiato.\n' +
          '(b) Il vino? Lo abbiamo bevuto.\n' +
          '(c) I carciofi? Li ha cucinata.',
        exampleAnswer:
          '(a) Le ho mangiate. (le → -e)\n' +
          '(b) Correct. (lo → -o)\n' +
          '(c) Li ha cucinati. (li → -i)',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Gli vs le',
        prompt:
          'A student’s paragraph about a dinner:\n' +
          '"Ho incontrato la chef. Gli ho fatto i complimenti per il menù. ' +
          'Poi ho parlato con il sommelier e le ho chiesto di consigliare un Barolo."',
        exampleAnswer:
          '"Le ho fatto i complimenti" — chef is female, so le.\n' +
          '"Gli ho chiesto" — sommelier is male, so gli.',
        notes:
          'Present the paragraph as a natural chunk; the learner must identify and fix both errors in context.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Apply all three correctly in one turn',
        prompt:
          'Tell me about a meal you enjoyed recently: use piacere correctly, mention one thing you ordered with a pronoun, and say something to/for the waiter.',
        notes:
          'Score on accuracy of the three target structures; fluency and vocabulary are secondary here.',
      },
    ],
  },

  // ── 6. Scenario roleplay — food allergy / dietary preference ─────────────
  {
    slug: 'cap06-roleplay-allergy',
    title: 'Ho un’allergia — telling the waiter what you can’t eat',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Navigating dietary restrictions in a real Italian restaurant: communicate an allergy or ' +
      'intolerance to the waiter, ask what dishes contain certain ingredients, and find a safe choice — ' +
      'using indirect object pronouns and interrogatives throughout.',
    objectiveSkillSlugs: [
      'it-indirect-object-pronouns',
      'it-interrogatives',
      'it-vocab-food-restaurant',
    ],
    defaultDurationMinutes: 11,
    compatibleThemes: ['food', 'travel', 'health'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’re at a trattoria and you need to tell the waiter about a dietary restriction. ' +
          'It might be a nut allergy, lactose intolerance, or vegetarianism — choose the one that fits your life.',
        notes:
          'Pull the learner’s real dietary preferences from their profile if available; otherwise offer three options to choose from.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Explain your restriction',
        prompt: 'Tell the waiter you have an allergy (or intolerance) and what you can’t eat.',
        exampleAnswer:
          'Scusi, ho un’allergia alle noci. Potrebbe dirmi quali piatti non le contengono?',
        notes: 'Reward any clear communication of the restriction, not just the model answer.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask about a specific dish',
        prompt: 'Ask the waiter whether the pasta dish of the day contains cream or butter.',
        exampleAnswer: 'La pasta del giorno contiene panna o burro?',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Indirect object in a recommendation',
        prompt:
          'The waiter says: "Posso consigliare un piatto alla signora?" ' +
          'Rewrite using the correct indirect object pronoun.',
        exampleAnswer: 'Posso consigliarle un piatto. / Le posso consigliare un piatto.',
        notes:
          'Accept both pre-verbal and infinitive-attached positions; note that both are standard.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Ask two follow-up questions',
        prompt:
          'The waiter suggests a fish dish. Ask two questions about it using different interrogatives.',
        exampleAnswer: 'Com’è preparato? È fatto con olio o burro?',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Real-life readiness',
        prompt:
          'Could you handle this conversation at a real Italian restaurant today? What would you still want to rehearse?',
      },
    ],
  },

  // ── 7. Scenario roleplay — order a full meal at a trattoria (different angle)
  {
    slug: 'cap06-roleplay-degustazione',
    title: 'Il menù degustazione — navigating a tasting menu',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A step up from a simple order: you’re at a fine trattoria that offers a tasting menu. ' +
      'Ask what’s included, use piacere to express preferences, and discuss what you tasted afterwards.',
    objectiveSkillSlugs: [
      'it-vocab-food-restaurant',
      'it-piacere',
      'it-interrogatives',
      'it-passato-prossimo-pp-agreement',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'You’ve arrived at a Bologna trattoria that offers a five-course menù degustazione. ' +
          'You want to know what’s in it before you commit. Let’s explore the menu and then debrief after the meal.',
        notes:
          'Adapt the suggested dishes to the learner’s food profile. Vegetarians get a vegetarian degustazione.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask what the tasting menu includes',
        prompt: 'Ask the waiter how many courses are included and what the dishes are.',
        exampleAnswer: 'Quante portate include il menù degustazione? Quali piatti ci sono?',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Express a preference before ordering',
        prompt: 'Tell the waiter one thing you love and one you’d prefer to avoid, using piacere.',
        exampleAnswer:
          'Mi piacciono moltissimo i primi al ragù. Non mi piace molto il fegato — c’è un’alternativa?',
        notes: 'The waiter should respond with a substitute — keep the interaction natural.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'React mid-meal',
        prompt: 'The primo has just arrived. Comment on it and ask what’s in the sauce.',
        exampleAnswer:
          'Che profumo! Cosa c’è nel sugo? — È un ragù di cinghiale con un po’ di rosmarino.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Debrief with past-participle agreement',
        prompt:
          'After the meal, translate: "The tagliatelle? I loved them. The dessert? I’d already eaten it, so I couldn’t finish it."',
        exampleAnswer:
          'Le tagliatelle? Le ho adorate. Il dolce? L’avevo già mangiato, quindi non sono riuscito a finirlo.',
        notes:
          'The second clause introduces avevo (pluperfect) — gloss it briefly without derailing the drill.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Three new phrases to keep',
        prompt:
          'Which three expressions from this tasting-menu experience would you actually use in Italy next week?',
      },
    ],
  },

  // ── 8. Listening challenge ────────────────────────────────────────────────
  {
    slug: 'cap06-listening-what-did-they-order',
    title: 'Listening gym: what did they order — and did they like it?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'Three short, natural exchanges at a trattoria. Train your ear to catch the order, the preference ' +
      'expressed with piacere, and any indirect object pronouns that fly past.',
    objectiveSkillSlugs: ['it-vocab-food-restaurant', 'it-piacere', 'it-indirect-object-pronouns'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Ear training at the table',
        prompt:
          'You’ll hear three short exchanges. For each one, note: (1) what was ordered, ' +
          '(2) whether the person liked it, (3) any pronoun used for "to him/her/us".',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Exchange 1 — ordering the primo',
        prompt: 'What did the diner order and what did the waiter recommend?',
        notes:
          'Script hint: waiter asks "Cosa le porto come primo?"; diner orders tagliatelle after hearing a recommendation. ' +
          'Engine generates the full script — keep it under 40 words per speaker.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Exchange 2 — did they like it?',
        prompt: 'How does the diner express their opinion of the dish? Quote the key phrase.',
        exampleAnswer:
          'Mi è piaciuto moltissimo / Mi sono piaciuti tantissimo (depending on the dish).',
        notes:
          'Script must include a past-tense piacere reaction so learners practise catching the essere auxiliary and agreement.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Exchange 3 — catch the pronoun',
        prompt:
          'The waiter uses an indirect object pronoun when speaking to the couple. Which one — ci, vi, or gli?',
        exampleAnswer:
          'ci — the waiter says "ci porto" or "ci consiglio", speaking to the two diners.',
        notes:
          'Script: waiter addresses a couple; use "vi" for informal or "ci" in a shared-context phrase — clarify the distinction briefly.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Reflect on what slipped past',
        prompt: 'Which word or phrase in the exchanges was hardest to catch, and why?',
      },
    ],
  },

  // ── 9. Speaking challenge — describe your favorite meal ──────────────────
  {
    slug: 'cap06-speaking-favorite-meal',
    title: 'Il mio piatto preferito — describe your favorite meal',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A free-production speaking challenge: describe a meal you love from start to finish, using ' +
      'piacere for preferences, indirect object pronouns when talking about sharing it, and at least ' +
      'one past-tense moment.',
    objectiveSkillSlugs: [
      'it-piacere',
      'it-indirect-object-pronouns',
      'it-vocab-meals-table',
      'it-vocab-food-restaurant',
    ],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your favorite meal in Italian',
        prompt:
          'Think of a meal — a dish, a restaurant, or a whole occasion — that you love. ' +
          'You’re going to describe it in Italian, using piacere to express the feeling.',
        notes:
          'Pull the learner’s favorite cuisine or a specific food memory from their profile. If no data is available, suggest three options (a childhood dish, a restaurant experience, a dish you cook well).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Introduce the dish or meal',
        prompt:
          'Describe what the meal is in two or three sentences: what you eat, when, and where.',
        exampleAnswer:
          'Il mio piatto preferito è la pasta alla norma, una specialità siciliana. ' +
          'La mangio spesso a pranzo, a casa o in una trattoria vicino a casa mia.',
        notes:
          'Prompt for vocabulary from it-vocab-food-restaurant and it-vocab-meals-table. Accept any accurate Italian.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use piacere to say why you love it',
        prompt: 'Explain why you love it — use mi piace / mi piacciono at least twice.',
        exampleAnswer:
          'Mi piace molto il sapore affumicato della melanzana fritta. ' +
          'Mi piacciono anche i pomodori freschi che danno acidità al piatto.',
        notes:
          'Coach for piace (one ingredient or quality, singular) vs piacciono (multiple ingredients, plural).',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Tell someone about it — use an indirect object pronoun',
        prompt:
          'Imagine you’re recommending this dish to a friend. Use gli or le (or ti) when you tell them about it.',
        exampleAnswer:
          'L’ho consigliata a mia sorella e lei l’ha adorata. Le ho detto di provare anche il vino locale.',
        notes:
          'Note the double pronoun use: le (IOP) + l’ha adorata (DOP with pp agreement). Praise both if the learner produces them.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'How did it go?',
        prompt: 'Which part of the description felt smooth and which part made you pause?',
      },
    ],
  },

  // ── 10. Vocabulary review ─────────────────────────────────────────────────
  {
    slug: 'cap06-vocab-review-courses-table',
    title: 'Il pasto completo — courses, the table, and the bill',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A full vocabulary review of the chapter: the five-course structure, table-setting items, ' +
      'verbs of eating and ordering, and the expressions every diner needs from prenotare to pagare.',
    objectiveSkillSlugs: ['it-vocab-meals-table', 'it-vocab-food-restaurant'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'travel', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'From reservation to dessert',
        prompt:
          'We’ll walk through the full arc of a dinner: reserve → arrive → read the menu → order → eat → pay. ' +
          'A different word lives at each step — let’s check you know them all.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Course names in order',
        prompt:
          'Put these courses in the correct order:\n' +
          'il dolce / il secondo / l’antipasto / il primo / il contorno',
        exampleAnswer: 'l’antipasto → il primo → il secondo + il contorno → il dolce',
        notes: 'Clarify that il contorno accompanies (not follows) il secondo.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Table-setting and condiments',
        prompt:
          'Complete the sentence with the correct word:\n' +
          '"Scusi, potrebbe portarmi un ___ (fork) e un ___ (knife) puliti? ' +
          'E anche un po’ di ___ (salt) e ___ (pepper)?"',
        exampleAnswer: 'una forchetta e un coltello puliti; un po’ di sale e pepe.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Key restaurant phrases',
        prompt:
          'Translate:\n' +
          '(a) "We’d like to book a table for four."\n' +
          '(b) "What is the dish of the day?"\n' +
          '(c) "The bill, please — is the cover charge included?"',
        exampleAnswer:
          '(a) Vorremmo prenotare un tavolo per quattro.\n' +
          '(b) Qual è il piatto del giorno?\n' +
          '(c) Il conto, per favore — il coperto è incluso?',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Act out the full arc',
        prompt:
          'In 4–5 sentences, take me through an entire restaurant visit from arrival to paying — use at least five of the chapter’s key words.',
        notes:
          'Personalize the venue and dishes to the learner’s profile. Accept imperfect grammar; score on vocabulary range.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Words to put on flashcards',
        prompt:
          'Which three vocabulary items from this chapter did you not already know, and which one was the most surprising?',
      },
    ],
  },

  // ── 11. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap06-progress-check',
    title: 'Checkpoint: Buon appetito! — how far have you come?',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.lower_intermediate,
    summary:
      'A mixed checkpoint covering all six chapter skills: indirect object pronouns, pp agreement with ' +
      'preceding pronouns, piacere, interrogatives, restaurant vocabulary, and meals/table vocabulary.',
    objectiveSkillSlugs: [
      'it-indirect-object-pronouns',
      'it-passato-prossimo-pp-agreement',
      'it-piacere',
      'it-interrogatives',
      'it-vocab-food-restaurant',
      'it-vocab-meals-table',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes mixed check',
        prompt:
          'A few questions across everything in this chapter. No pressure — this is a snapshot, not a test.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Indirect object pronoun',
        prompt: 'Complete: Il sommelier ___ consiglia un Chianti Classico. (a noi)',
        exampleAnswer: 'ci consiglia',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Piacere — correct form',
        prompt: 'Complete: Non mi ___ le acciughe, ma mi ___ il baccalà.',
        exampleAnswer: 'piacciono; piace',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Past-participle agreement',
        prompt: 'Fix if wrong: "Le bruschette? Le ho mangiato tutte."',
        exampleAnswer: 'Le ho mangiate tutte. (le → -e)',
      },
      {
        taskType: TaskType.translation,
        focus: 'Interrogatives + restaurant vocab',
        prompt: 'Translate: "How much does the tasting menu cost, and which wines are included?"',
        exampleAnswer: 'Quanto costa il menù degustazione e quali vini sono inclusi?',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assessment',
        prompt:
          'Looking back at the six topics in this chapter, which one feels most solid and which needs another pass?',
        notes:
          'Use the learner’s answer to queue up a targeted recovery lesson on the weakest skill.',
      },
    ],
  },
];

export default { unitCode, lessons };
