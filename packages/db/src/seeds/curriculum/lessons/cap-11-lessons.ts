// Additional lesson templates for Capitolo 11 — Spesa e spese.
//
// These EXTEND the five templates authored inline in units/cap-11-spesa-e-spese.ts.
// The curriculum index merges both files. Each template here adds a new angle:
// per-skill focused drills (ne alone, ci alone, double-pronoun deep-dive),
// an error-correction clinic on the chapter’s classic mistakes, two fresh
// scenario roleplays, a listening challenge, a speaking challenge, a vocabulary
// review, and a progress-check checkpoint.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// five inline slugs (cap11-al-mercato-con-ne, cap11-ne-e-ci, cap11-me-lo-dai,
// cap11-imperativo-con-amici, cap11-dove-si-compra).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-11';

const lessons: SeedLessonTemplate[] = [
  // ─── 1. Per-skill drill: ne for quantities ──────────────────────────────────
  {
    slug: 'cap11-drill-ne-quantity',
    title: 'Ne — drills for quantities at the counter',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Focused reps on the quantity use of ne: replacing etti, chili, and bottles at the deli ' +
      'counter — including passato prossimo agreement when ne is the implied object.',
    objectiveSkillSlugs: ['it-ne'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'business'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'ne replaces the quantity phrase',
        prompt:
          'When a number or measurement phrase follows di + noun, replace the whole di + noun ' +
          'with ne and keep the number after the verb: "Quanti etti di salame?" → "Ne voglio tre."',
        notes: 'Write the before/after pair on screen so the slot position is obvious.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Swap the noun for ne',
        prompt:
          'Rewrite each sentence using ne:\n' +
          '(a) Voglio due etti di prosciutto. → ___\n' +
          '(b) Compro mezzo chilo di funghi. → ___\n' +
          '(c) Ha preso tre bottiglie di olio. → ___',
        exampleAnswer: '(a) Ne voglio due etti.\n(b) Ne compro mezzo chilo.\n(c) Ne ha prese tre.',
        notes:
          'Row (c) requires passato prossimo agreement (bottiglie, f. pl.) — flag it explicitly.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Participle agreement with ne',
        prompt:
          'Complete with the correct past participle form:\n' +
          '(a) Ho preso delle mele. → Ne ho pres___ quattro. (mele = f. pl.)\n' +
          '(b) Ho comprato dei pomodori. → Ne ho comprat___ sei. (pomodori = m. pl.)',
        exampleAnswer: '(a) prese; (b) comprati',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce ne from English',
        prompt:
          'Translate: "I’d like a kilo of oranges." (using ne) and "She bought three of them ' +
          'yesterday." (past tense, le arance = f. pl.)',
        exampleAnswer: 'Ne vorrei un chilo. / Ne ha comprate tre ieri.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The two ne rules in one breath',
        prompt:
          'Complete the rule: "Ne goes ___ the verb; the past participle agrees because ___."',
      },
    ],
  },

  // ─── 2. Per-skill drill: ne for topics ──────────────────────────────────────
  {
    slug: 'cap11-drill-ne-topic',
    title: 'Ne — replacing di + topic in conversation',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Train the less obvious use of ne: replacing di + topic phrase (Parliamo di prezzi → ' +
      'Ne parliamo) so you can discuss food, shops, and money without repeating the noun.',
    objectiveSkillSlugs: ['it-ne', 'it-vocab-shops'],
    defaultDurationMinutes: 7,
    compatibleThemes: ['food', 'business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'ne for di + topic',
        prompt:
          'Any time you have di + noun or noun phrase that is the topic of a verb, ne can ' +
          'replace it: "Siamo stanchi dei prezzi alti." → "Ne siamo stanchi." The verb stays ' +
          'unchanged; only di + noun disappears.',
        notes: 'Contrast with the quantity use: same position, different source phrase.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Replace the topic phrase',
        prompt:
          'Rewrite using ne:\n' +
          '(a) Parliamo di questo mercato. → ___\n' +
          '(b) Ho paura dei saldi falsi online. → ___\n' +
          '(c) Sei contento del nuovo fruttivendolo? → ___',
        exampleAnswer: '(a) Ne parliamo.\n(b) Ne ho paura.\n(c) Ne sei contento?',
        notes:
          'Row (b) uses avere + paura + di; row (c) uses essere + contento + di — both take ne.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Choose the right pronoun',
        prompt:
          'ci or ne?\n' +
          '(a) Vai al mercato? — Sì, ___ vado subito.\n' +
          '(b) Parli sempre dei prezzi. — Sì, ___ parlo troppo!\n' +
          '(c) Hai bisogno di aiuto? — No, non ___ ho bisogno.',
        exampleAnswer: '(a) ci; (b) ne; (c) ne',
        notes: 'Keeps the ci/ne contrast live while focusing on topic ne.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use ne about a topic you care about',
        prompt:
          'Choose one: food prices, a shop you love, or a market you’ve visited. Say two ' +
          'sentences about it, using ne to refer to the topic at least once.',
        notes: 'Personalize to the learner’s profile interest (food, business, travel).',
      },
      {
        taskType: TaskType.recap,
        focus: 'When is ne a topic stand-in?',
        prompt:
          'Give the rule: what kind of phrase does topic-ne replace, and which verbs typically ' +
          'introduce it?',
      },
    ],
  },

  // ─── 3. Per-skill drill: ci locative + idioms ───────────────────────────────
  {
    slug: 'cap11-drill-ci-locative-idioms',
    title: 'Ci — places, there is/are, and pensarci',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Three uses of ci in one sharp drill: standing in for a place (ci vado), expressing ' +
      "existence (c'è / ci sono), and the idiomatic triad pensarci / crederci / riuscirci.",
    objectiveSkillSlugs: ['it-ci'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Three jobs of ci',
        prompt:
          '1. Locative — replaces a + place: "Vai in pasticceria?" → "Sì, ci vado." ' +
          '2. Existence — c\'è (sing.) / ci sono (pl.): "C\'è ancora del burro?" ' +
          '3. Idiomatic — attached to pensare, credere, riuscire: pensarci, crederci, riuscirci.',
        notes: 'Use three labelled columns; tie each to a market example.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Replace the place with ci',
        prompt:
          'Rewrite with ci:\n' +
          '(a) Andiamo alla pescheria ogni venerdì. → ___\n' +
          '(b) Non sono mai stato al mercato coperto. → ___\n' +
          '(c) Mia madre va in salumeria quasi ogni giorno. → ___',
        exampleAnswer:
          '(a) Ci andiamo ogni venerdì.\n(b) Non ci sono mai stato.\n(c) Mia madre ci va quasi ogni giorno.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: "c'è or ci sono?",
        prompt:
          "Fill in c'è or ci sono:\n" +
          '(a) ___ ancora delle olive al banco?\n' +
          '(b) ___ un macellaio nuovo in via Roma.\n' +
          '(c) Non ___ più offerte questa settimana.',
        exampleAnswer: "(a) ci sono; (b) c'è; (c) ci sono",
      },
      {
        taskType: TaskType.translation,
        focus: 'Idiomatic ci',
        prompt:
          'Translate:\n' +
          '(a) "I’ve been thinking about it (the recipe) all morning."\n' +
          '(b) "I tried to open the jar but I couldn’t manage it."',
        exampleAnswer:
          '(a) Ci ho pensato tutta la mattina.\n(b) Ho provato ad aprire il barattolo ma non ci sono riuscito/a.',
        notes: 'pensarci is the focus for (a); riuscirci for (b).',
      },
      {
        taskType: TaskType.recap,
        focus: 'Which ci is which?',
        prompt:
          'Give me one sentence for each of the three ci jobs and label it: locative, ' +
          'esistenziale, or idiomatico.',
      },
    ],
  },

  // ─── 4. Per-skill drill: double pronouns depth ──────────────────────────────
  {
    slug: 'cap11-drill-double-pronouns-glielo',
    title: 'Glielo, gliene, ce ne — the tricky double-pronoun forms',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Zero in on the forms that trip learners most: the glie- fusion (for him, her, and ' +
      'them), ce ne for "some of it to us," and double pronouns attached to infinitives ' +
      'and imperatives.',
    objectiveSkillSlugs: ['it-double-pronouns', 'it-ne', 'it-imperativo-informal'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'business', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'The glie- fusion rule',
        prompt:
          'Gli (to him / to them) and le (to her) BOTH become glie- when a direct pronoun or ' +
          'ne follows: gli + lo → glielo; le + la → gliela; gli + ne → gliene. They are ' +
          'written as one word, always. There is no separate form for "him" vs "her" here.',
        notes: 'Show the full glie- block: glielo, gliela, glieli, gliele, gliene.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Build glielo / gliene from scratch',
        prompt:
          'Replace both objects:\n' +
          '(a) Mando a lei la lista della spesa. → ___\n' +
          '(b) Porto a lui del pecorino. → ___\n' +
          '(c) Do a loro gli scontrini. → ___',
        exampleAnswer: '(a) Gliela mando. (b) Gliene porto. (c) Glieli do.',
        notes:
          'Walk through: identify IOP → transform to glie- → attach DOP or ne → place before verb.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'ce ne in the shop',
        prompt:
          'Complete with ce ne:\n' +
          '(a) Vuoi del formaggio? — Sì, ___ porta mezzo chilo, per favore.\n' +
          '(b) Abbiamo bisogno di vino? — Sì, ___ serve ancora una bottiglia.',
        exampleAnswer: '(a) ce ne; (b) ce ne',
        notes:
          'ce ne = ci + ne; ci transforms to ce, then ne follows. Use with quantities for "us."',
      },
      {
        taskType: TaskType.translation,
        focus: 'Double pronouns on infinitives',
        prompt:
          'Translate: "Do you want to give it to her?" (lo scontrino) and ' +
          '"I need to send some of it to them." (del salame)',
        exampleAnswer: "Vuoi darglielo? / Devo mandarne loro — or: Devo mandarglielo un po'.",
        notes: 'The pronoun attaches to the infinitive (dar- + glielo). Accept either structure.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Use glielo in a real context',
        prompt:
          'Imagine a friend asked you to buy something at the market for a relative. Tell me ' +
          "what you bought and say you're going to bring it to them — use glielo or gliene.",
        notes: "Personalize to the learner's typical shopping items.",
      },
    ],
  },

  // ─── 5. Per-skill drill: imperativo informale + attached pronouns ────────────
  {
    slug: 'cap11-drill-imperativo-pronouns',
    title: 'Compra, dimmi, daglielo — imperative + attached pronouns',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'Drill the tu informal imperative with regular verbs, the five short irregulars ' +
      '(va’, da’, fa’, sta’, di’), and the consonant-doubling rule ' +
      'when a pronoun attaches to a short form.',
    objectiveSkillSlugs: ['it-imperativo-informal'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Short irregulars and the doubling rule',
        prompt:
          'Five tu imperatives are irregular and short: va’ (andare), da’ (dare), ' +
          'fa’ (fare), sta’ (stare), di’ (dire). When a pronoun attaches ' +
          'to one of these, the first consonant of the pronoun doubles: da’ + mi → dammi; ' +
          'fa’ + lo → fallo; di’ + ci → dicci. Exception: gli does not double ' +
          '(da’ + gli + lo → daglielo).',
        notes: 'Display the full doubling table alongside the five short imperatives.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Form the tu imperative',
        prompt:
          'Give the positive and negative tu imperative:\n' +
          '(a) andare → ___ / ___\n' +
          '(b) dare → ___ / ___\n' +
          '(c) mangiare → ___ / ___\n' +
          '(d) scegliere → ___ / ___',
        exampleAnswer:
          '(a) va’ / non andare; (b) da’ / non dare; (c) mangia / non mangiare; (d) scegli / non scegliere',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Attach the pronoun with doubling',
        prompt:
          'Combine each imperative with the pronoun shown:\n' +
          '(a) di’ + mi → ___\n' +
          '(b) fa’ + lo → ___\n' +
          '(c) sta’ + ci → ___\n' +
          '(d) da’ + gli + lo → ___',
        exampleAnswer: '(a) dimmi; (b) fallo; (c) stacci; (d) daglielo',
        notes:
          '(d) involves glielo — consonant doubling applies to the gli part only; glielo becomes the one-word attachment.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Catch the missing double',
        prompt:
          'Fix the errors:\n' +
          '(a) Dami una mano! → ___\n' +
          '(b) Falo adesso! → ___\n' +
          '(c) Dicci la verità. → (already correct — do not change)',
        exampleAnswer: '(a) Dammi una mano! (b) Fallo adesso! (c) Dicci la verità.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Rattle off a shopping list as imperatives',
        prompt:
          "You're sending a friend to the market. Give five shopping instructions using the " +
          'tu imperative — include at least one short irregular and one with a pronoun attached.',
        exampleAnswer:
          'Va’ al fruttivendolo e prendi un chilo di pomodori. Compra anche del pane. ' +
          'Chiedi il prezzo delle olive e dicci quanto costano. Dammi lo scontrino quando torni.',
        notes: "Personalize the shopping list to the learner's food preferences.",
      },
    ],
  },

  // ─── 6. Error-correction clinic ─────────────────────────────────────────────
  {
    slug: 'cap11-clinic-chapter-mistakes',
    title: 'Clinic: the four slips of chapter 11',
    lessonType: LessonType.grammar,
    level: CEFRLevel.intermediate,
    summary:
      'A targeted error-correction session on the classic chapter-11 errors: wrong ' +
      'gli/le → glie- fusion, missing ne agreement in the passato prossimo, misplaced ' +
      'ci (put after the verb), and wrong pronoun position on an imperative.',
    objectiveSkillSlugs: ['it-double-pronouns', 'it-ne', 'it-ci', 'it-imperativo-informal'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'business', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Why these four errors matter',
        prompt:
          'These are the errors that make otherwise fluent speakers sound unnatural. Each one ' +
          "has a single rule to fix it. Let's catch them one at a time.",
      },
      {
        taskType: TaskType.error_correction,
        focus: 'gli/le → glie- fusion',
        prompt: 'Fix:\n' + '(a) Le lo mando domani.\n' + '(b) Gli la porto adesso.',
        exampleAnswer: '(a) Glielo mando domani. (b) Gliela porto adesso.',
        notes:
          'Both gli and le must fuse into glie-. Reinforce: there is only one combined form, not two.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Missing ne agreement in passato prossimo',
        prompt:
          'Fix:\n' +
          '(a) Ho comprato delle fragole — ne ho comprato tre. (fragole = f. pl.)\n' +
          '(b) Ha preso degli spinaci — ne ha preso troppo. (spinaci = m. pl.)',
        exampleAnswer: '(a) ne ho comprate tre; (b) ne ha presi troppi',
        notes: 'The participle must agree with the gender/number of the noun ne stands for.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'ci placed after the verb',
        prompt:
          'Fix:\n' +
          '(a) Vado ci ogni settimana.\n' +
          '(b) Penso ci spesso quando vedo quei mercati.',
        exampleAnswer: '(a) Ci vado ogni settimana. (b) Ci penso spesso quando vedo quei mercati.',
        notes: 'In a simple tense, ci precedes the conjugated verb — never follows it.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Pronoun separated from the imperative',
        prompt: 'Fix:\n' + '(a) Compra lo subito!\n' + '(b) Di’ mi la verità!',
        exampleAnswer: '(a) Compralo subito! (b) Dimmi la verità!',
        notes:
          '(a) pronoun must attach to the imperative; (b) short irregular di’ + mi = dimmi (consonant doubles).',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Which error was hardest?',
        prompt:
          'Look back at the four error types. Which one caught you off guard, and what is ' +
          "the rule you'll remember?",
      },
    ],
  },

  // ─── 7. Scenario roleplay: fare la spesa al mercato ────────────────────────
  {
    slug: 'cap11-roleplay-fare-la-spesa',
    title: 'Fare la spesa: a full market run',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'An immersive Saturday-morning market visit: navigate two stalls (one fish, one ' +
      'cheese), use ne for every quantity, and close the scene by phoning a friend — ' +
      'giving them instructions with the tu imperative.',
    objectiveSkillSlugs: [
      'it-ne',
      'it-vocab-groceries',
      'it-vocab-shops',
      'it-imperativo-informal',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['food', 'culture', 'travel'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          "It's 9 am at the Saturday market in Reggio Calabria. You have a short list: " +
          'some fish, aged cheese, and fruit. Every time you name a quantity, use ne. ' +
          "At the end of the scene you'll call a friend to ask them to bring something extra.",
        notes:
          'Swap fish for another protein if the learner has noted a food preference or restriction.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'At the pescheria stall',
        prompt:
          'The fishmonger asks: "Cosa desidera?" You want four fresh swordfish steaks. ' +
          "Order with ne, ask if they're from local waters, and find out the price per kilo.",
        exampleAnswer: 'Ne vorrei quattro, grazie. Sono locali? E quanto costano al chilo?',
        notes: "If the learner doesn't know pesce spada, suggest it with a brief gloss.",
      },
      {
        taskType: TaskType.roleplay,
        focus: 'At the cheese vendor',
        prompt:
          'You want two hundred grams of Pecorino di Filiano. The vendor offers you a taste. ' +
          'Accept, comment on the flavour, then confirm your order using ne.',
        exampleAnswer: 'Sì, grazie — è ottimo, molto saporito. Ne prendo due etti, allora.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Call a friend — give imperatives',
        prompt:
          'You call a friend who is still at home and ask them to buy one more thing before ' +
          'joining you. Give at least three instructions using the tu imperative — one must ' +
          'have a pronoun attached.',
        exampleAnswer:
          'Va’ dal fruttivendolo sotto casa. Prendi un chilo di arance. Se ci sono ' +
          'le fragole in offerta, comprami anche quelle.',
        notes: 'Personalize the extra item to what the learner mentioned buying in their profile.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Passato prossimo with ne — recap what you bought',
        prompt:
          'Report your market haul in the past tense, using ne + correct agreement for each item:\n' +
          '(a) (le bistecche di pesce spada, f. pl.) Ne ho pres___ quattro.\n' +
          '(b) (il pecorino, m.) Ne ho pres___ due etti.',
        exampleAnswer: '(a) prese; (b) preso',
      },
      {
        taskType: TaskType.recap,
        focus: 'What you practised',
        prompt:
          'Name the three grammar points you used in this scenario and give one example of each.',
      },
    ],
  },

  // ─── 8. Scenario roleplay: recipe instructions ─────────────────────────────
  {
    slug: 'cap11-roleplay-ricetta',
    title: 'La ricetta della nonna — giving instructions with the imperative',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.intermediate,
    summary:
      'Walk a friend through a simple southern Italian recipe step by step: a full ' +
      'imperativo workout using tu and noi forms, attached pronouns, glielo/gliene, ' +
      'and ne for ingredient quantities.',
    objectiveSkillSlugs: [
      'it-imperativo-informal',
      'it-double-pronouns',
      'it-ne',
      'it-vocab-groceries',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['food', 'family', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          "A friend is cooking for the first time and has called you for help. You'll guide " +
          'them through a pasta with fresh tomato sauce — using imperatives throughout.',
        notes:
          'If the learner has mentioned a favourite dish in their profile, substitute that dish here.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'First steps — buy and prep',
        prompt:
          'Your friend is still at the shop. Tell them what to buy (quantities with ne) and ' +
          'what to do first when they get home — at least four imperative sentences.',
        exampleAnswer:
          "Prendi dei pomodorini — ne compra mezzo chilo. Prendi anche una cipolla e dell'aglio. " +
          'Quando arrivi a casa, lava la verdura e taglia la cipolla.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Cooking steps with irregular imperatives',
        prompt:
          'Your friend is now in the kitchen. Give the cooking steps using at least two ' +
          'irregular imperatives (va’, da’, fa’, sta’, di’) ' +
          'with a pronoun attached.',
        exampleAnswer:
          'Fa’ rosolare la cipolla in poco olio. Aggiungi i pomodorini — mettili ' +
          'interi. Fa’lo cuocere per venti minuti a fuoco basso.',
        notes: 'Praise any correct consonant doubling.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Pass it on — glielo and gliene',
        prompt:
          'Your friend loved the recipe and wants to write it down to share with their sibling. ' +
          "Say you'll send the whole recipe to them (glielo/gliela) and that you'll also send " +
          'some of the sauce (gliene) next time you make it.',
        exampleAnswer:
          "Gliela mando stasera per messaggio. E la prossima volta che la faccio, gliene porto un po'.",
      },
      {
        taskType: TaskType.reflection,
        focus: 'Feel the difference',
        prompt:
          'How did it feel to give instructions in Italian? Which imperative form was most ' +
          'natural and which was still awkward?',
      },
    ],
  },

  // ─── 9. Listening challenge: market exchange ────────────────────────────────
  {
    slug: 'cap11-listening-al-banco',
    title: 'Listening gym: what did they order at the market?',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'Three short, fast-paced exchanges between shopkeepers and customers at an Italian ' +
      'market. Train your ear to catch the item ordered, the quantity (ne), and the price — ' +
      'and whether the customer accepted or rejected an up-sell.',
    objectiveSkillSlugs: ['it-ne', 'it-vocab-groceries', 'it-vocab-shops'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['food', 'travel', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'Each clip is a quick shop exchange — a vendor and a customer. Listen for: ' +
          '(1) what item was requested; (2) how many or how much; (3) the price; ' +
          '(4) whether the customer said yes or no to an extra offer.',
        notes:
          'Script A: fruttivendolo — peaches, three kilos, 4 €/kg, accepts extra plums. ' +
          'Script B: pescheria — sea bass, two pieces (ne prendo due), rejects the bigger fish. ' +
          'Script C: salumeria — 150 g bresaola, accepts a taste of ’nduja. Engine fills exact text.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch item + quantity from Script A',
        prompt:
          'What did the customer buy at the fruit stall, and how many kilos? Did they take ' +
          'the extra item the vendor offered?',
        exampleAnswer: 'Three kilos of peaches (ne ha presi tre). Yes, they accepted the plums.',
        notes: "Look for ne in the customer's reply — that's the grammar focus.",
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Catch the price + decision from Script B',
        prompt:
          "How many fish did the customer take, and why did they decline the vendor's bigger fish?",
        exampleAnswer: 'Two pieces (ne prendo due). They said the bigger one was too expensive.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Quantity in Script C',
        prompt:
          'The customer in the deli asked for:\n' +
          '(a) 100 g of bresaola\n(b) 150 g of bresaola\n(c) 200 g of bresaola',
        exampleAnswer: '(b) 150 g',
      },
      {
        taskType: TaskType.recap,
        focus: 'ne in real speech',
        prompt:
          'In which of the three exchanges was ne used? Write the sentence you heard and ' +
          'explain what noun it replaced.',
      },
    ],
  },

  // ─── 10. Speaking challenge: dare istruzioni ────────────────────────────────
  {
    slug: 'cap11-speaking-dai-istruzioni',
    title: 'Speaking challenge: give directions and instructions',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.intermediate,
    summary:
      'A timed speaking challenge: first, give a visiting friend directions to three ' +
      'neighbourhood shops using ci (ci vai, ci passi); then give them two shopping ' +
      'instructions using the tu imperative with pronouns attached.',
    objectiveSkillSlugs: ['it-imperativo-informal', 'it-ci', 'it-vocab-shops'],
    defaultDurationMinutes: 8,
    compatibleThemes: ['travel', 'food', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Your mission',
        prompt:
          'A friend is visiting your Italian neighbourhood for the first time. They need to ' +
          "find the bakery, the greengrocer's, and the deli. Then you'll tell them what to buy.",
        notes:
          'Prompt the learner to use ci to replace place references and imperatives for the shopping.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Give directions using ci',
        prompt:
          'Tell your friend how to get to the panetteria and the fruttivendolo from the piazza ' +
          '— use ci in at least two sentences (e.g., "ci arrivi in cinque minuti").',
        exampleAnswer:
          'La panetteria è in via Garibaldi — ci arrivi in cinque minuti a piedi. ' +
          'Il fruttivendolo è dietro la chiesa; ci passi davanti se prendi la via stretta.',
        notes: 'Reward any correct locative ci, even in simple sentences.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Shopping instructions with imperatives',
        prompt:
          'Now tell your friend exactly what to buy at the fruttivendolo and the deli: ' +
          'use the tu imperative and attach a pronoun to at least one command.',
        exampleAnswer:
          'Al fruttivendolo, prendi un chilo di pomodori e delle zucchine. ' +
          'In salumeria, chiedi della ’nduja e fatti dare un assaggio prima di comprarne.',
        notes: 'Look for: correct imperative endings, any attached pronoun, ne for quantities.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'One-minute freestyle recap',
        prompt:
          'Your friend has come back — tell me what they bought and how much of each item, ' +
          'using the passato prossimo with ne.',
        notes: 'Personalize with whatever items the learner mentioned earlier in the lesson.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Confidence check',
        prompt:
          'Which felt more natural: giving directions or giving shopping instructions? ' +
          'What would you practise again?',
      },
    ],
  },

  // ─── 11. Vocabulary review: shops + groceries deep pass ─────────────────────
  {
    slug: 'cap11-vocab-review-shops-groceries',
    title: 'Vocabulary review: shops, groceries, and the market',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.intermediate,
    summary:
      'A comprehensive vocabulary pass over all the chapter-11 items: shop names, ' +
      'grocery vocabulary, units of measure, and key transaction phrases — tested ' +
      'through matching, gap-fill, and a free recall round.',
    objectiveSkillSlugs: ['it-vocab-shops', 'it-vocab-groceries'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['food', 'business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What this covers',
        prompt:
          "We'll sweep through all the shops (la panetteria, la macelleria, la pescheria, " +
          'la salumeria, il fruttivendolo, la pasticceria), the most-used groceries, and the ' +
          'quantities and transaction words you need at the counter.',
        notes:
          'If the learner has mentioned a specific region or food interest, lead with items tied to that.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Shop names and their products',
        prompt:
          'Match the shop to what you buy there:\n' +
          '(a) il salume, la ’nduja → ___\n' +
          '(b) le arance, le zucchine → ___\n' +
          '(c) la trota, le cozze → ___\n' +
          '(d) i cornetti, la torta → ___',
        exampleAnswer:
          '(a) la salumeria; (b) il fruttivendolo; (c) la pescheria; (d) la pasticceria',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Units and transaction phrases',
        prompt:
          'Complete with the right word:\n' +
          '(a) Vorrei ___ etto di bresaola. (one)\n' +
          "(b) Quant'___ il pecorino al chilo?\n" +
          '(c) Non dimentichi lo ___! (receipt)\n' +
          '(d) Fate la ___ qui o al supermercato? (grocery shopping)',
        exampleAnswer: '(a) un; (b) è; (c) scontrino; (d) spesa',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce full shopping sentences',
        prompt:
          'Translate:\n' +
          '(a) "The summer sales start at the end of July."\n' +
          '(b) "There are two new shops in this street — have you been?"\n' +
          '(c) "I always buy my bread at the bakery — I go there every morning."',
        exampleAnswer:
          '(a) I saldi estivi iniziano alla fine di luglio.\n' +
          '(b) Ci sono due negozi nuovi in questa via — ci sei già andato/a?\n' +
          '(c) Compro sempre il pane in panetteria — ci vado ogni mattina.',
        notes: 'Row (b) and (c) sneak in ci as a bonus review.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Free recall: your shopping world',
        prompt:
          'Without looking back, describe your ideal Italian neighbourhood shop — what it ' +
          'sells, who works there, what you usually buy and how much. Use ne at least once.',
        notes: 'No word list on screen — this is recall under pressure.',
      },
    ],
  },

  // ─── 12. Progress check ─────────────────────────────────────────────────────
  {
    slug: 'cap11-progress-check',
    title: 'Chapter checkpoint: spesa e spese',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.intermediate,
    summary:
      'A mixed check across all five chapter-11 skills: ne (quantity + topic), ci ' +
      '(locative + idiomatic), double pronouns (glielo / gliene), informal imperative ' +
      '(regular + irregular + attached pronoun), and shops/groceries vocabulary.',
    objectiveSkillSlugs: [
      'it-ne',
      'it-ci',
      'it-double-pronouns',
      'it-imperativo-informal',
      'it-vocab-shops',
      'it-vocab-groceries',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['food', 'business', 'culture', 'family'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes diagnostic',
        prompt:
          "This is not a test — it's a map. We'll touch each big topic from the chapter " +
          "and you'll see what's solid and what needs another pass. Take your time.",
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'ne — quantity and agreement',
        prompt:
          'Fill in the correct form:\n' +
          '(a) Quante mele hai comprato? — ___ ho comprat___ tre. (mele, f. pl.)\n' +
          "(b) Vuoi del caffè? — Sì, ___ prendo un po'.",
        exampleAnswer: '(a) Ne ho comprate tre. (b) ne prendo',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'ci or ne?',
        prompt:
          'Choose:\n' +
          "(a) Sei mai andato in Basilicata? — Sì, ___ sono andato l'estate scorsa.\n" +
          '(b) Parli spesso di cucina? — Sì, ___ parlo ogni giorno!\n' +
          '(c) Pensi al nuovo negozio? — Sì, ___ penso.',
        exampleAnswer: '(a) ci; (b) ne; (c) ci',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Double pronouns',
        prompt:
          'Rewrite with a double pronoun:\n' +
          '(a) Do a te lo scontrino. → ___\n' +
          '(b) Mando a lei la lista. → ___\n' +
          '(c) Portano a noi del vino. → ___',
        exampleAnswer: '(a) Te lo do. (b) Gliela mando. (c) Ce ne portano.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Informal imperative + attached pronoun',
        prompt:
          'Complete:\n' +
          '(a) ___ (dire + mi) il prezzo!\n' +
          '(b) Non ___ (comprare, negative tu) quella confezione — è scaduta.\n' +
          '(c) ___ (dare + gli + lo) — è il suo scontrino.',
        exampleAnswer: '(a) Dimmi; (b) non comprare; (c) Daglielo',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Your chapter map',
        prompt:
          'Look back at the four areas we checked. Which felt automatic, and which do you ' +
          "want to revisit? Name one lesson or drill you'd like to repeat.",
      },
    ],
  },
];

export default { unitCode, lessons };
