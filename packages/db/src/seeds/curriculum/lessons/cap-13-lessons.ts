// Additional lesson templates for Capitolo 13 — La difesa dell’ambiente.
//
// These EXTEND the templates authored inline in units/cap-13-difesa-dell-ambiente.ts
// (the index merges both). This file is the lesson-expansion pass: per-skill drills
// for each grammar point, an error clinic, two scenario roleplays, a listening
// challenge, a speaking challenge, a vocabulary review, and a progress check.
//
// Rules mirror SPEC.md: original content; every in-string apostrophe is the
// curly ' (U+2019); slugs are globally unique and must not collide with the
// inline template slugs (cap13-be-polite, cap13-environmental-advice,
// cap13-what-you-would-have-done, cap13-planet-debate, cap13-vocab-review).

import { CEFRLevel, LessonType, TaskType } from '@prisma/client';
import type { SeedLessonTemplate } from '../types';

export const unitCode = 'cap-13';

const lessons: SeedLessonTemplate[] = [
  // ── 1. Per-skill drill: condizionale presente — irregular stems ───────────
  {
    slug: 'cap13-drill-conditional-stems',
    title: 'Sarei, vorrei, farei — mastering irregular stems',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Lock in the irregular condizionale stems through focused conjugation reps. ' +
      'The ten high-frequency verbs — essere, avere, andare, fare, venire, volere, ' +
      'potere, dovere, vedere, bere — all follow the same future-tense stem logic.',
    objectiveSkillSlugs: ['it-conditional-present'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['travel', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Stems are borrowed from the future',
        prompt:
          'The condizionale uses exactly the same irregular stems as the futuro semplice. ' +
          'If you know andrò, you already know the stem for andrei: andr-. ' +
          'Add the conditional endings (-ei, -esti, -ebbe, -emmo, -este, -ebbero) and you’re done.',
        notes:
          'Show a two-column table: futuro io form on the left, condizionale io form on the right. ' +
          'The stem is identical — only the ending differs.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'The core ten — io form',
        prompt:
          'Give the condizionale io form for each: essere, avere, andare, fare, venire, ' +
          'volere, potere, dovere, vedere, bere.',
        exampleAnswer:
          'sarei, avrei, andrei, farei, verrei, vorrei, potrei, dovrei, vedrei, berrei',
        notes: 'Drill speed matters here — the goal is automaticity, not slow construction.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Expand to noi and loro',
        prompt: 'Now give noi and loro forms for: volere, potere, dovere.',
        exampleAnswer: 'vorremmo / vorrebbero; potremmo / potrebbero; dovremmo / dovrebbero',
        notes:
          'These three modals in noi are the most common in group advice and environmental discussion.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Stems in context',
        prompt:
          'Fill in the correct condizionale form: ' +
          '"___ (fare) volentieri una passeggiata in montagna, ma piove." ' +
          '"Con meno traffico, tu ___ (vedere) la città in modo completamente diverso." ' +
          '"Noi ___ (bere) volentieri un caffè, se hai tempo."',
        exampleAnswer: 'Farei; vedresti; Berremmo',
        notes:
          'Three different subjects and three different stems. Coach the stem-recall sequence.',
      },
      {
        taskType: TaskType.recap,
        focus: 'The one rule to remember',
        prompt:
          'Complete this sentence: "To find the condizionale stem, I take the _____ form and ___."',
        exampleAnswer:
          'I take the futuro semplice io form and replace -ò with the conditional endings.',
      },
    ],
  },

  // ── 2. Per-skill drill: modals in conditional — polite requests ───────────
  {
    slug: 'cap13-drill-polite-requests',
    title: 'Potrebbe…? Vorrei… — the politeness toolkit',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A focused drill on using dovrei, potrei, and vorrei to make polite requests, ' +
      'express desires, and give gentle advice — the three core moves of courteous Italian.',
    objectiveSkillSlugs: ['it-modals-conditional'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['travel', 'business', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Three words, three jobs',
        prompt:
          'Vorrei = I’d like (desire / polite request). ' +
          'Potrei = I could (possibility) / Potrebbe? = Could you? (polite ask). ' +
          'Dovrei = I should (advice). ' +
          'Master these three and every interaction becomes smoother.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Vorrei for desires and requests',
        prompt:
          'Translate these two: ' +
          '(1) "I’d like a map of the national park, please." ' +
          '(2) "I’d like to speak to the manager." (formal)',
        exampleAnswer:
          'Vorrei una cartina del parco nazionale, per favore. ' +
          'Vorrei parlare con il direttore.',
        notes:
          'Stress that vorrei + infinitive and vorrei + noun are both correct; ' +
          'the construction is the same.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Potrebbe for formal requests',
        prompt:
          'Transform each rude request into a polite one using potrebbe (Lei form): ' +
          '"Ripeta più lentamente." → "___ ripetere più lentamente, per favore?" ' +
          '"Mi dica il prezzo." → "___ dirmi il prezzo?"',
        exampleAnswer:
          'Potrebbe ripetere più lentamente, per favore? ' + 'Potrebbe dirmi il prezzo?',
        notes: 'The imperative → conditional transformation is a high-value real-world skill.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Dovrei for advice to yourself',
        prompt:
          'Give three things you personally should do (dovrei) to live more sustainably. ' +
          'Be honest — the conditional is perfect for guilty admissions.',
        notes:
          'This is deliberately self-reflective. Accept any grammatically sound dovrei + infinitive.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Register check',
        prompt:
          'Which sounds ruder at a hotel reception: "Voglio un’altra coperta" or "Vorrei un’altra coperta"? ' +
          'And which modal would you use to suggest the hotel switch to LED lighting?',
        exampleAnswer:
          '"Voglio" sounds rude or childish; "Vorrei" is polite. ' +
          'For a gentle suggestion: "Potrebbe considerare di passare ai LED?" or "Dovreste installare LED."',
      },
    ],
  },

  // ── 3. Per-skill drill: condizionale passato — "would have" ───────────────
  {
    slug: 'cap13-drill-conditional-past-forms',
    title: 'Avrei fatto, sarei andato — building the past conditional',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Systematic drills on the condizionale passato: choosing the right auxiliary, ' +
      'getting participle agreement right with essere verbs, and distinguishing ' +
      '"would have done" from "would do".',
    objectiveSkillSlugs: ['it-conditional-past'],
    defaultDurationMinutes: 11,
    compatibleThemes: ['news', 'history', 'politics'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Formula and agreement',
        prompt:
          'Condizionale passato = condizionale of avere or essere + past participle. ' +
          'With avere: avrei mangiato, avresti letto, avrebbe fatto. ' +
          'With essere: sarei partito/a, saremmo andati/e, sarebbero rimasti/e. ' +
          'The participle agrees with the subject whenever essere is the auxiliary — ' +
          'exactly the same rule as in the passato prossimo.',
        notes:
          'Put the two auxiliaries side by side. Learners who are solid on passato prossimo ' +
          'with essere will transfer the agreement rule immediately.',
      },
      {
        taskType: TaskType.conjugation,
        focus: 'Avere verbs — full paradigm',
        prompt: 'Give the complete condizionale passato of fare (io through loro).',
        exampleAnswer:
          'avrei fatto, avresti fatto, avrebbe fatto, avremmo fatto, avreste fatto, avrebbero fatto',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Essere verbs + agreement',
        prompt:
          'Fill in the condizionale passato with the correct gender/number agreement. ' +
          'Speaker 1 is male: "Senza traffico, ___ (arrivare) prima." ' +
          'Speaker 2 is female: "Io non ___ (venire) se avessi saputo." ' +
          'Subject is two women: "Le mie colleghe ___ (partire) prima."',
        exampleAnswer: 'sarei arrivato; sarei venuta; sarebbero partite',
        notes:
          'Three different agreement patterns in one exercise. ' +
          'Highlight the feminine agreement on the third item.',
      },
      {
        taskType: TaskType.tense_selection,
        focus: 'Condizionale vs condizionale passato',
        prompt:
          'Choose the correct form: ' +
          '"Se potessi, ___ (vivere) in campagna." — vivrei o avrei vissuto? ' +
          '"Se avessi avuto i soldi, ___ (comprare) una bici elettrica." — comprerei o avrei comprato?',
        exampleAnswer:
          'vivrei (I would live — present/ongoing desire); ' +
          'avrei comprato (I would have bought — unrealised past action)',
        notes:
          'This contrast is the most common point of confusion. Do not introduce the full ' +
          'ipotetica structure yet; focus only on which conditional form fits the time frame.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Check your own understanding',
        prompt:
          'In one sentence each: (1) What does the condizionale passato express? ' +
          '(2) When does the participle change its ending?',
        exampleAnswer:
          '(1) An action that would have happened but did not (unrealised past), or a future event ' +
          'seen from a past point of view. ' +
          '(2) When essere is the auxiliary — the participle agrees in gender and number with the subject.',
      },
    ],
  },

  // ── 4. Per-skill drill: possessive pronouns ───────────────────────────────
  {
    slug: 'cap13-drill-possessive-pronouns',
    title: 'Il mio, la tua, il loro — pronouns that stand alone',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Possessive pronouns use the same forms as possessive adjectives but replace the noun entirely. ' +
      'Drill the article-retention rule, the no-article-after-essere rule, and the invariable loro.',
    objectiveSkillSlugs: ['it-possessive-pronouns'],
    defaultDurationMinutes: 9,
    compatibleThemes: ['family', 'culture', 'news'],
    taskBlueprint: [
      {
        taskType: TaskType.explanation,
        focus: 'Same form, new role',
        prompt:
          'La mia bicicletta (adjective — noun follows) vs La mia (pronoun — noun replaced). ' +
          'The key differences: (1) keep the article when the pronoun stands alone in most positions; ' +
          '(2) drop the article in predicative use after essere (Questa borsa è mia, not è la mia); ' +
          '(3) loro never changes form regardless of gender or number.',
        notes:
          'Three bullet points is the right density here. Animate with a quick comparison table.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Replace the noun with the pronoun',
        prompt:
          'Rewrite, replacing the underlined noun with a possessive pronoun: ' +
          '"La mia proposta è pragmatica; la tua proposta è ideale." ' +
          '"I nostri rifiuti vengono raccolti il martedì; i loro rifiuti vengono raccolti il giovedì."',
        exampleAnswer:
          'La mia è pragmatica; la tua è ideale. ' +
          'I nostri vengono raccolti il martedì; i loro vengono raccolti il giovedì.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Article after essere',
        prompt: '"Questo zaino non è ___ (mine)." Choose: il mio / mio.',
        exampleAnswer: 'mio',
        notes:
          'After essere in a predicative construction, the article is dropped. ' +
          'This is the rule most learners miss.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Loro — invariable',
        prompt:
          'Complete with the correct form of their possessive pronoun: ' +
          '"Il nostro giardino è curato; ___ è abbandonato." (their garden) ' +
          '"Le nostre idee sono concrete; ___ sembrano vaghe." (their ideas)',
        exampleAnswer: 'il loro è abbandonato; le loro sembrano vaghe',
        notes:
          'Same loro base, different article to match gender — a clean drill of the invariability rule.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Produce in natural discourse',
        prompt:
          'Translate: "My city has a ZTL; does yours?" and "This is not my bin — it’s theirs."',
        exampleAnswer:
          'Il mio Comune ha una ZTL; il tuo? ' + 'Questo non è il mio bidone — è il loro.',
        notes:
          'First sentence: pronoun in subject position with article. ' +
          'Second sentence: predicative (il mio is possible here because the noun was named earlier).',
      },
    ],
  },

  // ── 5. Error-correction clinic ────────────────────────────────────────────
  {
    slug: 'cap13-clinic-conditional-errors',
    title: 'Conditional clinic: five classic mistakes',
    lessonType: LessonType.grammar,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A targeted error-correction clinic on the mistakes that persistently surface with the conditional: ' +
      'wrong stems, agreement errors in the past conditional, and the forbidden ' +
      '"se + condizionale" construction.',
    objectiveSkillSlugs: ['it-conditional-present', 'it-conditional-past', 'it-modals-conditional'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['news', 'culture', 'politics'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Clinic rules',
        prompt:
          'I’ll show you five broken sentences — one error each. Your job is to spot it, name it, ' +
          'and fix it. These are the exact mistakes that trip up upper-intermediate learners.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong stem: -are verb',
        prompt: 'Fix: "Parlarei con il sindaco se potessi." → ??? Wait — is this actually correct?',
        exampleAnswer:
          'It is almost correct: "Parlerei" (not "parlarei") because -are verbs change -a- to -e- in the stem: parlar- → parler-. Corrected: "Parlerei con il sindaco se potessi."',
        notes:
          'The most common stem error. -are verbs are the only ones where the infinitive stem is modified.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Conditional directly after se',
        prompt: 'Fix: "Se vorrei ridurre lo smog, userei i mezzi pubblici."',
        exampleAnswer:
          'Never use the conditional in the se-clause. Correct: "Se volessi ridurre lo smog, userei i mezzi pubblici." (congiuntivo imperfetto in the if-clause)',
        notes:
          'This is the single most important rule about the conditional. The se-clause uses congiuntivo or indicative — never condizionale.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Missing agreement — condizionale passato',
        prompt:
          'Fix (the subject is three women): "Le tre attiviste sarebbero partito in bicicletta."',
        exampleAnswer:
          '"Sarebbero partite" — the participle must agree with the subject (feminine plural). Corrected: "Le tre attiviste sarebbero partite in bicicletta."',
        notes: 'Agreement in the condizionale passato with essere is the most overlooked detail.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Wrong auxiliary in condizionale passato',
        prompt: 'Fix: "Ho sarebbe venuto prima, se avessi saputo dell’ingorgo."',
        exampleAnswer:
          'The auxiliary of the condizionale passato is the CONDITIONAL form of avere/essere, not the indicative. Corrected: "Sarei venuto prima, se avessi saputo dell’ingorgo."',
        notes:
          'Mixing indicative ho/è with the conditional passato is a telling sign of interference from the passato prossimo.',
      },
      {
        taskType: TaskType.error_correction,
        focus: 'Confusing condizionale with imperfetto endings',
        prompt: 'Fix: "Andassi volentieri al parco, ma ho troppo lavoro."',
        exampleAnswer:
          '"Andassi" is congiuntivo imperfetto, not condizionale. The condizionale presente io form is "andrei". Corrected: "Andrei volentieri al parco, ma ho troppo lavoro."',
        notes:
          'The -ei ending of the conditional can be confused with congiuntivo endings. ' +
          'Context (expressing desire / wish vs a conditional clause) is the key.',
      },
    ],
  },

  // ── 6. Scenario roleplay: polite requests at a hotel ─────────────────────
  {
    slug: 'cap13-roleplay-eco-hotel',
    title: 'Check-in at the eco-hotel in Abruzzo',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.upper_intermediate,
    summary:
      'You’ve arrived at a small eco-lodge near the Parco Nazionale d’Abruzzo. ' +
      'Navigate check-in, request amenities politely, and ask about sustainable practices — ' +
      'all using the condizionale as your main register.',
    objectiveSkillSlugs: [
      'it-conditional-present',
      'it-modals-conditional',
      'it-vocab-environment',
    ],
    defaultDurationMinutes: 13,
    compatibleThemes: ['travel', 'news', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Set the scene',
        prompt:
          'It’s early evening. You’re at the reception of Agriturismo Maiella, run on solar ' +
          'energy with a strict no-single-use-plastic policy. The receptionist greets you: ' +
          '"Benvenuto/a! Ha una prenotazione?" How do you proceed?',
        notes:
          'Use the learner’s known name or travel persona if available. The eco-hotel framing ' +
          'naturally integrates environment vocabulary and conditional politeness together.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Confirm the booking and ask about the room',
        prompt:
          'Confirm your reservation and ask politely if you could have a room with a mountain view.',
        exampleAnswer:
          'Sì, ho una prenotazione a nome [nome]. Vorrei sapere — potrebbe assegnarmi una stanza con vista sulle montagne, se ne avete una libera?',
        notes:
          'Look for vorrei + potrebbe (formal Lei). A room-with-a-view request is a natural hook.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Ask about the sustainability initiatives',
        prompt:
          'You read that the hotel uses solar panels. Ask the receptionist to tell you more about ' +
          'the environmental practices of the hotel.',
        exampleAnswer:
          'Ho letto che usate i pannelli solari — potrebbe spiegarmi come funziona la vostra politica ambientale?',
        notes:
          'This prompt naturally elicits "il vostro" (possessive adjective) and vocabulary from it-vocab-environment.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Make two more polite requests',
        prompt:
          'You want: (1) an extra blanket, and (2) to know if there’s a cycle hire nearby. ' +
          'Make both requests politely using the conditional.',
        exampleAnswer:
          'Vorrei una coperta in più, se possibile. ' +
          'Potrebbe dirmi se c’è un posto qui vicino dove si possono noleggiare le biciclette?',
        notes: 'Reward any correct conditional form. Coach the register — softer the better.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Register awareness',
        prompt:
          'Think of one request you made today in English. How would it change in tone if you ' +
          'used the conditional in Italian vs the plain present?',
        notes: 'Metacognitive close — connects the grammar to real pragmatic awareness.',
      },
    ],
  },

  // ── 7. Scenario roleplay: debate on the planet ────────────────────────────
  {
    slug: 'cap13-roleplay-environment-debate',
    title: 'Cosa faremmo per il pianeta? — a panel debate',
    lessonType: LessonType.scenario_roleplay,
    level: CEFRLevel.upper_intermediate,
    summary:
      'You’re a panellist on a civic debate about what individuals and governments ' +
      'should do for the environment. Use conditional modals, possessive pronouns for ' +
      'comparing positions, and environment vocabulary to argue your case.',
    objectiveSkillSlugs: [
      'it-modals-conditional',
      'it-conditional-present',
      'it-possessive-pronouns',
      'it-vocab-environment',
      'it-vocab-traffic',
    ],
    defaultDurationMinutes: 14,
    compatibleThemes: ['news', 'politics', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The debate prompt',
        prompt:
          'You’re at a public forum in L’Aquila. The moderator asks: ' +
          '"Come potremmo ridurre le emissioni nelle nostre città senza penalizzare chi ha bisogno della macchina?" ' +
          'You have the floor.',
        notes:
          'Pick an environmental tension the learner actually cares about — urban mobility, ' +
          'energy transition, or consumer choices — to maximise authentic output.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Opening statement — three proposals',
        prompt:
          'Make three concrete proposals using dovremmo, potremmo, or vorremmo. ' +
          'At least one should involve traffic vocabulary.',
        exampleAnswer:
          'Dovremmo investire di più nei mezzi pubblici e rendere i biglietti più convenienti. ' +
          'Potremmo estendere le ZTL e creare più piste ciclabili. ' +
          'Vorremmo vedere meno smog e più verde in centro.',
        notes:
          'Accept any grammatically sound conditional. Award bonus points for environment vocab.',
      },
      {
        taskType: TaskType.roleplay,
        focus: 'Challenge a rival position',
        prompt:
          'Your opponent says: "La vostra proposta è troppo costosa — la nostra è più realistica." ' +
          'Respond using at least one possessive pronoun to contrast the two positions.',
        exampleAnswer:
          'La nostra è ambiziosa, certo, ma la vostra non affronta il problema alla radice. ' +
          'Senza investimenti seri nei trasporti, lo smog non diminuirà mai.',
        notes:
          'Model polite disagreement: "La nostra… la vostra…" — possessive pronouns are natural in debate.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Condizionale passato in the debate',
        prompt:
          'Complete the moderator’s challenge: ' +
          '"Se il governo precedente ___ (investire) in energia rinnovabile dieci anni fa, ' +
          'oggi ___ (avere) meno dipendenza dal petrolio." (Use condizionale passato for both.)',
        exampleAnswer:
          'avesse investito → avrebbe investito; avrebbe avuto meno dipendenza dal petrolio.',
        notes:
          'Focus only on the result clause (condizionale passato). ' +
          'The se-clause will be fully taught in cap-18; note it without dwelling on it.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'What stuck?',
        prompt:
          'Which Italian phrase from this debate would you genuinely reuse? ' +
          'And was there a word or structure you needed but didn’t have?',
        notes: 'Metacognitive close — surfaces vocabulary gaps for the next lesson.',
      },
    ],
  },

  // ── 8. Listening challenge ────────────────────────────────────────────────
  {
    slug: 'cap13-listening-eco-exchange',
    title: 'Listening gym: a polite exchange at a green market',
    lessonType: LessonType.listening_challenge,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Two short audio clips: a polite exchange between a customer and a market stall owner ' +
      'at an organic market, and a 30-second eco-news clip with conditional forms. ' +
      'Train your ear to catch conditional verbs, possessive pronouns, and environment vocabulary in natural speech.',
    objectiveSkillSlugs: ['it-modals-conditional', 'it-vocab-environment', 'it-vocab-traffic'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['news', 'food', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'What to listen for',
        prompt:
          'In the first clip: catch the conditional forms and how the customer makes requests. ' +
          'In the second clip (a news snippet): catch what the speaker says a city "would do" ' +
          'or "should do" about emissions.',
        notes:
          'Script 1: customer asks for seasonal vegetables using vorrei and potrebbe. ' +
          'Script 2: a city councillor uses dovrebbe and potremmo in conditional statements about traffic policy. ' +
          'Engine generates two authentic-sounding scripts; keep each under 60 words.',
      },
      {
        taskType: TaskType.listening_comprehension,
        focus: 'Clip 1 — catch the requests',
        prompt:
          'How many polite requests does the customer make, and which conditional form do they use most?',
        exampleAnswer:
          'Two requests; the most-used form is vorrei (e.g., "Vorrei un chilo di pomodori" and "Vorrei sapere se i prodotti sono locali").',
        notes:
          'Accept any answer that identifies the conditional correctly. The count should be 2–3.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Clip 2 — what does the councillor propose?',
        prompt:
          'The councillor says the city should do one of the following. Which? ' +
          'A) Estendere la ZTL  B) Costruire un aeroporto  C) Aumentare i pedaggi autostradali',
        exampleAnswer: 'A — estendere la ZTL',
        notes:
          'Keep distractors plausible but clearly wrong in context. ' +
          'The script should use "dovremmo estendere la ZTL" clearly.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Listening anchor',
        prompt:
          'Which word or phrase in Clip 2 told you the speaker was using the conditional ' +
          'rather than the future tense?',
        notes:
          'The distinction between farebbe (conditional) and farà (future) is a real-world listening skill.',
      },
    ],
  },

  // ── 9. Speaking challenge ─────────────────────────────────────────────────
  {
    slug: 'cap13-speaking-eco-advice',
    title: 'Speak out: the environmental issue you care about most',
    lessonType: LessonType.speaking_challenge,
    level: CEFRLevel.upper_intermediate,
    summary:
      'Give a short, unrehearsed speech (2–3 minutes) on an environmental issue you personally ' +
      'care about — using conditional forms throughout to express what should be done, ' +
      'what you would have done differently, and what we could do now.',
    objectiveSkillSlugs: [
      'it-conditional-present',
      'it-modals-conditional',
      'it-conditional-past',
      'it-vocab-environment',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['news', 'politics', 'culture'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'The prompt',
        prompt:
          'Pick one environmental issue that actually bothers you — plastic waste, air quality, ' +
          'deforestation, traffic, energy use — and prepare to speak about it for two to three minutes in Italian. ' +
          'You’ll use the condizionale to say what you’d do, what should be done, and what you wish had happened differently.',
        notes:
          'If the learner’s profile reveals an environmental interest, prompt that directly. ' +
          'Otherwise, give them 30 seconds to think before they speak.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'Introduce the problem',
        prompt:
          'In 2–3 sentences, describe the environmental problem you chose. Use present tense ' +
          'for facts and conditional for your reaction: "Sarebbe meglio se…" or "È grave perché…"',
        notes:
          'Penalise nothing at this stage — the goal is to get comfortable in Italian on a real topic.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'What should be done — and by whom',
        prompt:
          'Give three actions using dovrebbe (singular), dovremmo (collective), and potrebbe (possibility). ' +
          'Address governments, companies, and individuals separately.',
        exampleAnswer:
          'Il governo dovrebbe vietare le plastiche monouso. ' +
          'Le aziende potrebbero ridurre gli imballaggi. ' +
          'Dovremmo tutti usare meno la macchina.',
        notes: 'Three-part structure models good conditional variety.',
      },
      {
        taskType: TaskType.speaking_prompt,
        focus: 'What you wish had been done differently',
        prompt:
          'Use the condizionale passato to say one thing that should have happened sooner — ' +
          'at a national or global level.',
        exampleAnswer:
          'Avremmo dovuto investire nelle energie rinnovabili trent’anni fa, prima che il problema peggiorasse così tanto.',
        notes:
          'Avremmo dovuto + infinitive is a high-value structure that captures regret about missed action.',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess your speech',
        prompt:
          'Did you use all three conditional types (presente, modali, passato)? ' +
          'Which felt most natural? Which needs more work?',
        notes: 'Metacognitive close. Note gaps for the progress check.',
      },
    ],
  },

  // ── 10. Vocabulary review ─────────────────────────────────────────────────
  {
    slug: 'cap13-vocab-environment-traffic-deep',
    title: 'Deep vocabulary review: ecology and urban mobility',
    lessonType: LessonType.vocabulary_review,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A thorough review of the environment and traffic vocabulary clusters, targeting ' +
      'word families, collocations, and the items most likely to appear in Italian news ' +
      'coverage of climate and urban planning.',
    objectiveSkillSlugs: ['it-vocab-environment', 'it-vocab-traffic'],
    defaultDurationMinutes: 10,
    compatibleThemes: ['news', 'culture', 'politics'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Two clusters that overlap',
        prompt:
          'Environment words (inquinamento, riciclaggio, energia rinnovabile…) and traffic ' +
          'words (ingorgo, ZTL, mezzi pubblici…) constantly appear together in Italian news. ' +
          'Today we cement both clusters with word-family and collocation exercises.',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Collocations — verb + noun',
        prompt:
          'Which verb pairs naturally with "la raccolta differenziata"? ' +
          'A) fare  B) mettere  C) guardare',
        exampleAnswer: 'A — fare la raccolta differenziata',
        notes:
          'Collocation knowledge is what separates intermediate from upper-intermediate. ' +
          'Follow up with "ridurre gli sprechi" and "prendere i mezzi" as bonus pairs.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Word-family gap-fill',
        prompt:
          'Complete the word family: ' +
          '"La ___ (verb) → il riciclaggio." ' +
          '"Inquinare → l’___ (noun)." ' +
          '"Proteggere → la ___ (noun) dell’ambiente." ' +
          '"Sostenibile → la ___ (noun) ambientale."',
        exampleAnswer: 'riciclare; l’inquinamento; la protezione; la sostenibilità',
        notes:
          'Word-family drilling produces compound retention — learners gain four items for the price of one.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Authentic output under time pressure',
        prompt:
          'Translate these two newspaper headline fragments: ' +
          '(1) "City vows to cut traffic jams with new cycle lanes" ' +
          '(2) "Minister pledges to protect renewable energy investment"',
        exampleAnswer:
          'Il Comune promette di ridurre gli ingorghi con nuove piste ciclabili. ' +
          'Il ministro si impegna a tutelare gli investimenti in energia rinnovabile.',
        notes:
          'Headline-style translation is authentic and shows whether vocabulary is productively available.',
      },
      {
        taskType: TaskType.recap,
        focus: 'Quick-fire self-quiz',
        prompt:
          'Without pausing: Italian for "smog", "pedestrian zone", "to waste (resources)", ' +
          '"cycle lane", "climate change", and "petrol".',
        exampleAnswer:
          'lo smog; la zona pedonale / la ZTL; sprecare; la pista ciclabile; il cambiamento climatico; la benzina',
      },
    ],
  },

  // ── 11. Progress check ────────────────────────────────────────────────────
  {
    slug: 'cap13-progress-check',
    title: 'Chapter checkpoint: the conditional, politeness, and the planet',
    lessonType: LessonType.progress_check,
    level: CEFRLevel.upper_intermediate,
    summary:
      'A mixed checkpoint across all six cap-13 skills: conditional present and irregular stems, ' +
      'modal conditionals, conditional past with agreement, possessive pronouns, ' +
      'and both vocabulary clusters. Identify what’s solid and what needs another pass.',
    objectiveSkillSlugs: [
      'it-conditional-present',
      'it-modals-conditional',
      'it-conditional-past',
      'it-possessive-pronouns',
      'it-vocab-environment',
      'it-vocab-traffic',
    ],
    defaultDurationMinutes: 12,
    compatibleThemes: ['news', 'culture', 'politics'],
    taskBlueprint: [
      {
        taskType: TaskType.briefing,
        focus: 'Low-stakes checkpoint',
        prompt:
          'Six quick tasks, one per chapter skill. No pressure — this is about seeing where you are, ' +
          'not about being perfect.',
      },
      {
        taskType: TaskType.fill_blank,
        focus: 'Conditional stems',
        prompt:
          'Fill in the condizionale presente: ' +
          '"___ (volere, io) un mondo senza inquinamento." ' +
          '"Se avessimo tempo, ___ (andare, noi) al parco nazionale." ' +
          '"___ (potere, lei) spiegarmi cos’è una ZTL?"',
        exampleAnswer: 'Vorrei; andremmo; Potrebbe',
      },
      {
        taskType: TaskType.multiple_choice,
        focus: 'Modals — register and nuance',
        prompt:
          '"___ smettere di sprecare acqua — lo so." Which is most natural: devo / dovrei / vorrei?',
        exampleAnswer:
          'Dovrei — self-directed, mildly guilty advice; devo would be harsh obligation; ' +
          'vorrei doesn’t fit without seguire un corso or similar.',
      },
      {
        taskType: TaskType.translation,
        focus: 'Condizionale passato',
        prompt:
          'Translate: "Without the ZTL, the historic centre would have been ruined by traffic."',
        exampleAnswer: 'Senza la ZTL, il centro storico sarebbe stato rovinato dal traffico.',
        notes:
          'essere + essere → sarebbe stato is a compound past conditional with a predicative participle. ' +
          'Flag this as advanced; accept avrebbe rovinato il centro storico as an active-voice alternative.',
      },
      {
        taskType: TaskType.pronoun_replacement,
        focus: 'Possessive pronouns',
        prompt:
          'Replace the underlined noun phrase: ' +
          '"La mia idea è semplice; la tua idea è complicata." ' +
          '"Questo bidone non è il mio bidone."',
        exampleAnswer:
          'La mia è semplice; la tua è complicata. ' +
          'Questo bidone non è il mio. (or: non è mio)',
      },
      {
        taskType: TaskType.reflection,
        focus: 'Self-assess',
        prompt:
          'Which of the six topics feels most secure? Which do you want to revisit? ' +
          'Rate each one: confident / almost there / need more practice.',
        notes: 'Metacognitive close. Use the rating to surface the next recommended lesson.',
      },
    ],
  },
];

export default { unitCode, lessons };
